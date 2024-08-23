import type { Metadata } from "next";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";

export const metadata: Metadata = {
  title: "Become A PARTNER : Get a Franchise",
  description:
    "At Bio Essentia, we redefine wellness with top-tier nutraceuticals. Achieve your health goals with our premium supplements.",
  keywords:
    "Nutraceutical Distributors,Bio Essentia Partnership,Distributor Opportunities",
  openGraph: {
    title: "Become A PARTNER : Get a Franchise",
    description:
      "At Bio Essentia, we redefine wellness with top-tier nutraceuticals. Achieve your health goals with our premium supplements.",
    url: "https://www.bioessentia.in/",
    images: [
      {
        url: "https://res.cloudinary.com/dpr4dapgi/image/upload/v1723484830/BEN%20SEO%20IMAGES/nkbvhyosudecoxdxbq1b.png",
        width: 800,
        height: 600,
        alt: "BIO-ESSENTIA",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Become A PARTNER : Get a Franchise",
    description:
      "At Bio Essentia, we redefine wellness with top-tier nutraceuticals. Achieve your health goals with our premium supplements.",
    images: [
      "https://res.cloudinary.com/dpr4dapgi/image/upload/v1723484830/BEN%20SEO%20IMAGES/nkbvhyosudecoxdxbq1b.png",
    ],
  },
  alternates: {
    canonical: "https://www.bioessentia.in/",
  },
};

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="mx-auto">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
