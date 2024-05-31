"use client";
import { createContext, useContext, useState, ReactNode } from "react";

interface Image {
  _id: string;
  url: string;
}

interface Category {
  _id: string;
  name: string;
}

interface Flavour {
  _id: string;
  name: string;
}

interface Size {
  _id: string;
  name: string;
}

interface Product {
  _id: string;
  name: string;
  description: string;
  benefits: string;
  suggestedUse: string;
  nutritionalUse: string;
  price: number;
  features: string[];
  fakePrice: number;
  images: Image[];
  categoryId: Category;
  flavourId: Flavour[];
  sizeId: Size[];
  quantity: number;
}

interface CartContextType {
  cart: Product[];
  addToCart: (product: Product) => void;
  updateCart: (product: Product) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<Product[]>([]);

  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item._id === product._id);
      if (existingProduct) {
        return prevCart.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + product.quantity }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: product.quantity }];
      }
    });
  };

  const updateCart = (product: Product) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item._id === product._id
          ? { ...item, quantity: product.quantity }
          : item
      )
    );
  };

  const removeFromCart = (id: string) => {
    setCart((prevCart) => prevCart.filter((item) => item._id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, updateCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
