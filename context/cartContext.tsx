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
import { toast } from "react-toastify";

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

interface IProduct {
  _id: string;
  storeId: string;
  categoryId: Category;
  name: string;
  price: number;
  fakePrice: number;
  description: string;
  features: string[];
  suggestedUse: string;
  benefits: string;
  nutritionalUse: string;
  isFeatured: boolean;
  isArchived: boolean;
  sizeId: Size[];
  flavourId: Flavour[];
  images: Image[];
  orderItems: string[];
  feedbacks: string[];
  createdAt: Date;
  updatedAt: Date;
}

interface CartItem {
  product: IProduct;
  quantity: number;
  flavor: string;
  size: string;
}

interface CartContextType {
  cart: CartItem[];
  updateCart: (
    product: IProduct,
    quantity: number,
    flavor: string,
    size: string
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
    size: string
  ) => {
    try {
      await updateCart({
        productId: product._id,
        quantity,
        flavor,
        size,
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
      // toast.success("Cart cleared");
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
