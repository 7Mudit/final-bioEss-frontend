import BannerSection from "@/components/Home/BannerSection";
import BestSellersSection from "@/components/Home/BestSellersSection";
import DummyCategories from "@/components/Home/DummyCategories";
import DummyComponent from "@/components/Home/DummyComponent";
import VideoSection from "@/components/Home/VideoSection";

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
