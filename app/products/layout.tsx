import type { Metadata } from "next";

import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { Libre_Franklin } from "next/font/google";
import { Cormorant_Garamond } from "next/font/google";

const libre_franklin = Libre_Franklin({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-libre_franklin",
});
const cormorant_garamond = Cormorant_Garamond({
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant_garamond",
});

export const metadata: Metadata = {
  title: "ESSENTIALS : Wide Range of Products for all your needs",
  description:
    "Discover Bio Essentia's diverse range of high-quality nutraceuticals, specially crafted to meet your unique health and fitness needs. From premium protein supplements to advanced pre-workouts and vitamins, our products are designed with precision and purity to help you achieve your wellness goals. Experience the difference with Bio Essentia’s expertly formulated solutions, tailored just for you.",
  keywords:
    "Protein, Fitness, Supplements, Amino Acids, Pre Workout, Daily Supplements",
  openGraph: {
    title: "ESSENTIALS : Wide Range of Products for all your needs",
    description:
      "Discover Bio Essentia's diverse range of high-quality nutraceuticals, specially crafted to meet your unique health and fitness needs. From premium protein supplements to advanced pre-workouts and vitamins, our products are designed with precision and purity to help you achieve your wellness goals. Experience the difference with Bio Essentia’s expertly formulated solutions, tailored just for you.",
    url: "https://www.bioessentia.com/products",
    images: [
      {
        url: "https://res.cloudinary.com/dpr4dapgi/image/upload/v1723484830/BEN%20SEO%20IMAGES/nkbvhyosudecoxdxbq1b.png",
        width: 800,
        height: 600,
        alt: "Protein Powder",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ESSENTIALS : Wide Range of Products for all your needs",
    description:
      "Discover Bio Essentia's diverse range of high-quality nutraceuticals, specially crafted to meet your unique health and fitness needs. From premium protein supplements to advanced pre-workouts and vitamins, our products are designed with precision and purity to help you achieve your wellness goals. Experience the difference with Bio Essentia’s expertly formulated solutions, tailored just for you.",
    images: [
      {
        url: "https://res.cloudinary.com/dpr4dapgi/image/upload/v1723484830/BEN%20SEO%20IMAGES/nkbvhyosudecoxdxbq1b.png",
        alt: "Protein Powder",
      },
    ],
  },
};

export default function ProductsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      className={`{libre_franklin.variable + ' ' + cormorant_garamond.variable}`}
    >
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
