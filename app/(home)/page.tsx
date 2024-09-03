import BannerSection from "@/components/Home/BannerSection";
import BestSellersSection from "@/components/Home/BestSellersSection";
import DummyCategories from "@/components/Home/DummyCategories";
import DummyComponent from "@/components/Home/DummyComponent";
import VideoSection from "@/components/Home/VideoSection";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "BIO-ESSENTIA : Quality you deserve, Results you can see",
  description:
    "At Bio Essentia, we redefine wellness with top-tier nutraceuticals. Achieve your health goals with our premium supplements.",
  keywords: "Bio Essentia, Essential, Premium Nutraceuticals",
  openGraph: {
    title: "BIO-ESSENTIA : Quality you deserve, Results you can see",
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
    title: "BIO-ESSENTIA : Quality you deserve, Results you can see",
    description:
      "At Bio Essentia, we redefine wellness with top-tier nutraceuticals. Achieve your health goals with our premium supplements.",
    images: [
      "https://res.cloudinary.com/dpr4dapgi/image/upload/v1723484830/BEN%20SEO%20IMAGES/nkbvhyosudecoxdxbq1b.png",
    ],
  },
  alternates: {
    canonical: "https://www.bioessentia.in/",
  },
  robots: "index follow",
};

export default function Home() {
  return (
    <main className="flex flex-col">
      <BannerSection />
      {/* <CategoriesSection /> */}
      <DummyComponent />
      <DummyCategories />
      {/* <BestSellersSection /> */}
      <BestSellersSection />
      <VideoSection />
      {/* <BannerSection /> */}
      {/* <ShopByGoalSection /> */}
      {/* <TrustSection /> */}
      {/* <FreeSection /> */}
    </main>
  );
}
