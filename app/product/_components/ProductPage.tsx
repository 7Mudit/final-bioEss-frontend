"use client";
import { useEffect, useRef, useState } from "react";
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
  name: string;
}

interface IProduct {
  _id: string;
  storeId: string;
  categoryId: Category;
  name: string;
  price: number;
  fakePrice: number;
  content?: JSONContent;
  contentHTML?: string;
  features: string[];
  isFeatured: boolean;
  isArchived: boolean;
  sizeId: Size[];
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
  const { updateCart } = useCart();
  const router = useRouter();
  const { userId, isSignedIn } = useAuth();
  const user = useUser();
  const [starsCounts, setStarsCounts] = useState({
    3: 0,
    4: 0,
    5: 0,
  });

  const slug = params.slug;

  useEffect(() => {
    setUser(user.user);
  }, [user]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        let data = await fetchProductBySlug(slug);
        const parsedData: IProduct = JSON.parse(data);

        setProduct(parsedData);
        setSelectedFlavor(parsedData.flavourId[0]?.name);
        setSelectedSize(parsedData.sizeId[0]?.name);
        setFinalPrice(parsedData.price);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  useEffect(() => {
    if (product) {
      const discountAmount = (product.price * discount) / 100;
      setFinalPrice((product.price - discountAmount) * quantity);
    }
  }, [quantity, discount, product]);

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
      updateCart(product, quantity, selectedFlavor, selectedSize);
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
        setFinalPrice(product!.price * quantity);
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
      console.log("here i am");
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
    const randomWatchingCount = Math.floor(Math.random() * 11) + 15;
    setWatchingCount(randomWatchingCount);
  }, []);

  const handlePincodeCheck = async () => {
    setIsCheckingPincode(true);
    if (pincode.length === 6) {
      setIsPincodeValid(true);
    } else {
      setIsPincodeValid(false);
    }
    setIsCheckingPincode(false);
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
              ₹{product.price}{" "}
              <span className="text-lg text-red-500 line-through">
                ₹{product.fakePrice}
              </span>
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
                  defaultValue={product.sizeId[0]?.name}
                  onValueChange={setSelectedSize}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Size" />
                  </SelectTrigger>
                  <SelectContent>
                    {product.sizeId.map((size) => (
                      <SelectItem key={size._id} value={size.name}>
                        {size.name}
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
                  {isValidCoupon !== null && (
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
                          {(product.price * quantity - finalPrice).toFixed(2)}
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
                        disabled={!isPincodeValid}
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

function StarIcon(props: any) {
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
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}
