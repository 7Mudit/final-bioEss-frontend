"use client";
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import {
  fetchCart,
  updateCart,
  clearCart,
  removeFromCart,
} from "@/lib/actions/cart.action";
import { useAuth } from "@clerk/nextjs";
import { toast } from "sonner";
import { JSONContent } from "novel";

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
  sizeId: {
    name: string;
  };
  price: number;
}

interface Feedback {
  _id: string;
  userName: string;
  rating: number;
  feedback: string;
  createdAt: string;
  approved: boolean;
}

interface IProduct {
  _id: string;
  storeId: string;
  categoryId: Category;
  name: string;
  sizes: Size[];
  fakePrice: number;
  features: string[];
  content?: JSONContent;
  isFeatured: boolean;
  isArchived: boolean;
  flavourId: Flavour[];
  images: Image[];
  orderItems: string[];
  feedbacks: Feedback[];
  createdAt: Date;
  updatedAt: Date;
}

interface CartItem {
  product: IProduct;
  quantity: number;
  flavor: string;
  size: string;
  price: number; // Storing price of the selected size
}

interface CartContextType {
  cart: CartItem[];
  updateCart: (
    product: IProduct,
    quantity: number,
    flavor: string,
    size: string,
    price: number // Pass the price of the selected size
  ) => Promise<void>;
  removeFromCart: (productId: string) => Promise<void>;
  clearCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const { isLoaded, userId } = useAuth();

  useEffect(() => {
    const getCart = async () => {
      if (isLoaded && userId) {
        try {
          const cartData = await fetchCart();
          const data = JSON.parse(cartData);
          setCart(data);
        } catch (error) {
          console.error("Failed to fetch cart:", error);
        }
      }
    };

    getCart();
  }, [isLoaded, userId]);

  const handleUpdateCart = async (
    product: IProduct,
    quantity: number,
    flavor: string,
    size: string,
    price: number
  ) => {
    try {
      await updateCart({
        productId: product._id,
        quantity,
        flavor,
        size,
        price, // Pass the selected size's price
      });

      const updatedCart = await fetchCart();
      const data = JSON.parse(updatedCart);
      setCart(data);
      toast.success("Updated cart");
    } catch (error) {
      console.error("Failed to update cart:", error);
    }
  };

  const handleRemoveFromCart = async (productId: string) => {
    try {
      await removeFromCart(productId);
      const updatedCart = await fetchCart();
      const data = JSON.parse(updatedCart);
      setCart(data);
      toast.success("Removed from cart");
    } catch (error) {
      console.error("Failed to remove item from cart:", error);
    }
  };

  const handleClearCart = async () => {
    try {
      await clearCart();
      setCart([]);
    } catch (error) {
      console.error("Failed to clear cart:", error);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        updateCart: handleUpdateCart,
        removeFromCart: handleRemoveFromCart,
        clearCart: handleClearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
