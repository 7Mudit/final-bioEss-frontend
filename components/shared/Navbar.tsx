"use client";
import Image from "next/image";
import React from "react";
import {
  Cloud,
  CreditCard,
  Github,
  Keyboard,
  LifeBuoy,
  LogOut,
  Mail,
  MessageSquare,
  Plus,
  PlusCircle,
  Settings,
  ShoppingCart,
  User,
  UserPlus,
  Users,
} from "lucide-react";
import { LucideSquareArrowDownRight } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { ModeToggle } from "../ui/Toggle";
import { useTheme } from "next-themes";

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
        <User size={20} className="cursor-pointer" />
        <ShoppingCart size={20} className="cursor-pointer" />
        <ModeToggle />
      </div>
    </div>
  );
};

export default Navbar;
