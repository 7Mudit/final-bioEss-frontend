import BannerSection from "@/components/Home/BannerSection";
import CategoriesSection from "@/components/Home/CategoriesSection";
import ShopByGoalSection from "@/components/Home/ShopByGoalSection";

export default function Home() {
  return (
    <main className="flex flex-col">
      <BannerSection />
      <CategoriesSection />
      <BannerSection />
      <ShopByGoalSection />
    </main>
  );
}
