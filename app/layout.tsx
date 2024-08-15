import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
// import { ThemeProvider } from "@/components/theme-provider";
import { ClerkProvider } from "@clerk/nextjs";
import { CartProvider } from "@/context/cartContext";
import { Toaster } from "@/components/ui/sonner";
import "./prose-mirror.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Bio Essentia",
  description: "Bio Essentia shopping app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <ClerkProvider
          appearance={{
            elements: {
              formButtonPrimary:
                "px-6 py-2 bg-black  text-white rounded-md shadow-sm hover:bg-blue-500 hover:text-white transition-colors duration-300",
            },
            variables: { colorPrimary: "black" },
          }}
        >
          {/* <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        > */}
          <CartProvider>
            {children}
            <Toaster />
          </CartProvider>

          {/* </ThemeProvider> */}
        </ClerkProvider>
      </body>
    </html>
  );
}
