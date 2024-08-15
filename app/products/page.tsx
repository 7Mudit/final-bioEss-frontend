import { Button } from "@/components/ui/button";
import Image from "next/image";
import Products from "./_components/Products";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ESSENTIALS : Wide Range of Products for all your needs",
  description:
    "Discover Bio Essentia's diverse range of high-quality nutraceuticals, specially crafted to meet your unique health and fitness needs. From premium protein supplements to advanced pre-workouts and vitamins, our products are designed with precision and purity to help you achieve your wellness goals. Experience the difference with Bio Essentia’s expertly formulated solutions, tailored just for you.",
  keywords:
    "Protein, Fitness, Supplements, Amino Acids, Pre Workout, Daily Supplements",
  openGraph: {
    title: "ESSENTIALS : Wide Range of Products for all your needs",
    description:
      "Discover Bio Essentia's diverse range of high-quality nutraceuticals, specially crafted to meet your unique health and fitness needs. From premium protein supplements to advanced pre-workouts and vitamins, our products are designed with precision and purity to help you achieve your wellness goals. Experience the difference with Bio Essentia’s expertly formulated solutions, tailored just for you.",
    url: "https://www.bioessentia.com/products",
    images: [
      {
        url: "https://res.cloudinary.com/dpr4dapgi/image/upload/v1723484830/BEN%20SEO%20IMAGES/nkbvhyosudecoxdxbq1b.png",
        width: 800,
        height: 600,
        alt: "Protein Powder",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ESSENTIALS : Wide Range of Products for all your needs",
    description:
      "Discover Bio Essentia's diverse range of high-quality nutraceuticals, specially crafted to meet your unique health and fitness needs. From premium protein supplements to advanced pre-workouts and vitamins, our products are designed with precision and purity to help you achieve your wellness goals. Experience the difference with Bio Essentia’s expertly formulated solutions, tailored just for you.",
    images: [
      {
        url: "https://res.cloudinary.com/dpr4dapgi/image/upload/v1723484830/BEN%20SEO%20IMAGES/nkbvhyosudecoxdxbq1b.png",
        alt: "Protein Powder",
      },
    ],
  },
};

export default function Page() {
  return (
    <div className="bg-background">
      <section className="bg-muted py-12 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Fuel Your Fitness with Premium Protein
              </h1>
              <p className="text-muted-foreground mb-6">
                Discover our wide range of high-quality protein powders to
                support your fitness goals.
              </p>
              <Button size="lg">Shop Now</Button>
            </div>
            <div>
              <Image
                src="/dummyComponent/hypermax.png"
                alt="Protein Powder"
                width={600}
                height={600}
                className="rounded-lg"
                style={{ aspectRatio: "600/600", objectFit: "cover" }}
              />
            </div>
          </div>
        </div>
      </section>
      <Products />
    </div>
  );
}
