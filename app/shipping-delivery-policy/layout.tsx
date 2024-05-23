import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Bio Essentia | Shiping and delivery policy",
  description: "Bio Essentia shopping app",
};

export default function ReturnLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="max-w-[1440px] mx-auto">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
