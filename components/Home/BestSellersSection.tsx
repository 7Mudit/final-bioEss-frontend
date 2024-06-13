"use client";
import { useEffect, useState } from "react";
import axios from "axios";

// import Products from "./Products";
import { toast } from "sonner";
import Products from "./Products";

const BestSellersSection = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "https://bioessentia.store/api/66585955a3fe976423095792/products"
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
  return (
    <div className="flex flex-col my-[60px] gap-[50px]">
      <h1 className="text-center leading-[37px] text-[34px]">Products</h1>
      {loading && <div className="text-center">Loading...</div>}
      {error && <div className="text-center text-red-500">Error: {error}</div>}
      {products.length !== 0 && (
        <Products products={products} heading="Popular Products" />
      )}
    </div>
  );
};

export default BestSellersSection;
