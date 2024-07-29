import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Bio Essentia | About Us",
  description: "Bio Essentia shopping app",
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
