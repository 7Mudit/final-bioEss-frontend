"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { ModeToggle } from "../ui/Toggle";
import { useTheme } from "next-themes";
import { SignUpButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Button } from "../ui/button";
import { useCart } from "@/context/cartContext";

const Navbar = () => {
  const { theme } = useTheme();
  const { cart } = useCart();
  const [count, setCount] = useState(cart.length);

  useEffect(() => {
    setCount(cart.length);
  }, [cart]);

  return (
    <div className="flex px-2 py-10 sm:px-4 justify-between h-[72px] items-center border-b ">
      {/* logo */}
      <Link href="/">
        <Image
          src={theme === "dark" ? "/logoDark.png" : "/logoWhite.png"}
          width={120}
          height={38}
          className=""
          alt="logo"
        />
      </Link>

      <div className="hidden md:flex  flex-row  items-center justify-center gap-5">
        <Link href="/product/2">Products</Link>
        <a href="#best-sellers">Best Sellers</a>
        <a href="#new-arrivals">New Arrivals</a>
        <a href="#new-arrivals">Combos</a>
      </div>
      <div className="flex flex-row items-center justify-center gap-5">
        <SignedOut>
          <SignUpButton mode="modal">
            <Button
              variant={"outline"}
              className=" border border-blue-500 text-blue-500 rounded-md shadow-sm hover:bg-blue-500 hover:text-white transition-colors duration-300"
            >
              Login/Sign Up
            </Button>
          </SignUpButton>
        </SignedOut>

        <SignedIn>
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
          <Link href="/cart" className="relative">
            <ShoppingCart size={20} className="cursor-pointer" />
            {cart.length > 0 && (
              <div className="absolute -top-2 -right-3 transform translate-x-1/2 -translate-y-1/2 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs animate-bounce">
                {cart.length}
              </div>
            )}
          </Link>
        </SignedIn>
        {/* <User size={20} className="cursor-pointer" />// */}

        {/* <ModeToggle /> */}
      </div>
    </div>
  );
};

export default Navbar;
