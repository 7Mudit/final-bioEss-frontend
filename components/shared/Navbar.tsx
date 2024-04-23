"use client";
import Image from "next/image";
import React from "react";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { ModeToggle } from "../ui/Toggle";
import { useTheme } from "next-themes";
import { SignUpButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Button } from "../ui/button";

const Navbar = () => {
  const { theme } = useTheme();
  return (
    <div className="flex px-2 py-10 sm:px-4 justify-between h-[72px] items-center">
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
        <a href="#best-sellers">Products</a>
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
          <ShoppingCart size={20} className="cursor-pointer" />
        </SignedIn>
        {/* <User size={20} className="cursor-pointer" /> */}

        <ModeToggle />
      </div>
    </div>
  );
};

export default Navbar;
