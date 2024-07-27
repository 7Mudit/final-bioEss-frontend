import BannerSection from "@/components/Home/BannerSection";
import BestSellersSection from "@/components/Home/BestSellersSection";
import DummyCategories from "@/components/Home/DummyCategories";
import DummyProductCombos from "@/components/Home/DummyProductCombos";
import VideoSection from "@/components/Home/VideoSection";

export default function Home() {
  return (
    <main className="flex flex-col">
      <BannerSection />
      {/* <CategoriesSection /> */}
      <DummyCategories />
      {/* <BestSellersSection /> */}
      <BestSellersSection />
      <DummyProductCombos />
      <VideoSection />
      {/* <BannerSection /> */}
      {/* <ShopByGoalSection /> */}
      {/* <TrustSection /> */}
      {/* <FreeSection /> */}
    </main>
  );
}
