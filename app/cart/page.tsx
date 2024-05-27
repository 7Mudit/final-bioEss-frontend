"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useCart } from "@/context/cartContext"; // Ensure this path is correct
import { useEffect, useState } from "react";

export default function Component() {
  const { cart, removeFromCart, addToCart, clearCart } = useCart();
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const cartTotal = cart.reduce(
      (acc: any, item: any) => acc + item.price * item.quantity,
      0
    );
    setTotal(cartTotal);
  }, [cart]);

  const handleQuantityChange = (product: any, change: any) => {
    const updatedProduct = { ...product, quantity: product.quantity + change };
    if (updatedProduct.quantity <= 0) return;
    removeFromCart(product.id);
    addToCart(updatedProduct);
  };

  if (cart.length === 0) {
    return (
      <div className="container mx-auto py-12 px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 py-24">
          <h2 className="text-2xl font-bold">
            No items found. Add items to your cart.
          </h2>
          <Link
            className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-6 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
            href="/" // Ensure this path is correct
          >
            Go to Shop
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <div className="grid gap-8">
        {cart.map((product: any) => (
          <div
            key={product.id}
            className="grid gap-6 border-b border-gray-200 pb-8 dark:border-gray-800"
          >
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-[auto_1fr_auto] sm:gap-6">
              <Image
                alt={product.name}
                className="aspect-square rounded-md object-cover"
                height={100}
                src={product.image}
                width={100}
              />
              <div className="grid gap-1">
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <p className="text-sm text-gray-500 line-clamp-2 dark:text-gray-400">
                  Dummy Description
                </p>
                <div className="flex items-center gap-2">
                  <div className="text-lg font-semibold">
                    ${product.price.toFixed(2)}
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={() => handleQuantityChange(product, -1)}
                    >
                      <MinusIcon className="h-4 w-4" />
                    </Button>
                    <Input
                      className="w-16 rounded-md border border-gray-200 bg-transparent px-2 py-1 text-center text-sm shadow-sm transition-colors focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900 dark:border-gray-800 dark:focus:border-gray-50 dark:focus:ring-gray-50"
                      value={product.quantity}
                      readOnly
                      type="number"
                    />
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={() => handleQuantityChange(product, 1)}
                    >
                      <PlusIcon className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
              <div className="flex items-start justify-end">
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => removeFromCart(product.id)}
                >
                  <TrashIcon className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        ))}
        <div className="flex flex-col items-end gap-4">
          <div className="text-2xl font-semibold">
            Total: ${total.toFixed(2)}
          </div>
          <Button size="lg" onClick={clearCart}>
            Clear Cart
          </Button>
          <Button size="lg" onClick={() => alert("Proceed to checkout")}>
            Buy Now
          </Button>
        </div>
      </div>
    </div>
  );
}

function MinusIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={props.className}
    >
      <path d="M5 12h14" />
    </svg>
  );
}

function PlusIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={props.className}
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  );
}

function TrashIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={props.className}
    >
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </svg>
  );
}
