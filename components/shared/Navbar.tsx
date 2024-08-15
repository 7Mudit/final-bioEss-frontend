"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { ShoppingCart, Search } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SignUpButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Button } from "../ui/button";
import { useCart } from "@/context/cartContext";
import SearchBar from "./SearchBar";

export interface Product {
  _id: string;
  name: string;
}

const Navbar = () => {
  const { cart } = useCart();
  const pathname = usePathname();
  const [count, setCount] = useState(cart.length);
  const [showInput, setShowInput] = useState(false);

  useEffect(() => {
    setCount(cart.length);
  }, [cart]);

  const isActiveLink = (path: string) => {
    if (path === "/") {
      return pathname === path
        ? "underline underline-offset-[10px] decoration-[#ef4444] text-white font-extrabold"
        : "text-white font-bold";
    }
    return pathname.includes(path)
      ? "underline underline-offset-[10px] decoration-[#ef4444] text-white font-extrabold"
      : "text-white font-bold";
  };

  return (
    <div className="flex bg-black px-2 py-4 sm:px-4 justify-between items-center shadow-lg">
      {/* Logo */}
      <Link href="/">
        <Image src={"/logoDark.png"} width={120} height={38} alt="logo" />
      </Link>

      {/* Navigation Links */}
      <div className="hidden md:flex flex-row items-center justify-center gap-5">
        <Link href="/" className={isActiveLink("/")}>
          Home
        </Link>
        <Link href="/products" className={isActiveLink("/products")}>
          Products
        </Link>
        {/* <Link
          href="/become-a-distributor"
          className={isActiveLink("/become-a-distributor")}
        >
          Become a Distributor
        </Link> */}
      </div>

      {/* User Actions */}
      <div className="flex items-center gap-5">
        <div className="relative">
          <Search
            size={20}
            color="white"
            className="cursor-pointer"
            onClick={() => setShowInput(true)}
          />
        </div>
        <SignedOut>
          <SignUpButton mode="modal">
            <Button
              variant={"outline"}
              className="border border-blue-500 text-blue-500 rounded-md shadow-sm hover:bg-blue-500 hover:text-white transition-colors duration-300"
            >
              Login/Sign Up
            </Button>
          </SignUpButton>
        </SignedOut>

        <SignedIn>
          <Link href="/cart" className="relative">
            <ShoppingCart size={20} color="white" className="cursor-pointer" />
            {count > 0 && (
              <div className="absolute -top-2 -right-3 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs animate-bounce">
                {count}
              </div>
            )}
          </Link>
          <Button variant={"destructive"}>
            <Link href="/my-orders">Orders</Link>
          </Button>
          <UserButton
            appearance={{
              elements: {
                avatarBox: "h-10 w-10",
              },
              variables: {
                colorPrimary: "#3b82f6",
              },
            }}
            afterSignOutUrl="/"
          />
        </SignedIn>
      </div>
      <SearchBar show={showInput} onClose={() => setShowInput(false)} />
    </div>
  );
};

export default Navbar;
