import React from "react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import Image from "next/image";

const productCombos = [
  {
    name: "Muscle Building Combo",
    description: "Whey Protein, Creatine, and BCAA supplements.",
    price: "$99.99",
    img: "/combos/creatine.png",
  },
  {
    name: "Weight Loss Combo",
    description: "Fat Burner, Protein Powder, and Multivitamin.",
    price: "$89.99",
    img: "/combos/creatine.png",
  },
  {
    name: "Energy & Focus Combo",
    description: "Pre-Workout, Caffeine Tablets, and B-Complex.",
    price: "$79.99",
    img: "/combos/creatine.png",
  },
  {
    name: "Recovery Combo",
    description: "Protein Powder, BCAA, and Glutamine supplements.",
    price: "$94.99",
    img: "/combos/creatine.png",
  },
];

const DummyProductCombos = () => {
  return (
    <section className="w-full py-10 md:py-24 lg:py-32">
      <div className="container grid gap-8 px-4 md:px-6">
        {/* Section Header */}
        <div className="text-center">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Product Combos
          </h2>
          <p className="mt-2 text-muted-foreground">
            Get the most value with our curated supplement bundles.
          </p>
        </div>

        {/* Combo Cards */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {productCombos.map((combo, index) => (
            <Card key={index}>
              <Image
                src={combo.img}
                alt={combo.name}
                width={250}
                height={250}
                className="w-full  aspect-square object-cover rounded-t-lg"
              />
              <CardContent className="p-4">
                <h3 className="text-lg font-bold">{combo.name}</h3>
                <p className="text-muted-foreground">{combo.description}</p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-lg font-bold">{combo.price}</span>
                  <Button size="sm">Add to Cart</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DummyProductCombos;
