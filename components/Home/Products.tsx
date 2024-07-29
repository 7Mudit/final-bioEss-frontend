import React from "react";
import Product from "./HomePageCards";

export default function Products({ heading, products }: any) {
  return (
    <div className="flex flex-col pb-20 px-4 lg:px-10 gap-10 items-start">
      <div className="grid w-full mx-auto grid-cols-1  xs:grid-cols-2  sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product: any) => (
          <Product
            key={product._id}
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
        ))}
      </div>
      {/* <Carousel
        opts={{ loop: true, align: "start" }}
        className="max-w-[75vw] sm:max-w-[90vw] sm:px-4"
      >
        <CarouselContent className="gap-5">
          {products.map((product: any) => (
            <CarouselItem
              key={product._id}
              className="max-w-[384px] cursor-pointer"
            >
              <HomePageCards
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
      </Carousel> */}
    </div>
  );
}
