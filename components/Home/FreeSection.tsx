import Image from "next/image";
import React from "react";

const TrustSection = () => {
  return (
    <div className="">
      <Image
        src="/trust/free.webp"
        width={1000}
        height={1000}
        className="w-full hidden md:block h-full object-cover"
        alt="trust image"
      />
      <Image
        src="/trust/free-mobile.webp"
        width={1000}
        height={1000}
        className="w-full block md:hidden h-full object-cover"
        alt="trust image"
      />
    </div>
  );
};

export default TrustSection;
