import React from "react";
import { popularProducts } from "@/constants";
import Products from "./Products";
const BestSellersSection = () => {
  return (
    <div className="flex flex-col my-[60px] gap-[50px]">
      <h1 className="text-center leading-[37px] text-[34px]">Best Sellers</h1>
      <Products products={popularProducts} heading="Popular Products" />
    </div>
  );
};

export default BestSellersSection;
