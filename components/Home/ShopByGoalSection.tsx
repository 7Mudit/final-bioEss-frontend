import Image from "next/image";
import React from "react";

const shops = [
  { img: "/goals/body-building.webp" },
  { img: "/goals/bulking-up.webp" },
  { img: "/goals/muscle-mass.webp" },
];

const ShopByGoalSection = () => {
  return (
    <div className="flex flex-col my-[60px] gap-[50px]">
      <h1 className="text-center leading-[37px] text-[34px]">Shop By Goal</h1>
      <div className="flex flex-wrap flex-row items-center justify-center gap-5">
        {shops.map((shop, index) => (
          <div
            key={index}
            className="w-[339px]  rounded-[40px] h-[361px] lg:w-[341px] lg:h-[600px]"
          >
            <Image
              alt="image"
              src={shop.img}
              className="w-[339px]  h-[361px] lg:w-[341px] lg:h-[500px] rounded-[40px] object-cover duration-300 transition-all hover:scale-110 cursor-pointer"
              width={341}
              height={500}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShopByGoalSection;
