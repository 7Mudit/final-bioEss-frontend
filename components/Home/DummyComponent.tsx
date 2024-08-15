import React from "react";
import { FaArrowRight } from "react-icons/fa";
import img from "../../public/dummyComponent/hypermax.png";
import Image from "next/image";
import Link from "next/link";

const DummyComponent = () => {
  return (
    <div className="px-5 sm:px-10 py-16 lg:py-10 flex gap-20 md:gap-4 items-center md:flex-row flex-col">
      <div className="right-section space-y-10 md:w-5/12 lg:w-6/12 w-full">
        <h2 className="font-semibold text-4xl lg:text-5xl">
          Unleash Your Inner Beast With SIEGE ULTRA!
        </h2>
        <div className="w-full space-y-3">
          <h5 className="font-bold">
            Ignite Energy, Sharpen Focus, Conquer Every Rep
          </h5>
          <p>
            SIEGE ULTRA is not for beginners. Take a scoop and experience a
            surge of natural energy, laser-sharp focus, and power to take on
            every rep like a pro. Don&apos;t settle for mediocre – unlock your
            full potential and dominate the gym bros with SIEGE ULTRA.
          </p>
        </div>
        <Link
          href="/product/ben-seige-ultra"
          className="flex gap-3 sm:w-[300px]  justify-center items-center group border relative  border-black bg-slate-100 px-5 py-5"
        >
          <p className="font-semibold sm:text-md group-hover:text-white z-20 text-sm">
            GET SIEGE ULTRA NOW
          </p>
          <FaArrowRight className="text-sm z-20 group-hover:text-white" />

          <div className=" bg-black h-2/4 w-0 group-hover:w-full z-0 transition-all duration-300  absolute right-0 top-0"></div>
          <div className="w-0 group-hover:w-full z-0 transition-all duration-300 bg-black h-2/4 absolute left-0 bottom-0"></div>
        </Link>
      </div>

      <div className="left-section relative md:w-7/12 lg:w-6/12 w-full  sm:w-9/12  ">
        <Image
          src={img}
          alt="dummycomponentimage"
          className="hover:scale-110 transition-all mx-auto duration-200"
        />

        <div className="tag-section   absolute left-0 -bottom-5 sm:-bottom-1 bg-white border border-y-cyan-500 flex gap-5 lg:gap-10 py-4 rounded-br-3xl px-10">
          <div className="tag-1 space-y-1">
            <p className="font-bold text-[1.2rem] sm:text-[1.5rem]">
              1.5 <sup className="font-semibold">k</sup>
            </p>
            <p className="font-bold italic text-[0.7rem] sm:text-[0.8rem]">
              SIEGE ULTRA SOLD
            </p>
          </div>

          <div className="tag-2 space-y-1">
            <p className="font-bold text-[1.2rem] sm:text-[1.5rem]">
              10 <sup className="font-semibold">k</sup>
            </p>
            <p className="font-bold italic text-[0.7rem] sm:text-[0.8rem]">
              CUSTOMER SERVED
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DummyComponent;
