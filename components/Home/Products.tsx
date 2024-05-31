import React from "react";
import Product from "./Product";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
} from "@/components/ui/carousel";

export default function Products({ heading, products }: any) {
  return (
    <div className="flex relative flex-col pb-[150px] px-4 lg:px-10 gap-10 items-start justify-center">
      <Carousel
        opts={{ loop: true, align: "start" }}
        className="max-w-[75vw] sm:max-w-[90vw] sm:px-4"
      >
        <CarouselContent className="gap-5">
          {products.map((product: any) => (
            <CarouselItem
              key={product._id}
              className="max-w-[384px] cursor-pointer"
            >
              <Product
                id={product._id}
                img={product.images[0]?.url}
                category={product.categoryId.name}
                name={product.name}
                desc={product.description}
                prize={product.price}
                prizeStrike={product.fakePrice}
                discountPrize={product.fakePrice - product.price}
                rating={4.5} // Assuming you have a rating field or will add it
                hot={product.isFeatured}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselNext />
      </Carousel>
    </div>
  );
}
