"use server";

import { getCategories } from "@/lib/actions/category.action";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const DummyCategories = async () => {
  let categories = await getCategories();
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container grid gap-8 px-4 md:px-6">
        <div className="text-center">
          <h2 className="text-xl font-bold tracking-tight sm:text-2xl md:text-3xl">
            Shop by Category
          </h2>
          <p className="mt-2 text-sm sm:text-base md:text-lg text-muted-foreground">
            Browse our selection of sports supplements by category.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3">
          {categories &&
            categories.map((category: any, index: any) => (
              <Link
                href={`/products?category=${encodeURIComponent(category.name)}`}
                key={index}
                className="relative cursor-pointer flex items-center justify-center h-64 rounded-lg bg-gray-900 transition-all duration-300 hover:bg-gray-800 hover:scale-110"
                style={{ backgroundColor: category.image }}
              >
                <Image
                  src={category.img}
                  alt={category.name}
                  className="absolute object-cover inset-0 w-full h-full opacity-20"
                />
                <span className="relative z-10 text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white">
                  {category.name}
                </span>
              </Link>
            ))}
        </div>
      </div>
    </section>
  );
};

export default DummyCategories;
