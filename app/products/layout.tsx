import type { Metadata } from "next";

import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { Libre_Franklin } from "next/font/google";
import { Cormorant_Garamond } from "next/font/google";

const libre_franklin = Libre_Franklin({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-libre_franklin",
});
const cormorant_garamond = Cormorant_Garamond({
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant_garamond",
});

export const metadata: Metadata = {
  title: "Bio Essentia",
  description: "Bio Essentia shopping app",
};

export default function ProductsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      className={`{libre_franklin.variable + ' ' + cormorant_garamond.variable}`}
    >
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
