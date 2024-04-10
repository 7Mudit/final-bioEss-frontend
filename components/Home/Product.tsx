import React, { useState } from "react";
// import { BackgroundGradient } from "../ui/background-gradient";
import Image from "next/image";
import { Button } from "../ui/button";
import RatingStars from "../shared/RatingStars";

interface ProductProps {
  id: number;
  img: string;
  name: string;
  desc: string;
  prize: string;
  prizeStrike: string;
  discountPrize: string;
  category: string;
  stars: number;
  hot?: boolean;
  sale?: boolean;
  newPro?: boolean;
}

const Product = ({
  id,
  img,
  category,
  name,
  desc,
  prize,
  prizeStrike,
  discountPrize,
  stars,
  hot = false,
  sale = false,
  newPro = false,
}: ProductProps) => {
  return (
    <div className="rounded-[22px] border-[2px]  flex flex-col gap-3 max-w-sm p-4 min-h-[550px] items-start justify-between sm:p-10 relative bg-white dark:bg-zinc-900">
      {hot && (
        <div className="absolute -left-[1px] -top-[1px] base-medium rounded-tl-[22px] rounded-br-3xl bg-yellow-700 py-2 px-6 text-white">
          Hot
        </div>
      )}
      {newPro && (
        <div className="absolute -left-[1px] -top-[1px] base-medium rounded-tl-[22px] rounded-br-3xl bg-green-700 py-2 px-6 text-white">
          New
        </div>
      )}
      {sale && (
        <div className="absolute -left-[1px] -top-[1px] base-medium rounded-tl-[22px] rounded-br-3xl bg-purple-600 py-2 px-6 text-white">
          Sale
        </div>
      )}

      <Image
        src={img}
        alt="jordans"
        height="400"
        width="400"
        className="object-cover w-[400px] h-[400px]"
      />
      <p className="text-sm text-gray-400  dark:text-neutral-200 font-extrabold">
        {category}
      </p>
      <p className="text-base sm:text-xl text-black  dark:text-neutral-200 font-extrabold">
        {name}
      </p>
      <RatingStars Review_Count={stars} />
      <p className="text-sm text-neutral-600 text-justify dark:text-neutral-400">
        {desc}
      </p>

      <div className="flex items-center justify-center flex-row gap-2">
        <p className="font-extrabold text-xl">{prize}</p>
        <p className="font-extralight  text-lg">{prizeStrike}</p>
        <p className="text-[#51b279] line-through text-base">
          Save {discountPrize}
        </p>
      </div>

      <div className="flex flex-col gap-5 sm:flex-row sm:gap-2">
        <Button className="rounded-lg duration-300 transition-all hover:scale-105">
          Buy Now
        </Button>
        <Button className="rounded-lg duration-300 transition-all hover:scale-105 bg-white text-black border border-black">
          Add To Cart
        </Button>
      </div>
    </div>
  );
};

export default Product;
