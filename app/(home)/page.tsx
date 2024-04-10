import BannerSection from "@/components/Home/BannerSection";
import CategoriesSection from "@/components/Home/CategoriesSection";

export default function Home() {
  return (
    <main className="flex flex-col">
      <BannerSection />
      <CategoriesSection />
    </main>
  );
}
