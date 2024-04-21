"use client";
import React, { useEffect, useState } from "react";
import { popularProducts } from "@/constants/index";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/scrollbar";
import "swiper/css/free-mode";
import Image from "@/node_modules/next/image";
import { gsap } from "gsap";

import { FreeMode, EffectFade } from "swiper/modules";
import Star from "@/components/ui/Star";
import { GoPlus } from "react-icons/go";
import { AiOutlineMinus } from "react-icons/ai";

interface Review {
  name: string;
  email: string;
  title: string;
  body: string;
  rating: number;
  date: string;
}
interface URLProps {
  params: { id: string };
}

const Page = ({ params }: URLProps) => {
  const swiperRef = React.useRef<any>(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const [quantity, setQuantity] = useState(0);
  const [descriptionBox, setOpenDescriptionBox] = useState(true);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedflavour, setSelectedFlavour] = useState("");
  const [openReviewForm, setOpenReviewForm] = useState(false);
  const [reviews, setReviews] = useState<Review[]>([]);

  const filteredProduct = popularProducts.find(
    (product) => product.id === parseInt(params.id)
  );

  const handleAddToCart = () => {
    const finalData = {
      selectedSize: selectedSize,
      selctedFlavour: selectedflavour,
      quantity: quantity,
    };

    console.log(finalData);
  };

  const handlingOfReviewForm = () => {
    setOpenReviewForm(!openReviewForm);
  };

  const decrementQuantity = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

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

  const prevButtonStyle = isBeginning
    ? "opacity-50 cursor-not-allowed"
    : "opacity-100";
  const nextButtonStyle = isEnd
    ? "opacity-50 cursor-not-allowed"
    : "opacity-100";

  const openDescriptionBox = () => {
    setOpenDescriptionBox(!descriptionBox);
  };

  const handleReviewSubmission = () => {
    const nameInput = document.getElementById(
      "review-name"
    ) as HTMLInputElement;
    const emailInput = document.getElementById(
      "review-email"
    ) as HTMLInputElement;
    const titleInput = document.getElementById(
      "review-title"
    ) as HTMLInputElement;
    const bodyInput = document.getElementById(
      "review-body"
    ) as HTMLTextAreaElement;

    if (nameInput && emailInput && titleInput && bodyInput) {
      const reviewData = {
        name: nameInput.value,
        email: emailInput.value,
        title: titleInput.value,
        body: bodyInput.value,
        rating: 5,
        date: new Date().toLocaleDateString(),
      };

      setReviews([...reviews, reviewData]);
      console.log("New Review:", reviewData);
    }
  };
  if (!filteredProduct) {
    return <div>Product not found</div>; // Handle undefined `filteredProduct`
  }
  const increaseQuantity = () => {
    if (quantity < filteredProduct.available) {
      setQuantity(quantity + 1);
    }
  };
  const handleSizeSelection = (size: string) => {
    if (selectedSize === size) {
      setSelectedSize(""); // Deselect if already selected
    } else {
      setSelectedSize(size); // Select new size
    }
  };

  const handleFlavourSelection = (flavour: string) => {
    if (selectedflavour === flavour) {
      setSelectedFlavour(""); // Deselect if already selected
    } else {
      setSelectedFlavour(flavour); // Select new flavour
    }
  };

  return (
    <div>
      <div className="uppercontainer py-10   flex md:flex-row flex-col">
        <div className="display-container  flex flex-col gap-10  overflow-y-scroll max-h-[1200px]   w-full md:w-9/12 p-2 sm:p-4">
          <div className="flex w-full justify-center border-b-2 border-600  items-center">
            <button
              onClick={() => !isBeginning && swiperRef.current?.slidePrev()}
              className={`${prevButtonStyle} md:block hidden group w-12 h-12 rounded-full border border-slate-600 text-slate-400}`}
              disabled={isBeginning}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-12 h-12 rounded-full group-hover:-translate-x-3 duration-500 transition-all  text-slate-500"
              >
                <path d="m15 18-6-6 6-6" />
              </svg>
            </button>
            <Swiper
              spaceBetween={0}
              effect={"fade"}
              onSlideChange={handleSlideChange}
              onSwiper={(swiper) => (swiperRef.current = swiper)}
              modules={[EffectFade, FreeMode]}
              className="mySwiper w-8/12 "
            >
              {filteredProduct.productimages.map((productimage, index) => (
                <SwiperSlide key={index}>
                  <Image src={productimage} alt={"product images"} />
                </SwiperSlide>
              ))}
            </Swiper>

            <button
              onClick={() => !isEnd && swiperRef.current?.slideNext()}
              className={`${nextButtonStyle} md:block group  hidden w-12 h-12 rounded-full border border-slate-600 text-slate-400}`}
              disabled={isEnd}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-12 h-12 rounded-full group-hover:translate-x-3 duration-500 transition-all  text-slate-500"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            </button>
          </div>
          <div className="w-full hidden md:flex  flex-col px-4">
            <div className="w-full h-10 bg-red-700 flex justify-between px-5 text-white items-center text-xl ">
              <p className="">Description</p>
              {descriptionBox ? (
                <AiOutlineMinus
                  onClick={openDescriptionBox}
                  className="hover:cursor-pointer"
                />
              ) : (
                <GoPlus
                  onClick={openDescriptionBox}
                  className="hover:cursor-pointer"
                />
              )}
            </div>
            <div
              className={descriptionBox ? "product-descriptions " : "hidden"}
            >
              <div className="flex flex-col w-full shadow-2xl px-3 border gap-6">
                {filteredProduct.productimages.map((image, index) => (
                  <Image
                    key={index}
                    alt="product images"
                    src={image}
                    className="w-full "
                  />
                ))}
              </div>

              <div className="flex flex-col gap-10">
                {filteredProduct.description.map((description, index) => (
                  <div key={index} className="flex flex-col gap-5">
                    <h1 className="text-2xl sm:text-3xl font-bold ">
                      {description.heading}
                    </h1>
                    <p>{description.content}</p>
                  </div>
                ))}
              </div>

              <div className="flex flex-col gap-10 py-10">
                {filteredProduct.faqs.map((faq, index) => (
                  <div key={index} className="flex flex-col gap-5">
                    <h1 className="text-lg sm:text-xl font-bold ">
                      Q{index + 1}. {faq.question}
                    </h1>
                    <div className="w-full flex gap-2">
                      <p className="font-bold">Ans.</p>
                      <p>{faq.answer}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="info-container border-b border-l border-slate-500 w-full md:w-6/12 p-4 flex items-start flex-col gap-10">
          <div className="w-full flex flex-col gap-1  justify-start">
            <p className="text-3xl sm:text-4xl">{filteredProduct.name}</p>
            <div className="flex gap-3 w-full items-center justify-start">
              <Star
                color={"text-yellow-500"}
                size={32}
                stars={filteredProduct.rating}
              />
              <p className="text-slate-500">
                {filteredProduct.customer_reviews} reviews{" "}
              </p>
            </div>

            <div className="rating-and-reviews"></div>
            <p className="font-bold  text-4xl">{filteredProduct.prizeStrike}</p>
            <p>shipping calculated at checkout</p>
          </div>
          {filteredProduct.sizes.length !== 0 && (
            <div className="flex flex-col gap-5">
              <p>SELECT SIZE</p>
              <div className="flex flex-wrap gap-4">
                {filteredProduct.sizes.map((size, index) => (
                  <label key={index} className="inline-flex items-center">
                    <input
                      type="radio"
                      name="size"
                      value={size}
                      className="hidden"
                      checked={selectedSize === size} // Add checked attribute
                      onChange={() => handleSizeSelection(size)}
                    />
                    <div
                      className={`border border-black px-4 py-2 rounded-lg cursor-pointer dark:border-white ${
                        selectedSize === size ? "bg-red-600 text-white" : ""
                      }`}
                    >
                      {size}
                    </div>
                  </label>
                ))}
              </div>
              {filteredProduct.flavures.length !== 0 && (
                <div className="flex flex-col gap-5">
                  <p>SELECT FLAVOUR</p>
                  <div className="flex gap-4 flex-wrap">
                    {filteredProduct.flavures.map((flavour, index) => (
                      <label key={index} className="inline-flex items-center">
                        <input
                          type="radio"
                          name="flavour"
                          value={flavour}
                          className="hidden"
                          onChange={(e) => setSelectedFlavour(e.target.value)} // Set selected flavour to state
                        />
                        <div
                          className={`border hover:bg-red-600 hover:text-white border-black dark:border-white px-4 py-2 rounded-lg cursor-pointer ${
                            selectedflavour === flavour
                              ? "bg-red-600 text-white"
                              : ""
                          }`}
                        >
                          {flavour}
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="flex flex-col gap-5">
            <p>SELECT QUANTITY</p>
            <div className="flex w-full gap-6 justify-center items-center border border-black p-4 rounded-lg">
              <div
                onClick={decrementQuantity}
                className={
                  quantity != 0
                    ? "w-10 h-10 text-white bg-red-600 hover:cursor-pointer flex justify-center  items-center rounded-full border"
                    : "w-10 h-10 text-white bg-red-300  flex justify-center  items-center rounded-full border"
                }
              >
                -
              </div>
              <div className="w-8 flex justify-center items-center">
                {quantity}
              </div>

              <div
                onClick={increaseQuantity}
                className={
                  quantity < filteredProduct.available
                    ? "w-10 h-10 text-white bg-red-600 hover:cursor-pointer flex justify-center  items-center rounded-full border"
                    : "w-10 h-10 text-white bg-red-300  flex justify-center  items-center rounded-full border"
                }
              >
                +
              </div>
            </div>
          </div>
          <div className="px-10 flex flex-col gap-6 w-full items-center ">
            <div
              onClick={handleAddToCart}
              className="bg-red-600 hover:scale-95 dark:hover:bg-white dark:hover:text-black hover:bg-black duration-500 transition-all w-full lg:w-8/12 hover:cursor-pointer p-4 lg:p-6 text-center border-red-600 text-white sm:text-xl rounded-full"
            >
              ADD TO CART
            </div>

            <div
              onClick={handleAddToCart}
              className="bg-red-600 w-full hover:scale-95 dark:hover:bg-white dark:hover:text-black hover:bg-black duration-500 transition-all lg:w-8/12 hover:cursor-pointer p-4 lg:p-6 text-center border-red-600 text-white sm:text-xl rounded-full"
            >
              BUY NOW
            </div>
          </div>

          <div className="freebies flex flex-col gap-5 items-start">
            <p className="">GET EXCITING FREEBIES</p>
            <div className="flex gap-5 flex-wrap">
              {filteredProduct.frebies.map((free, index) => (
                <div
                  key={index}
                  className="rounded-lg w-7/12 sm:w-6/12 lg:w-5/12 flex flex-col gap-2 shadow-lg items-start justify-center p-2"
                >
                  <p className="text-sm md:text-md">
                    {free.pricerange.length > 1
                      ? `₹ ${free.pricerange[0]} - ₹ ${free.pricerange[1]}`
                      : `₹ ${free.pricerange[0]} Above`}
                  </p>
                  <div className="w-full flex justify-start gap-3 items-center">
                    <Image
                      src={free.image}
                      alt="free image"
                      className="w-2/12"
                    />
                    <p className="text-red-500 text-sm md:text-md">
                      {free.title}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="w-full flex md:hidden py-10 flex-col px-4">
          <div className="w-full h-10 bg-red-700 flex justify-between px-5 text-white items-center text-xl ">
            <p className="leading-[24px] text-white text-[24px]">Description</p>
            {descriptionBox ? (
              <AiOutlineMinus
                onClick={openDescriptionBox}
                className="hover:cursor-pointer"
              />
            ) : (
              <GoPlus
                onClick={openDescriptionBox}
                className="hover:cursor-pointer"
              />
            )}
          </div>
          <div className={descriptionBox ? "product-descriptions " : "hidden"}>
            <div className="flex flex-col w-full shadow-2xl px-3 border gap-6">
              {filteredProduct.productimages.map((image, index) => (
                <Image
                  key={index}
                  alt="product images"
                  src={image}
                  className="w-full "
                />
              ))}
            </div>

            <div className="flex flex-col gap-10">
              {filteredProduct.description.map((description, index) => (
                <div key={index} className="flex flex-col gap-5">
                  <h1 className="text-2xl sm:text-3xl font-bold ">
                    {description.heading}
                  </h1>
                  <p>{description.content}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* customer reviews */}
      <div className="customer-ratings px-3 py-10   ">
        <div className="w-full flex flex-col gap-5  p-4">
          <p className="text-xl font-bold">Customer Reviews</p>
          <div className="flex justify-between items-center ">
            <div className="flex flex-col md:flex-row gap-3  items-start md:items-center ">
              <Star color={"black"} size={24} stars={filteredProduct.rating} />
              <p className="text-[2.5vw] text-slate-400 md:text-[1vw]">
                based on {filteredProduct.customer_reviews} reviews
              </p>
            </div>
            <p
              onClick={handlingOfReviewForm}
              className="text-[2.5vw] hover:cursor-pointer md:text-[1vw]"
            >
              Write a review
            </p>
          </div>

          <div className="w-full rounded-full sm:my-3 bg-slate-600 h-[0.75px]"></div>

          <div
            className={
              openReviewForm
                ? "review-form w-full flex flex-col gap-6"
                : "hidden"
            }
          >
            <div className="w-full flex flex-col gap-5 ">
              <p className="text-sm md:text-xl]">NAME</p>
              <input
                id="review-name"
                type="text"
                placeholder="Enter your name"
                className="w-full p-4 outline-black outline-2 border-slate-400 focus:outline"
              />
            </div>

            <div className="w-full flex flex-col gap-5 ">
              <p className="text-sm md:text-xl]">EMAIL</p>
              <input
                id="review-email"
                type="email"
                placeholder="john.smith@example.com"
                className="w-full p-4 outline-black outline-2 border-slate-400 focus:outline"
              />
            </div>

            <div className="w-full flex flex-col gap-5 ">
              <p className="text-sm md:text-xl]">REVIEW TITLE</p>
              <input
                id="review-title"
                type="text"
                placeholder="Give your review a title"
                className="w-full p-4  border outline-black outline-2 border-slate-400 focus:outline"
              />
            </div>

            <div className="w-full flex flex-col gap-5 ">
              <p className="text-sm md:text-xl]">BODY OF REVIEW (1500)</p>
              <textarea
                id="review-body"
                placeholder="Write your comments here"
                className="w-full p-4 outline-none outline-1 border bg-[#fff8f4] rounded-lg border-slate-400"
              />
            </div>

            <div className="w-full py-5 flex justify-center sm:justify-end ">
              <span
                onClick={handleReviewSubmission}
                className="bg-red-500 hover:text-red-500 hover:cursor-pointer transition-colors duration-200 p-5 text-white rounded-full"
              >
                submit Review
              </span>
            </div>
          </div>

          <div className="reviews   ">
            {filteredProduct.customer_rating.map((review, index) => (
              <div key={index} className="w-full flex flex-col gap-5 py-5">
                <div className="flex w-full justify-between items-center">
                  <Star size={24} color={"black"} stars={review.rating} />
                  <p className="text-[1.7vw] md:text-[1.2vw]">
                    {review.name} on {review.date}
                  </p>
                </div>
                <div className="flex flex-col text-[1.7vw] md:text-[1.5vw] w-full">
                  <p className="text-[1.5vw] font-bold">{review.heading}</p>
                  <p>{review.review}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
