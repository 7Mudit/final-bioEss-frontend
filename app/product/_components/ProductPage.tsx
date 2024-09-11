"use client";
import { useEffect, useState } from "react";
import parse from "html-react-parser";
import {
  CarouselItem,
  CarouselContent,
  CarouselPrevious,
  CarouselNext,
  Carousel,
} from "@/components/ui/carousel";
import { Label } from "@/components/ui/label";
import {
  SelectValue,
  SelectTrigger,
  SelectItem,
  SelectContent,
  Select,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import { useCart } from "@/context/cartContext";
import { useRouter } from "next/navigation";

import { useAuth } from "@clerk/nextjs";
import { initiatePhonePePayment } from "@/utils/phonepay";
import { createOrder } from "@/lib/actions/order.action";
import { validateCoupon } from "@/lib/actions/coupon.action";
import AddressModal from "@/components/product/AddressModal";
import { toast } from "sonner";
import Loading from "../loading";
import {
  fetchFeedbackByProductId,
  createFeedback,
  deleteFeedbackById,
  updateFeedbackById,
} from "@/lib/actions/feedback.action";
import { useUser } from "@clerk/nextjs";
import { AlertModal } from "@/components/ui/alert-modal";
import { fetchProductBySlug } from "@/lib/actions/products.action";
import { IoCheckmarkDone } from "react-icons/io5";
import { type JSONContent } from "novel";
import ReviewComponent from "@/components/product/Review";
import { motion, AnimatePresence } from "framer-motion";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface Image {
  _id: string;
  url: string;
}

interface Category {
  _id: string;
  name: string;
}

interface Flavour {
  _id: string;
  name: string;
}

interface Size {
  _id: string;
  sizeId: {
    name: string;
  };
  price: number;
  fakePrice: number;
}
interface IProduct {
  _id: string;
  storeId: string;
  categoryId: Category;
  name: string;
  sizes: Size[];
  fakePrice: number;
  content?: JSONContent;
  contentHTML?: string;
  features: string[];
  isFeatured: boolean;
  isArchived: boolean;
  flavourId: Flavour[];
  images: Image[];
  orderItems: string[];
  feedbacks: string[];
  createdAt: Date;
  updatedAt: Date;
}
export default function ProductPage({ params }: any) {
  const [quantity, setQuantity] = useState(1);
  const [selectedFlavor, setSelectedFlavor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [product, setProduct] = useState<IProduct | null>(null);
  const [couponCode, setCouponCode] = useState("");
  const [isValidCoupon, setIsValidCoupon] = useState<null | boolean>(null);
  const [discount, setDiscount] = useState(0);
  const [finalPrice, setFinalPrice] = useState(0);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [couponId, setCouponId] = useState<string | undefined>(undefined);
  const [userdetails, setUser] = useState<any | null>(null);
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);
  const [averageRating, setAverageRating] = useState<number>(0);
  const [watchingCount, setWatchingCount] = useState(0);
  const [showCouponInput, setShowCouponInput] = useState(false);
  const [pincode, setPincode] = useState("");
  const [isPincodeValid, setIsPincodeValid] = useState(false);
  const [isCheckingPincode, setIsCheckingPincode] = useState(false);
  const [finalFakePrice, setFinalFakePrice] = useState(0);
  const { updateCart } = useCart();
  const router = useRouter();
  const { userId, isSignedIn } = useAuth();
  const user = useUser();

  const slug = params.slug;

  useEffect(() => {
    setUser(user.user);
  }, [user]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        let data = await fetchProductBySlug(slug);
        console.log(data);
        const parsedData: IProduct = JSON.parse(data);

        setProduct(parsedData);
        setSelectedFlavor(parsedData.flavourId[0]?.name);
        setSelectedSize(parsedData.sizes[0]?.sizeId.name);
        const initialSizePrice = parsedData.sizes[0]?.price || 0;
        const initialSizeFakePrice = parsedData.sizes[0]?.fakePrice || 0;
        setFinalPrice(initialSizePrice);
        setFinalFakePrice(initialSizeFakePrice);
      } catch (error: any) {
        console.error("Error fetching product:", error);
        toast.error("Error", {
          description: `${error.message}`,
        });
      }
    };

    if (slug) {
      fetchProduct();
    }
  }, [slug]);

  useEffect(() => {
    if (product && selectedSize) {
      const selectedSizeObj = product.sizes.find(
        (size) => size.sizeId.name === selectedSize
      );
      const sizePrice = selectedSizeObj ? selectedSizeObj.price : 0;
      const sizeFakePrice = selectedSizeObj ? selectedSizeObj.fakePrice : 0;
      const discountAmount = (sizePrice * discount) / 100;

      setFinalPrice((sizePrice - discountAmount) * quantity);
      setFinalFakePrice(sizeFakePrice);
    }
  }, [quantity, discount, product, selectedSize]);

  const handleQuantityChange = (change: number) => {
    setQuantity((prevQuantity) => {
      const newQuantity = prevQuantity + change;
      return newQuantity > 0 ? newQuantity : 1;
    });
  };

  const handleAddToCart = () => {
    if (!userId) {
      router.push("/sign-in");
      return;
    }
    if (product && selectedFlavor && selectedSize) {
      const selectedSizeObj = product.sizes.find(
        (size) => size.sizeId.name === selectedSize
      );
      const price = selectedSizeObj ? selectedSizeObj.price : 0;

      updateCart(product, quantity, selectedFlavor, selectedSize, price);
    }
  };

  const handleApplyCoupon = async () => {
    try {
      const response = await validateCoupon(couponCode);
      const data = JSON.parse(response);
      if (data.valid) {
        const discountAmount = data.discountPercentage;
        setDiscount(discountAmount);
        setIsValidCoupon(true);
        setCouponId(data.couponId);
        toast.success("Coupon applied");
      } else {
        setDiscount(0);
        const selectedSizeObj = product?.sizes.find(
          (size) => size.sizeId.name === selectedSize
        );
        const sizePrice = selectedSizeObj ? selectedSizeObj.price : 0;
        setFinalPrice(sizePrice * quantity);
        setIsValidCoupon(false);
        setCouponId(undefined);
        toast.error("Invalid coupon applied");
      }
    } catch (error) {
      console.error("Error validating coupon:", error);
      setIsValidCoupon(false);
      setCouponId(undefined);
    }
  };

  const handleBuyNow = () => {
    if (!userId) {
      router.push("/sign-in");
      return;
    }
    setIsAddressModalOpen(true);
  };

  const handleAddressSubmit = async () => {
    if (product && selectedFlavor && selectedSize) {
      try {
        const amount = finalPrice;
        const products = [
          {
            productId: product._id,
            quantity,
            flavor: selectedFlavor,
            size: selectedSize,
          },
        ];

        // Initiate the payment first
        const paymentResponse = await initiatePhonePePayment(
          amount,
          userId,
          products
        );
        const response = JSON.parse(paymentResponse!);

        if (response.merchantTransactionId) {
          // Create the order with the received merchantTransactionId
          const order = await createOrder(
            userId as string,
            products,
            amount,
            response.merchantTransactionId,
            couponId // Pass couponId if valid
          );

          if (response.paymentUrl) {
            window.location.href = response.paymentUrl;
          }
        } else {
          toast.error("Failed to get transaction ID");
        }
      } catch (error) {
        console.error("Payment initiation failed:", error);
        toast.error("Failed to initiate payment");
      }
    }
  };

  useEffect(() => {
    const randomWatchingCount = Math.floor(Math.random() * 50) + 50;
    setWatchingCount(randomWatchingCount);
  }, []);

  const handlePincodeCheck = async () => {
    setIsCheckingPincode(true);
    try {
      const response = await axios.get(
        `https://staging-express.delhivery.com/c/api/pin-codes/json/`,
        {
          params: {
            filter_codes: pincode,
          },
          headers: {
            Authorization: `Token fe772cbcac5112ea2265d9116b8a9c3fbb71137e`,
            Accept: "application/json",
          },
        }
      );

      const data = response.data;

      if (data.delivery_codes && data.delivery_codes.length > 0) {
        const isServiceable = data.delivery_codes.some(
          (code: any) => code.delivery_code.pincode === pincode
        );

        if (isServiceable) {
          setIsPincodeValid(true);
          toast.success("Delivery available in your area!");
        } else {
          setIsPincodeValid(false);
          toast.error("Sorry, we don't deliver to this pincode.");
        }
      } else {
        setIsPincodeValid(false);
        toast.error("Sorry, we don't deliver to this pincode.");
      }
    } catch (error) {
      console.error("Error checking pincode:", error);
      setIsPincodeValid(false);
      toast.error("Failed to check pincode. Please try again later.");
    } finally {
      setIsCheckingPincode(false);
    }
  };

  if (!product) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  return (
    <div className="max-w-6xl px-6 mx-auto py-10">
      <div className="grid md:grid-cols-2 gap-8 lg:gap-16 items-start">
        <div className="grid gap-6 md:gap-12 items-start">
          <Carousel className="rounded-lg overflow-hidden relative">
            <CarouselContent>
              {product.images.map((image) => (
                <CarouselItem key={image._id}>
                  <Image
                    alt="Product Image"
                    className="aspect-square object-cover w-full"
                    height={600}
                    src={image.url}
                    width={600}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute left-0 top-1/2 transform -translate-y-1/2" />
            <CarouselNext className="absolute right-0 top-1/2 transform -translate-y-1/2" />
          </Carousel>
        </div>
        <div className="grid gap-8 md:gap-10 items-start">
          <div className="grid gap-4">
            <h1 className="font-bold text-3xl">{product.name}</h1>
            <div className="text-2xl font-bold dark:text-white text-gray-900">
              ₹{finalPrice.toFixed(2)}{" "}
              {finalFakePrice > 0 && (
                <span className="text-lg text-red-500 line-through">
                  ₹{finalFakePrice.toFixed(2)}
                </span>
              )}
            </div>
            <div className="text-base font-medium text-gray-700 dark:text-gray-200">
              <span className="text-red-700 text-2xl">{watchingCount}</span>{" "}
              people are watching this product right now
            </div>
            <div className="text-sm dark:text-white text-gray-500">
              <ul className="flex flex-col gap-3">
                {product.features.map((feature: any, index: any) => (
                  <li className="list-none flex gap-2" key={index}>
                    <IoCheckmarkDone color={"red"} size={20} />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            <div className="grid gap-4">
              <div>
                <Label className="text-base" htmlFor="flavor">
                  Flavor
                </Label>
                <Select
                  defaultValue={product.flavourId[0]?.name}
                  onValueChange={setSelectedFlavor}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Flavor" />
                  </SelectTrigger>
                  <SelectContent>
                    {product.flavourId.map((flavour) => (
                      <SelectItem key={flavour._id} value={flavour.name}>
                        {flavour.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-base" htmlFor="size">
                  Size
                </Label>
                <Select
                  defaultValue={product.sizes[0]?.sizeId.name}
                  onValueChange={setSelectedSize}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Size" />
                  </SelectTrigger>
                  <SelectContent>
                    {product.sizes.map((size) => (
                      <SelectItem key={size._id} value={size.sizeId.name}>
                        {size.sizeId.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-base" htmlFor="quantity">
                  Quantity
                </Label>
                <div className="flex items-center gap-2">
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() => handleQuantityChange(-1)}
                  >
                    <MinusIcon className="h-4 w-4" />
                  </Button>
                  <Input
                    className="w-16 text-center"
                    value={quantity}
                    readOnly
                    id="quantity"
                    type="number"
                  />
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() => handleQuantityChange(1)}
                  >
                    <PlusIcon className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Input
                  placeholder="Enter Pincode"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                />
                <Button
                  onClick={handlePincodeCheck}
                  disabled={isCheckingPincode}
                >
                  {isCheckingPincode ? "Checking..." : "Check"}
                </Button>
              </div>
              {isPincodeValid !== null && pincode !== "" && (
                <div className="text-sm mt-2">
                  {isPincodeValid ? (
                    <span className="text-green-500">
                      Delivery available in your area!
                    </span>
                  ) : (
                    <span className="text-red-500">
                      Sorry, we don&apos;t deliver to this pincode.
                    </span>
                  )}
                </div>
              )}
              <div>
                <motion.div
                  initial={false}
                  animate={{ height: showCouponInput ? "auto" : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {showCouponInput && (
                    <div className="flex items-center gap-2 mt-2">
                      <Input
                        placeholder="Enter Coupon Code"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                      />
                      <Button onClick={handleApplyCoupon}>Apply</Button>
                    </div>
                  )}
                </motion.div>
                <Button
                  variant="outline"
                  className="mt-2"
                  onClick={() => setShowCouponInput(!showCouponInput)}
                >
                  {showCouponInput ? "Hide Coupon" : "Have a Coupon?"}
                </Button>
                <AnimatePresence>
                  {isValidCoupon !== null && product && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="text-sm mt-2"
                    >
                      {isValidCoupon ? (
                        <span className="text-green-500">
                          Coupon applied! Discount: ₹
                          {(
                            (product.sizes.find(
                              (size) => size.sizeId.name === selectedSize
                            )?.price || 0) *
                              quantity -
                            finalPrice
                          ).toFixed(2)}
                        </span>
                      ) : (
                        <span className="text-red-500">
                          Invalid or expired coupon
                        </span>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <div className="">
                <p className="text-lg flex flex-col font-bold">
                  Final Price: ₹{finalPrice.toFixed(2)}
                </p>
                <span className="text-xs ml-3 dark:text-gray-200 text-gray-500">
                  <b>Note :</b> Free shipping
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row">
              <div>
                <Button size="lg" onClick={handleAddToCart}>
                  Add to Cart
                </Button>
              </div>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div>
                      <Button
                        size="lg"
                        variant="outline"
                        onClick={handleBuyNow}
                        // disabled={!isPincodeValid}
                      >
                        Buy Now
                      </Button>
                    </div>
                  </TooltipTrigger>
                  {!isPincodeValid && (
                    <TooltipContent>
                      <p>Please enter a valid pincode to enable this button</p>
                    </TooltipContent>
                  )}
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </div>
      </div>
      <article
        className="prose mt-12 text-justify max-w-none break-words  "
        dangerouslySetInnerHTML={{
          __html: product.contentHTML || "No content",
        }}
      />
      <ReviewComponent />
      <Dialog open={isAddressModalOpen} onOpenChange={setIsAddressModalOpen}>
        <AddressModal
          isOpen={isAddressModalOpen}
          onClose={() => setIsAddressModalOpen(false)}
          onSubmit={handleAddressSubmit}
        />
      </Dialog>
    </div>
  );
}

function MinusIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={props.className}
    >
      <path d="M5 12h14" />
    </svg>
  );
}

function PlusIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={props.className}
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  );
}
