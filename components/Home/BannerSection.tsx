"use client";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { gsap } from "gsap";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

const imageArr = [
  { img: "/banners/banner1.webp" },
  { img: "/banners/banner2.webp" },
  { img: "/banners/banner3.webp" },
  { img: "/banners/banner4.webp" },
];

const BannerSection: React.FC = () => {
  const swiperRef = React.useRef<any>(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  useEffect(() => {
    const swiperInstance = swiperRef.current;
    if (swiperInstance) {
      setIsBeginning(swiperInstance.isBeginning);
      setIsEnd(swiperInstance.isEnd);
    }
  }, []);

  const handleSlideChange = (swiper: any) => {
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);

    gsap.to(".swiper-slide img", { scale: 1, duration: 0.5 });
    const activeSlideImage =
      swiper.slides[swiper.activeIndex].querySelector("img");
    gsap.fromTo(activeSlideImage, { scale: 1.2 }, { scale: 1, duration: 1.5 });
  };

  return (
    <div className="w-full relative">
      <Swiper
        slidesPerView={1}
        onSlideChange={handleSlideChange}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
      >
        {imageArr.map((curr, index) => (
          <SwiperSlide key={index} className="w-full h-[600px]">
            <Image
              src={curr.img}
              key={index}
              width={1500}
              height={600}
              alt="bannerImage"
              className="w-full object-cover h-full"
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="absolute bottom-4 z-[10] right-4">
        <div className="flex flex-row gap-5">
          <div
            className={`bg-white flex flex-row rounded-full items-center justify-center cursor-pointer p-4 group w-[50px] h-[50px] ${
              isBeginning ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={() => !isBeginning && swiperRef.current?.slidePrev()}
          >
            <ChevronLeft
              color="black"
              className="duration-300 transition-all group-hover:-translate-x-3"
              size={22}
            />
          </div>
          <div
            className={`bg-white flex flex-row rounded-full items-center justify-center cursor-pointer p-4 group w-[50px] h-[50px] ${
              isEnd ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={() => !isEnd && swiperRef.current?.slideNext()}
          >
            <ChevronRight
              color="black"
              className="duration-300 transition-all group-hover:translate-x-3"
              size={22}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannerSection;
