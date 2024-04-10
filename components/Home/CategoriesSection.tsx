import Image from "next/image";
import React from "react";

const categories = [
  {
    name: "Proteins",
    bgColor: "#ff4555",
    img: "/categories/protein.webp",
  },
  {
    bgColor: "#00c0ff",
    name: "Amino Acids",
    img: "/categories/amino-acids.webp",
  },
  {
    bgColor: "#ff0000",
    name: "Gainers",
    img: "/categories/gainers.webp",
  },
  {
    bgColor: "#7bc588",
    name: "Pre Workout",
    img: "/categories/pre-workout.webp",
  },
  {
    bgColor: "#80d800",
    name: "Accessories",
    img: "/categories/accessories.webp",
  },
];

const CategoriesSection = () => {
  return (
    <div className="flex px-[20px] my-[90px] flex-row flex-wrap items-center justify-center gap-5 ">
      {categories.map((category, index) => (
        <div
          className={`rounded-full flex flex-col items-center justify-center gap-3   bg-[${category.bgColor}] w-[130px] h-[160px] lg:w-[250px] lg:h-[250px]`}
          key={index}
        >
          <Image
            src={category.img}
            className="w-[130px] h-[130px] lg:w-[250px] lg:h-[250px]"
            width={250}
            height={250}
            alt="Category"
          />
          <p>{category.name}</p>
        </div>
      ))}
    </div>
  );
};

export default CategoriesSection;
