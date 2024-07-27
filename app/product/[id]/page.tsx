"use client";
import { useEffect, useState } from "react";
import mongoose from "mongoose";
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
  description: string;
  features: string[];
  suggestedUse: string;
  benefits: string;
  nutritionalUse: string;
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

function Accordion({ title, children }: any) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b">
      <button
        className="w-full flex justify-between items-center py-4 text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-medium">{title}</span>
        <span>{isOpen ? "-" : "+"}</span>
      </button>
      {isOpen && (
        <div className="py-4 transition duration-500 ease-in-out">
          {children}
        </div>
      )}
    </div>
  );
}

export default function ProductPage({ params }: any) {
  const [quantity, setQuantity] = useState(1);
  const [selectedFlavor, setSelectedFlavor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  // const [stars, setStars] = useState(0);

  // const [updatestars, setupdateStars] = useState(0);
  // const [review, setReview] = useState("");
  // const [updatereview, setUpdateReview] = useState("");
  const [product, setProduct] = useState<IProduct | null>(null);
  const [couponCode, setCouponCode] = useState("");
  const [isValidCoupon, setIsValidCoupon] = useState<null | boolean>(null);
  const [discount, setDiscount] = useState(0);
  const [finalPrice, setFinalPrice] = useState(0);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [couponId, setCouponId] = useState<string | undefined>(undefined);
  // const [feedbacks, setFeedbacks] = useState<any[]>([]);
  const [userdetails, setUser] = useState<any | null>(null);
  // const [deleteFeedbackId, setDeleteFeedbackId] = useState<string>("");
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);
  const [averageRating, setAverageRating] = useState<number>(0);
  const { updateCart } = useCart();
  const router = useRouter();
  const { userId, isSignedIn } = useAuth();
  const user = useUser();
  const [starsCounts, setStarsCounts] = useState({
    3: 0,
    4: 0,
    5: 0,
  });

  const productId = params.id;

  useEffect(() => {
    setUser(user.user);
  }, [user]);

  // useEffect(() => {
  //   if (feedbacks.length > 0) {
  //     const totalStars = feedbacks.reduce(
  //       (accumulator, feedback) => accumulator + feedback.rating,
  //       0
  //     );
  //     const average = totalStars / feedbacks.length;
  //     setAverageRating(average);

  //     const counts = {
  //       3: feedbacks.filter((feedback) => feedback.rating === 3).length,
  //       4: feedbacks.filter((feedback) => feedback.rating === 4).length,
  //       5: feedbacks.filter((feedback) => feedback.rating === 5).length,
  //     };
  //     setStarsCounts(counts);

  //     console.log("this is avaerage rating : ", averageRating);
  //   } else {
  //     setAverageRating(0);
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [feedbacks]);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!isSignedIn) {
        router.push("/sign-in");
        return;
      }

      try {
        const response = await fetch(
          `https://bioessentia.store/api/66585955a3fe976423095792/products/${productId}`
        );

        // const responseofFeedback = await fetchFeedbackByProductId(productId);

        // console.log("response of feedback : ", responseofFeedback);

        // setFeedbacks(responseofFeedback);

        const data = await response.json();
        setProduct(data);
        setSelectedFlavor(data.flavourId[0]?.name);
        setSelectedSize(data.sizeId[0]?.name);
        setFinalPrice(data.price);
      } catch (error: any) {
        console.error("Error fetching product:", error);
        toast.error("Error", {
          description: `${error.message}`,
        });
      }
    };

    if (productId) {
      fetchProduct();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId]);

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

  // const handleStarClick = (star: number) => {
  //   setStars(star);
  // };

  // const handleUpdateStarClick = (star: number) => {
  //   setupdateStars(star);
  // };

  // const handleDeleteFeedback = (feedbackId: string) => {
  //   setDeleteFeedbackId(feedbackId);
  //   setIsAlertModalOpen(true);
  // };

  // const handleReviewSubmit = async () => {
  //   console.log("Review:", review);
  //   console.log("Stars:", stars);
  //   console.log("this is user : ", userdetails?.fullName);
  //   const loadingId = toast.loading("Processing...");

  //   try {
  //     const obj = {
  //       userName: userdetails?.fullName || "Anonymous",
  //       rating: Number(stars),
  //       feedback: review,
  //       productId: productId,
  //     };

  //     console.log("this is final objedct : ", obj);

  //     const feedbackSubmitResponse = await createFeedback(obj);

  //     setFeedbacks((prevFeedbacks) => [
  //       ...prevFeedbacks,
  //       feedbackSubmitResponse,
  //     ]);
  //     console.log(
  //       "this is feedback submit response : ",
  //       feedbackSubmitResponse
  //     );
  //     toast.dismiss(loadingId);
  //     toast.success("Feedback successfully created");
  //   } catch (error) {
  //     toast.error("An error occured");
  //     toast.dismiss(loadingId);
  //     console.log("an error occured while submitting the feedback : ", error);
  //   }
  // };

  // const confirmDeleteFeedback = async () => {
  //   const loadingId = toast.loading("Deleting feedback...");

  //   try {
  //     await deleteFeedbackById(new mongoose.Types.ObjectId(deleteFeedbackId));
  //     toast.dismiss(loadingId);
  //     toast.success("Successfully deleted feedback");
  //     setFeedbacks((prevFeedbacks) =>
  //       prevFeedbacks.filter((feedback) => feedback._id !== deleteFeedbackId)
  //     );
  //   } catch (error) {
  //     toast.error("Error while deleting feedback");
  //     toast.dismiss(loadingId);
  //     console.error("Error deleting feedback:", error);
  //   }

  //   setIsAlertModalOpen(false);
  //   setDeleteFeedbackId("");
  // };

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

  // const handleUpdateReview = async (feedbackId: string) => {
  //   const loadingId = toast.loading("processing...");

  //   try {
  //     const obj = {
  //       rating: updatestars,
  //       feedback: updatereview,
  //     };

  //     const id = new mongoose.Types.ObjectId(feedbackId);

  //     const updatefeedbackResponse = await updateFeedbackById(id, obj);

  //     console.log("this is reponse : ", updatefeedbackResponse);

  //     toast.dismiss(loadingId);

  //     toast.success("feedback updated successfully");

  //     setFeedbacks((prevFeedbacks) =>
  //       prevFeedbacks.map((feedback) =>
  //         feedback._id === feedbackId ? updatefeedbackResponse : feedback
  //       )
  //     );
  //   } catch (error) {
  //     toast.dismiss(loadingId);
  //     toast.error("Error occured");
  //     console.log("error occured while editing the feedback");
  //   }
  // };

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
          <h2 className="font-bold text-xl mt-4">Product Description</h2>
          <div className="grid gap-4 text-sm leading-loose">
            <div className="markdown-container">
              {parse(product.description)}
            </div>
          </div>
          {product.benefits && (
            <Accordion title="Benefits">
              <div className="markdown-container">
                {parse(product.benefits)}
              </div>
            </Accordion>
          )}
          {product.suggestedUse && (
            <Accordion title="Suggested Use">
              <div className="markdown-container">
                {parse(product.suggestedUse)}
              </div>
            </Accordion>
          )}
          {product.nutritionalUse && (
            <Accordion title="Nutritional Information">
              <div className="markdown-container">
                {parse(product.nutritionalUse)}
              </div>
            </Accordion>
          )}
        </div>
        <div className="grid gap-8 md:gap-12 items-start">
          <div className="grid gap-4">
            <h1 className="font-bold text-3xl">{product.name}</h1>
            <div className="text-2xl font-bold dark:text-white text-gray-900">
              ₹{product.price}{" "}
              <span className="text-lg text-red-500 line-through">
                ₹{product.fakePrice}
              </span>
            </div>
            <div className="text-sm dark:text-gray-200 text-gray-500">
              Free shipping on orders over ₹500
            </div>
            {/* <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((index) => (
                <StarIcon
                  key={index}
                  className={`w-5 h-5 ${
                    index <= Math.round(averageRating)
                      ? "fill-primary"
                      : "fill-muted"
                  } ${index <= averageRating ? "" : "stroke-muted-foreground"}`}
                />
              ))}
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {feedbacks.length > 1 ? (
                  <span>({feedbacks.length} reviews)</span>
                ) : (
                  <span>({feedbacks.length} review)</span>
                )}
              </span>
            </div> */}
            <div className="text-sm dark:text-white text-gray-500">
              <ul className="list-disc list-inside">
                {product.features.map((feature: any, index: any) => (
                  <li key={index}>{feature}</li>
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
              <div>
                <Label className="text-base" htmlFor="coupon">
                  Coupon Code
                </Label>
                <div className="flex items-center gap-2">
                  <Input
                    placeholder="Enter Coupon Code"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                  />
                  <Button onClick={handleApplyCoupon}>Apply</Button>
                </div>
                {isValidCoupon !== null && (
                  <div className="text-sm mt-2">
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
                  </div>
                )}
              </div>
              <div className="text-lg font-bold">
                Final Price: ₹{finalPrice.toFixed(2)}
              </div>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Button size="lg" onClick={handleAddToCart}>
                Add to Cart
              </Button>
              <Button size="lg" variant="outline" onClick={handleBuyNow}>
                Buy Now
              </Button>
            </div>
          </div>
        </div>
      </div>
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
