import React from "react";
import { AboutBen, NeedHelp, information, products } from "@/constants";
import { Input } from "../ui/input";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { RiTwitterXFill } from "react-icons/ri";
import { SlSocialLinkedin } from "react-icons/sl";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { LucideMails } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  return (
    <>
      <div className="border-b-[1px] bg-black text-white border-gray-600 p-10 md:p-20 flex flex-col lg:flex-row gap-10 items-start justify-between w-full h-full">
        {/* For large screens */}
        <div className="hidden md:flex w-full xl:w-[60%] h-full flex-row items-start justify-between">
          <div className="flex flex-col gap-2 items-start justify-center">
            <h3 className="text-lg font-bold mb-3">Need Help</h3>
            {NeedHelp.map((item) => (
              <Link
                href={item.link !== "" ? `${item.link}` : "#"}
                className="text-gray-200 font-medium text-md hover:underline underline-offset-4 cursor-pointer"
                key={item.id}
              >
                {item.name}
              </Link>
            ))}
          </div>
          <div className="flex flex-col gap-2 items-start justify-start">
            <h3 className="text-lg font-bold mb-3">About Ben</h3>
            {AboutBen.map((item) => (
              <p
                className="text-gray-200 font-medium text-md hover:underline underline-offset-4 cursor-pointer"
                key={item.id}
              >
                {item.name}
              </p>
            ))}
          </div>
          <div className="flex flex-col gap-2 items-start justify-start">
            <h3 className="text-lg font-bold mb-3">Information</h3>
            {information.map((item) => (
              <Link
                href={item.link}
                className="text-gray-200 font-medium text-md hover:underline underline-offset-4 cursor-pointer"
                key={item.id}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
        {/* For mobile screens */}
        <div className="flex md:hidden w-full">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-lg font-bold">
                Products
              </AccordionTrigger>
              <AccordionContent className="flex flex-col gap-2 items-start justify-center">
                {products.map((item) => (
                  <p
                    className="text-gray-200 font-medium text-md hover:underline underline-offset-4 cursor-pointer"
                    key={item.id}
                  >
                    {item.name}
                  </p>
                ))}
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="text-lg font-bold">
                Need Help
              </AccordionTrigger>
              <AccordionContent className="flex flex-col gap-2 items-start justify-center">
                {NeedHelp.map((item) => (
                  <p
                    className="text-gray-200 font-medium text-md hover:underline underline-offset-4 cursor-pointer"
                    key={item.id}
                  >
                    {item.name}
                  </p>
                ))}
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger className="text-lg font-bold">
                Information
              </AccordionTrigger>
              <AccordionContent className="flex flex-col gap-2 items-start justify-center">
                {information.map((item) => (
                  <Link
                    href={item.link}
                    className="text-gray-200 font-medium text-md hover:underline underline-offset-4 cursor-pointer"
                    key={item.id}
                  >
                    {item.name}
                  </Link>
                ))}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        <div className="flex w-full lg:w-[30%] flex-col gap-5 items-start justify-start">
          <h3 className="text-lg font-bold mb-3 lg:mb-3">Newsletter</h3>
          <div className="relative w-full">
            <LucideMails
              color="black"
              className="absolute left-2 top-1/2 transform -translate-y-1/2"
            />
            <Input
              type="email"
              color="black"
              placeholder="Enter your email address"
              className="pl-14 text-black"
            />
          </div>
          <div className="flex flex-row gap-5 items-start justify-center mt-4">
            <div className="border rounded-full p-2">
              <FaInstagram
                className="transition-all cursor-pointer duration-300 hover:scale-90"
                size={20}
              />
            </div>
            <div className="border rounded-full p-2">
              <RiTwitterXFill
                className="transition-all cursor-pointer duration-300 hover:scale-90"
                size={20}
              />
            </div>
            <div className="border rounded-full p-2">
              <SlSocialLinkedin
                className="transition-all cursor-pointer duration-300 hover:scale-90"
                size={20}
              />
            </div>
            <div className="border rounded-full p-2">
              <FaFacebookF
                className="transition-all cursor-pointer duration-300 hover:scale-90"
                size={20}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="p-5 flex flex-col gap-3 bg-black">
        <p className="text-sm text-center text-gray-100">
          Copyright © 2024 BioEssentia
        </p>
        <p className="text-sm text-white font-bold text-center">
          A Brand of GILON HEALTH CARE CO.
        </p>
        <p className="text-sm text-gray-300 text-center">
          All rights reserved.
        </p>
      </div>
    </>
  );
};

export default Footer;
