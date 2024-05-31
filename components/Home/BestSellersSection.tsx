"use client";
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Products from "./Products";
import https from "https";

const BestSellersSection = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const toastId = useRef<string | undefined>(undefined);

  useEffect(() => {
    const fetchProducts = async () => {
      if (!toastId.current) {
        toastId.current = toast.loading("Loading products...");
      }

      try {
        const response = await axios.get(
          "https://bioessentia.store/api/66585955a3fe976423095792/products",
          {
            httpsAgent: new https.Agent({
              rejectUnauthorized: false, // Ignore SSL certificate errors
            }),
          }
        );
        setProducts(response.data);
        toast.success("Products loaded successfully!", {
          id: toastId.current,
        });
      } catch (err: any) {
        setError(err.message);
        toast.error(`Error: ${err.message}`, {
          id: toastId.current,
        });
      } finally {
        setLoading(false);
        if (toastId.current) {
          toast.dismiss(toastId.current);
          toastId.current = undefined;
        }
      }
    };

    fetchProducts();
  }, []);
  return (
    <div className="flex flex-col my-[60px] gap-[50px]">
      <Toaster /> {/* Add this line to render toasts */}
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
