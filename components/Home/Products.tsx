import React from "react";
import Product from "./Product";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
} from "@/components/ui/carousel";
import Link from "next/link";

export default function Products({ heading, products }: any) {
  return (
    <div className="flex relative flex-col pb-[150px] px-4 lg:px-10 gap-10 items-start justify-center">
      {/* <h1 className="text-[40px] font-bold ">{heading}</h1> */}
      {/* <div className="flex flex-row flex-wrap gap-10 items-center justify-center"> */}
      <Carousel
        opts={{ loop: true, align: "start" }}
        className="max-w-[75vw]  sm:max-w-[90vw] sm:px-4"
      >
        <CarouselContent className="   gap-5">
          {products.map((product: any, index: any) => (
            <CarouselItem key={index} className="max-w-[384px] cursor-pointer">
              <Product {...product} />
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselNext />
      </Carousel>
      {/* </div> */}
    </div>
  );
}
