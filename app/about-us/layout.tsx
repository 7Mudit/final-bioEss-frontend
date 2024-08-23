import type { Metadata } from "next";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";

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
};

export default function ReturnLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
