import React from "react";
import { Metadata } from "next";

// Define metadata for the About Us page
export const metadata: Metadata = {
  title: "About Us | BIOESSENTIA - Leaders in Quality Health Supplements",
  description:
    "Learn about BIOESSENTIA, a brand of GILON HEALTHCARE CO., with over 22 years of experience in providing the highest quality health supplements.",
  keywords:
    "BIOESSENTIA, GILON Healthcare, Health Supplements, Quality, Purity",
  openGraph: {
    title: "About Us | BIOESSENTIA - Leaders in Quality Health Supplements",
    description:
      "Learn about BIOESSENTIA, a brand of GILON HEALTHCARE CO., with over 22 years of experience in providing the highest quality health supplements.",
    url: "https://www.bioessentia.in/about-us",
    images: [
      {
        url: "https://res.cloudinary.com/dpr4dapgi/image/upload/v1723484830/BEN%20SEO%20IMAGES/nkbvhyosudecoxdxbq1b.png",
        width: 800,
        height: 600,
        alt: "BIOESSENTIA",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Us | BIOESSENTIA - Leaders in Quality Health Supplements",
    description:
      "Learn about BIOESSENTIA, a brand of GILON HEALTHCARE CO., with over 22 years of experience in providing the highest quality health supplements.",
    images: [
      "https://res.cloudinary.com/dpr4dapgi/image/upload/v1723484830/BEN%20SEO%20IMAGES/nkbvhyosudecoxdxbq1b.png",
    ],
  },
  alternates: {
    canonical: "https://www.bioessentia.in/about-us",
  },
  robots: "index follow",
};

const AboutUs: React.FC = () => {
  return (
    <div className="bg-gray-50 p-6 rounded-lg max-w-4xl mx-auto my-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        About Us
      </h1>

      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        BIOESSENTIA - A Brand of GILON HEALTH CARE CO.
      </h2>
      <p className="text-gray-700 mb-6">
        GILON HEALTHCARE Co. was established in the year 2002 and has been in
        the supplementation industry for over 22 years. We pride ourselves on
        being leaders in delivering the highest quality and purest health
        supplements available.
      </p>

      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Our Commitment to Quality and Purity
      </h2>
      <p className="text-gray-700 mb-6">
        At GILON Healthcare Co., quality is at the core of everything we do. We
        rigorously test our products to ensure they meet the highest industry
        standards for safety, potency, and purity. Our unwavering commitment to
        these principles has earned us a reputation for excellence and
        reliability among our customers and peers alike.
      </p>

      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Industry Leaders
      </h2>
      <p className="text-gray-700 mb-6">
        For more than two decades, GILON Healthcare Co. has been at the
        forefront of the supplementation industry. Our innovative approach,
        combined with our deep understanding of health and wellness, allows us
        to continually develop and provide products that support and enhance the
        well-being of our customers. We are proud to lead the industry with our
        advanced formulations and effective solutions.
      </p>

      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Fast Deliveries
      </h2>
      <p className="text-gray-700 mb-6">
        We understand the importance of timely delivery, especially when it
        comes to your health. GILON Healthcare Co. is dedicated to ensuring that
        our products reach you as quickly as possible. Our efficient logistics
        and responsive customer service teams work tirelessly to ensure that
        your orders are processed and delivered promptly, so you can start
        benefiting from our supplements without delay.
      </p>

      <p className="text-gray-700 text-lg font-semibold mt-6">
        Choose GILON Healthcare Co. for your supplementation needs and
        experience the difference that 22 years of expertise, quality, and
        commitment can make. Your health is our priority, and we are here to
        support you every step of the way.
      </p>
    </div>
  );
};

export default AboutUs;
