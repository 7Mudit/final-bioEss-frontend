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
import toast from "react-hot-toast";

import { useAuth } from "@clerk/nextjs";
import { initiatePhonePePayment } from "@/utils/phonepay";
import { createOrder } from "@/lib/actions/order.action";

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
  const [stars, setStars] = useState(0);
  const [review, setReview] = useState("");
  const [product, setProduct] = useState<IProduct | null>(null);

  const { updateCart } = useCart();
  const router = useRouter();
  const { userId } = useAuth();

  const productId = params.id;

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `https://bioessentia.store/api/66585955a3fe976423095792/products/${productId}`
        );
        const data = await response.json();
        setProduct(data);
        setSelectedFlavor(data.flavourId[0]?.name);
        setSelectedSize(data.sizeId[0]?.name);
      } catch (error: any) {
        console.error("Error fetching product:", error);
        toast.error(`Error: ${error.message}`);
      }
    };

    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  const handleQuantityChange = (change: number) => {
    setQuantity((prevQuantity) => {
      const newQuantity = prevQuantity + change;
      return newQuantity > 0 ? newQuantity : 1;
    });
  };

  const handleStarClick = (star: number) => {
    setStars(star);
  };

  const handleReviewSubmit = () => {
    console.log("Review:", review);
    console.log("Stars:", stars);
  };

  // const { addToCart } = useCart();
  const handleAddToCart = () => {
    if (!userId) {
      router.push("/sign-in");
      return;
    }
    if (product && selectedFlavor && selectedSize) {
      updateCart(product, quantity, selectedFlavor, selectedSize);
    }
  };
  const handleBuyNow = async () => {
    if (!userId) {
      router.push("/sign-in");
      return;
    }

    if (product && selectedFlavor && selectedSize) {
      try {
        const amount = product.price * quantity;
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
            response.merchantTransactionId
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
    return <div></div>;
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
            {/* <ReactMarkdown>{product.description}</ReactMarkdown> */}
          </div>
          {product.benefits && (
            <Accordion title="Benefits">
              <div className="markdown-container">
                {parse(product.benefits)}
              </div>
              {/* <ReactMarkdown>{product.benefits}</ReactMarkdown> */}
            </Accordion>
          )}
          {product.suggestedUse && (
            <Accordion title="Suggested Use">
              <div className="markdown-container">
                {parse(product.suggestedUse)}
              </div>
              {/* <ReactMarkdown>{product.suggestedUse}</ReactMarkdown> */}
            </Accordion>
          )}
          {product.nutritionalUse && (
            <Accordion title="Nutritional Information">
              <div className="markdown-container">
                {parse(product.nutritionalUse)}
              </div>
              {/* <ReactMarkdown>{product.nutritionalUse}</ReactMarkdown> */}
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
            <div className="flex items-center gap-2">
              <StarIcon className="w-5 h-5 fill-primary" />
              <StarIcon className="w-5 h-5 fill-primary" />
              <StarIcon className="w-5 h-5 fill-primary" />
              <StarIcon className="w-5 h-5 fill-primary" />
              <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" />
              <span className="text-sm text-gray-500 dark:text-gray-400">
                (123 reviews)
              </span>
            </div>
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
                <Select defaultValue={product.flavourId[0]?.name}>
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
                <Select defaultValue={product.sizeId[0]?.name}>
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
      <div className="grid gap-8 mt-12">
        <div className="grid gap-4">
          <h2 className="font-bold text-xl">Product Ratings</h2>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-0.5">
              <StarIcon className="w-5 h-5 fill-primary" />
              <StarIcon className="w-5 h-5 fill-primary" />
              <StarIcon className="w-5 h-5 fill-primary" />
              <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" />
              <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" />
            </div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              4.3 (123 reviews)
            </span>
          </div>
          <div className="grid gap-2">
            <div className="flex items-center gap-2">
              <div className="w-20 text-right text-sm text-gray-500 dark:text-gray-400">
                5 stars
              </div>
              <div className="h-2 w-full rounded-full bg-gray-200 dark:bg-gray-800">
                <div className="h-2 w-[80%] rounded-full bg-primary" />
              </div>
              <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                80%
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-20 text-right text-sm text-gray-500 dark:text-gray-400">
                4 stars
              </div>
              <div className="h-2 w-full rounded-full bg-gray-200 dark:bg-gray-800">
                <div className="h-2 w-[15%] rounded-full bg-primary" />
              </div>
              <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                15%
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-20 text-right text-sm text-gray-500 dark:text-gray-400">
                3 stars
              </div>
              <div className="h-2 w-full rounded-full bg-gray-200 dark:bg-gray-800">
                <div className="h-2 w-[5%] rounded-full bg-primary" />
              </div>
              <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                5%
              </span>
            </div>
          </div>
        </div>
        <Separator />
        <div className="grid gap-6">
          <h2 className="font-bold text-xl">Customer Feedback</h2>
          <div className="grid gap-6">
            <div className="flex gap-4">
              <Avatar className="w-10 h-10 border">
                <AvatarImage alt="@shadcn" src="/placeholder-user.jpg" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className="grid gap-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold">Sarah Johnson</h3>
                  <div className="flex items-center gap-0.5">
                    <StarIcon className="w-5 h-5 fill-primary" />
                    <StarIcon className="w-5 h-5 fill-primary" />
                    <StarIcon className="w-5 h-5 fill-primary" />
                    <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" />
                    <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" />
                  </div>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  I&apos;ve been using this protein powder for a few weeks now
                  and I&apos;m really impressed with the quality and taste. It
                  blends smoothly into my shakes and provides a great boost of
                  protein to start my day.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <Avatar className="w-10 h-10 border">
                <AvatarImage alt="@shadcn" src="/placeholder-user.jpg" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className="grid gap-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold">Michael Brown</h3>
                  <div className="flex items-center gap-0.5">
                    <StarIcon className="w-5 h-5 fill-primary" />
                    <StarIcon className="w-5 h-5 fill-primary" />
                    <StarIcon className="w-5 h-5 fill-primary" />
                    <StarIcon className="w-5 h-5 fill-primary" />
                    <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" />
                  </div>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  This is hands down the best protein powder I&apos;ve tried.
                  The chocolate flavor is delicious, and I love that it&apos;s
                  made with organic ingredients. Highly recommend!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Dialog>
        <DialogTrigger asChild>
          <Button size="lg" className="mt-4 self-center">
            Leave a Review
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Leave a Review</DialogTitle>
            <DialogDescription>
              Select the number of stars and write your review.
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <StarIcon
                key={star}
                className={`w-8 h-8 cursor-pointer ${
                  star <= stars
                    ? "fill-primary"
                    : "fill-muted stroke-muted-foreground"
                }`}
                onClick={() => handleStarClick(star)}
              />
            ))}
          </div>
          <Textarea
            className="mt-4"
            value={review}
            onChange={(e) => setReview(e.target.value)}
            placeholder="Write your review here"
          />
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setStars(0);
                setReview("");
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                handleReviewSubmit();
                setStars(0);
                setReview("");
              }}
            >
              Submit
            </Button>
          </DialogFooter>
        </DialogContent>
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
      className={props.className} // Use className instead of class
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
      className={props.className} // Use className instead of class
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
      className={props.className} // Use className instead of class
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}
