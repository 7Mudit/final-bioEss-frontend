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

const CategoriesSection = () => {
  return (
    <div className="flex px-[20px] my-[90px] flex-row flex-wrap items-center justify-center gap-5 ">
      {categories.map((category, index) => (
        <div
          className={`rounded-full flex flex-col items-center justify-center gap-3   bg-[${category.bgColor}] transition-all hover:scale-105 duration-500 cursor-pointer w-[130px]  h-[160px] lg:w-[250px] lg:h-[250px]`}
          key={index}
        >
          <Image
            src={category.img}
            className="w-[130px] h-[160px] rounded-xl lg:w-[250px] lg:h-[250px]"
            width={250}
            height={250}
            alt="Category"
          />
          <p className="text-bold leading-[25px] text-[18px]">
            {category.name}
          </p>
        </div>
      ))}
    </div>
  );
};

export default CategoriesSection;
