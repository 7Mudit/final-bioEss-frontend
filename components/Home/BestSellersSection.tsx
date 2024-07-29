"use client";
import { useEffect, useState } from "react";
import axios from "axios";

// import Products from "./Products";
import { toast } from "sonner";
import Products from "./Products";
import Loading from "@/app/(home)/loading";
// import { redirect } from "next/navigation";

const BestSellersSection = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "https://bioessentia.store/api/66585955a3fe976423095792/products?isFeatured=true"
        );
        setProducts(response.data);
      } catch (err: any) {
        setError(err.message);
        toast.error("Error", {
          description: err.message,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);
  // if (error) {
  //   redirect("/error");
  // }
  return (
    <div className="flex flex-col my-[60px] gap-[50px]">
      <div className="text-center">
        <h2 className="text-2xl font-bold tracking-tight sm:text-[50px]">
          Products
        </h2>
        <p className="mt-2 text-muted-foreground">
          Get the most value with our curated supplements.
        </p>
      </div>
      {loading && <Loading />}
      {products.length !== 0 && <Products products={products} />}
    </div>
  );
};

export default BestSellersSection;
