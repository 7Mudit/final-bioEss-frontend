"use client";
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
import { useState } from "react";
import { useCart } from "@/context/cartContext";
import { useRouter } from "next/navigation";

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

export default function Component() {
  const [quantity, setQuantity] = useState(1);
  const [stars, setStars] = useState(0);
  const [review, setReview] = useState("");
  const router = useRouter();

  const product = {
    id: 1,
    name: "Organic Protein Powder",
    price: 59.99,
    image: "/productimages/fusion_mango_front.jpg",
    quantity,
  };

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
  const { addToCart } = useCart();
  const handleAddToCart = () => {
    addToCart({ ...product, quantity });
    router.push("/cart");
  };

  return (
    <div className="max-w-6xl px-6 mx-auto py-10">
      <div className="grid md:grid-cols-2 gap-8 lg:gap-16 items-start">
        <div className="grid gap-6 md:gap-12 items-start">
          <Carousel className="rounded-lg overflow-hidden relative">
            <CarouselContent>
              <CarouselItem>
                <Image
                  alt="Product Image"
                  className="aspect-square object-cover w-full"
                  height={600}
                  src="/productimages/fusion_mango_front.jpg"
                  width={600}
                />
              </CarouselItem>
              <CarouselItem>
                <Image
                  alt="Product Image"
                  className="aspect-square object-cover w-full"
                  height={600}
                  src="/productimages/Bulk_front.jpg"
                  width={600}
                />
              </CarouselItem>
              <CarouselItem>
                <Image
                  alt="Product Image"
                  className="aspect-square object-cover w-full"
                  height={600}
                  src="/productimages/Multi_front.jpg"
                  width={600}
                />
              </CarouselItem>
            </CarouselContent>
            <CarouselPrevious className="absolute left-0 top-1/2 transform -translate-y-1/2" />
            <CarouselNext className="absolute right-0 top-1/2 transform -translate-y-1/2" />
          </Carousel>
          <h2 className="font-bold text-xl mt-4">Product Description</h2>
          <div className="grid gap-4 text-sm leading-loose">
            <p>
              Introducing our premium organic protein powder, crafted with the
              finest ingredients to fuel your active lifestyle. Packed with
              high-quality protein, essential vitamins, and minerals, this
              powder is the perfect addition to your daily routine.
            </p>
            <p>
              Enjoy a smooth and creamy texture that blends seamlessly into your
              favorite smoothies, shakes, or baked goods. Available in a variety
              of delicious flavors, our protein powder is sure to satisfy your
              taste buds while supporting your fitness goals.
            </p>
          </div>
          <Accordion title="Benefits">
            <ul className="list-disc list-inside">
              <li>
                24g of protein per serving to help build and maintain muscle
              </li>
              <li>5.5g of naturally occurring BCAAs per serving</li>
              <li>Gluten free</li>
              <li>Banned Substance Tested</li>
              <li>Easy mixing with only a glass and spoon</li>
              <li>20+ great-tasting flavors</li>
            </ul>
          </Accordion>
          <Accordion title="Suggested Use">
            <p>
              Mix about one scoop of the powder into 6 to 8 fluid ounces of cold
              water, milk, or other beverage. Stir, shake, or blend until
              dissolved. For best results, mix up your shake 30 to 60 minutes
              after your workout or use as an anytime snack in your balanced
              diet.
            </p>
            <p>
              For healthy adults, consume enough protein to meet your daily
              protein requirements with a combination of high protein foods and
              protein supplements throughout the day as part of a balanced diet
              and exercise program.
            </p>
          </Accordion>
          <Accordion title="Nutritional Information">
            <p>
              Nutritional information will be shown when a flavor and/or size is
              selected.
            </p>
          </Accordion>
        </div>
        <div className="grid gap-8 md:gap-12 items-start">
          <div className="grid gap-4">
            <h1 className="font-bold text-3xl">Organic Protein Powder</h1>
            <div className="text-2xl font-bold dark:text-white text-gray-900">
              $59.99{" "}
              <span className="text-lg text-red-500 line-through">$79.99</span>
            </div>
            <div className="text-sm dark:text-gray-200 text-gray-500">
              Free shipping on orders over 500₹
            </div>
            <div className="flex items-center gap-2">
              <StarIcon className="w-5 h-5 fill-primary" />
              <StarIcon className="w-5 h-5 fill-primary" />
              <StarIcon className="w-5 h-5 fill-primary" />
              <StarIcon className="w-5 h-5 fill-primary" />
              <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" />
              <span className="text-sm  text-gray-500 dark:text-gray-400">
                (123 reviews)
              </span>
            </div>
            <div className="text-sm dark:text-white text-gray-500">
              <ul className="list-disc list-inside">
                <li>Muscle support</li>
                <li>Post-workout recovery</li>
                <li>100% whey protein powder</li>
                <li>24g protein per serving</li>
                <li>5.5g BCAAs per serving</li>
              </ul>
            </div>
            <div className="grid gap-4">
              <div>
                <Label className="text-base" htmlFor="flavor">
                  Flavor
                </Label>
                <Select defaultValue="vanilla">
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Flavor" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="vanilla">Vanilla</SelectItem>
                    <SelectItem value="chocolate">Chocolate</SelectItem>
                    <SelectItem value="strawberry">Strawberry</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-base" htmlFor="size">
                  Size
                </Label>
                <Select defaultValue="1lb">
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1lb">1 lb</SelectItem>
                    <SelectItem value="2lb">2 lb</SelectItem>
                    <SelectItem value="5lb">5 lb</SelectItem>
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
              <Button size="lg" variant="outline">
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
