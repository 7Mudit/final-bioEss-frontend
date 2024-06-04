"use client";
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { fetchCart, updateCart, clearCart } from "@/lib/actions/cart.action";
import { useAuth } from "@clerk/nextjs";

interface IProduct {
  _id: string;
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

  images: string[];

  createdAt: Date;
  updatedAt: Date;
}

interface CartItem {
  product: IProduct;
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  updateCart: (product: IProduct, quantity: number) => Promise<void>;
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
          const cartData = await fetchCart(userId);
          setCart(cartData);
        } catch (error) {
          console.error("Failed to fetch cart:", error);
        }
      }
    };

    getCart();
  }, [isLoaded, userId]);

  const handleUpdateCart = async (product: IProduct, quantity: number) => {
    if (userId) {
      try {
        await updateCart({ userId, productId: product._id, quantity });
        const updatedCart = await fetchCart(userId);
        setCart(updatedCart);
      } catch (error) {
        console.error("Failed to update cart:", error);
      }
    }
  };

  const handleClearCart = async () => {
    if (userId) {
      try {
        await clearCart(userId);
        setCart([]);
      } catch (error) {
        console.error("Failed to clear cart:", error);
      }
    }
  };
  return (
    <CartContext.Provider
      value={{ cart, updateCart: handleUpdateCart, clearCart: handleClearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
