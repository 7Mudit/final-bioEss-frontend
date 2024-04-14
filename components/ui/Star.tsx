import React from "react";
import { MdOutlineStarHalf } from "react-icons/md";
import { MdOutlineStarOutline } from "react-icons/md";
import { MdOutlineStarPurple500 } from "react-icons/md";

const Star = ({ stars, size, color }: any) => {
  const ratingStar = Array.from({ length: 5 }, (elem, index) => {
    let number = index + 0.5;

    return (
      <span className={`${color}  text-[${size}px]`} key={index}>
        {stars >= index + 1 ? (
          <MdOutlineStarPurple500 />
        ) : stars >= number ? (
          <MdOutlineStarHalf />
        ) : (
          <MdOutlineStarOutline />
        )}
      </span>
    );
  });

  return <div className="flex gap-1">{ratingStar}</div>;
};

export default Star;
