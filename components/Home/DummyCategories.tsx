import Image from "next/image";
import React from "react";

const categories = [
  {
    name: "Aminos",
    bgColor: "#ff4555",
    img: "/categories/Aminos.png",
  },
  {
    bgColor: "#00c0ff",
    name: "Daily wellness",
    img: "/categories/Daily Wellness.png",
  },
  {
    bgColor: "#ff0000",
    name: "Proteins",
    img: "/categories/Protein.PNG",
  },
];

const DummyCategories = () => {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container grid gap-8 px-4 md:px-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Shop by Category
          </h2>
          <p className="mt-2 text-muted-foreground">
            Browse our selection of sports supplements by category.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3  ">
          {categories.map((category, index) => (
            <div
             
              className="group flex flex-col items-center justify-center gap-2 rounded-lg bg-background p-4 transition-colors hover:bg-accent hover:text-accent-foreground"
       
              key={index}
            >
              <Image
                src={category.img}
                alt={category.name}
                width={250}
                height={250}
                className=" rounded-full object-cover"
              />
              <span className="text-sm font-medium">{category.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DummyCategories;
