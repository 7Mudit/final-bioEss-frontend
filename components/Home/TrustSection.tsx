import Image from "next/image";
import React from "react";

const TrustSection = () => {
  return (
    <div className="">
      <Image
        src="/trust/trust.webp"
        width={1000}
        height={1000}
        className="w-full h-full hidden md:block object-cover"
        alt="trust image"
      />
      <Image
        src="/trust/mobile-trust.webp"
        width={1000}
        height={1000}
        className="w-full block md:hidden h-full object-cover"
        alt="trust image"
      />
    </div>
  );
};

export default TrustSection;
