import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
// import { ThemeProvider } from "@/components/theme-provider";
import { ClerkProvider } from "@clerk/nextjs";
import { CartProvider } from "@/context/cartContext";
import { Toaster } from "@/components/ui/sonner";
import "./prose-mirror.css";
import Script from "next/script";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "BIO-ESSENTIA : Quality you deserve, Results you can see",
  description:
    "At Bio Essentia, we redefine wellness with top-tier nutraceuticals. Achieve your health goals with our premium supplements.",
  keywords: "Bio Essentia, Essential, Premium Nutraceuticals",
  openGraph: {
    title: "BIO-ESSENTIA : Quality you deserve, Results you can see",
    description:
      "At Bio Essentia, we redefine wellness with top-tier nutraceuticals. Achieve your health goals with our premium supplements.",
    url: "https://www.bioessentia.in/",
    images: [
      {
        url: "https://res.cloudinary.com/dpr4dapgi/image/upload/v1723484830/BEN%20SEO%20IMAGES/nkbvhyosudecoxdxbq1b.png",
        width: 800,
        height: 600,
        alt: "BIO-ESSENTIA",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "BIO-ESSENTIA : Quality you deserve, Results you can see",
    description:
      "At Bio Essentia, we redefine wellness with top-tier nutraceuticals. Achieve your health goals with our premium supplements.",
    images: [
      "https://res.cloudinary.com/dpr4dapgi/image/upload/v1723484830/BEN%20SEO%20IMAGES/nkbvhyosudecoxdxbq1b.png",
    ],
  },
  alternates: {
    canonical: "https://www.bioessentia.in/",
  },
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
            <Script
              strategy="beforeInteractive"
              id="meta"
              dangerouslySetInnerHTML={{
                __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '1713328166191488');
              fbq('track', 'PageView');
            `,
              }}
            />
            <noscript>
              <img
                height="1"
                width="1"
                style={{ display: "none" }}
                src="https://www.facebook.com/tr?id=1713328166191488&ev=PageView&noscript=1"
                alt="meta-image"
              />
            </noscript>

            <Toaster />
          </CartProvider>

          {/* </ThemeProvider> */}
        </ClerkProvider>
      </body>
    </html>
  );
}
