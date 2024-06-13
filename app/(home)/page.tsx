import BannerSection from "@/components/Home/BannerSection";
import BestSellersSection from "@/components/Home/BestSellersSection";
import CategoriesSection from "@/components/Home/CategoriesSection";
import FreeSection from "@/components/Home/FreeSection";
import ShopByGoalSection from "@/components/Home/ShopByGoalSection";
import TrustSection from "@/components/Home/TrustSection";

export default function Home() {
  return (
    <main className="flex flex-col">
      <BannerSection />
      {/* <CategoriesSection /> */}
      <BestSellersSection />
      <BannerSection />
      <ShopByGoalSection />
      <TrustSection />
      <FreeSection />
    </main>
  );
}
