import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Bio Essentia",
  description: "Bio Essentia shopping app",
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
