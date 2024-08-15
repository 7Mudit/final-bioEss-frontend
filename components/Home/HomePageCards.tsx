import React from "react";
import Image from "next/image";
import { Button } from "../ui/button";
import RatingStars from "../shared/RatingStars";
import Link from "next/link";

interface ProductProps {
  id: string;
  img: string;
  name: string;
  desc: string;
  prize: number;
  prizeStrike: number;
  discountPrize: number;
  category: string;
  rating: number;
  hot?: boolean;
  sale?: boolean;
  newPro?: boolean;
}

const generateSlug = (name: string) => {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
};

const Product = ({
  id,
  img,
  category,
  name,
  desc,
  prize,
  prizeStrike,
  discountPrize,
  rating,
  hot = false,
  sale = false,
  newPro = false,
}: ProductProps) => {
  // const discount = ((discountPrize / prizeStrike) * 100).toFixed(0);
  const slug = generateSlug(name);

  return (
    <Link
      href={`/product/${slug}`}
      className="rounded-xl border flex flex-col gap-1 p-4 items-start justify-between relative bg-white shadow-xl dark:bg-zinc-900 max-w-[350px] duration-300 hover:scale-105 transition-all"
    >
      <Image
        src={img}
        alt={name}
        height={200}
        width={200}
        className="object-cover lg:object-contain aspect-square w-[500px] h-56"
      />
      <p className="text-xs text-gray-500 dark:text-neutral-200 font-semibold">
        {category}
      </p>
      <p className="text-sm sm:text-lg text-black dark:text-neutral-200 font-bold">
        {name}
      </p>
      <RatingStars Review_Count={rating} />
      <div className="flex items-center gap-2">
        <p className="font-bold text-lg">₹{prize}</p>
        {prizeStrike && (
          <p className="font-extralight line-through text-sm">₹{prizeStrike}</p>
        )}
      </div>
      {discountPrize > 0 && (
        <p className="text-green-500 text-sm">Save ₹{discountPrize}</p>
      )}
      <Button className="mt-2 w-full">Buy Now</Button>
    </Link>
  );
};

export default Product;
