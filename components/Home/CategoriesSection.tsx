import Image from "next/image";
import React from "react";

const categories = [
  {
    name: "Creatine",
    bgColor: "#ff4555",
    img: "/categories/creatine.jpeg",
  },
  {
    bgColor: "#00c0ff",
    name: "Daily Wellness",
    img: "/categories/daily-wellness.jpeg",
  },
  {
    bgColor: "#ff0000",
    name: "Protein",
    img: "/categories/protein.jpeg",
  },
  // {
  //   bgColor: "#7bc588",
  //   name: "Pre Workout",
  //   img: "/categories/pre-workout.webp",
  // },
  // {
  //   bgColor: "#80d800",
  //   name: "Accessories",
  //   img: "/categories/accessories.webp",
  // },
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
            className="w-[130px] h-[160px] lg:w-[250px] lg:h-[250px]"
            width={250}
            height={250}
            alt="Category"
          />
          <p className="text-bold font-mono leading-[25px] text-[16px]">
            {category.name}
          </p>
        </div>
      ))}
    </div>
  );
};

export default CategoriesSection;
