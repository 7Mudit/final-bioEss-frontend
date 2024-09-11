"use client";
import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import Product from "@/components/Home/HomePageCards";
import Loading from "../loading";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { debounce } from "lodash";

interface Product {
  _id: string;
  storeId: string;
  categoryId: {
    _id: string;
    name: string;
  };
  name: string;
  sizes: {
    sizeId: {
      _id: string;
      name: string;
      value: string;
    };
    price: number;
    fakePrice: number;
  }[];
  fakePrice: number;
  description: string;
  features: string[];
  suggestedUse: string;
  benefits: string;
  nutritionalUse: string;
  isFeatured: boolean;
  isArchived: boolean;
  flavourId: {
    _id: string;
    name: string;
    value: string;
  }[];
  images: {
    _id: string;
    url: string;
  }[];
  orderItems: string[];
  feedbacks: string[];
  createdAt: Date;
  updatedAt: Date;
}

const Products = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialCategory = searchParams.getAll("category") || [];
  const initialMinPrice = parseInt(searchParams.get("minPrice") || "0", 10);
  const initialMaxPrice = parseInt(searchParams.get("maxPrice") || "2500", 10);

  const [products, setProducts] = useState<Product[]>([]);
  const [filters, setFilters] = useState({
    category: initialCategory,
    priceRange: [initialMinPrice, initialMaxPrice],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get<Product[]>(
          "https://bioessentia.store/api/66585955a3fe976423095792/products"
        );
        setProducts(response.data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleFilterChange = (type: string, value: string) => {
    const updatedFilters = {
      ...filters,
      [type]: (filters[type as keyof typeof filters] as string[]).includes(
        value
      )
        ? (filters[type as keyof typeof filters] as string[]).filter(
            (item) => item !== value
          )
        : [...(filters[type as keyof typeof filters] as string[]), value],
    };

    setFilters(updatedFilters);
    updateUrl(updatedFilters);
  };

  const handlePriceRangeChange = (range: number[]) => {
    const updatedFilters = {
      ...filters,
      priceRange: range,
    };

    setFilters(updatedFilters);
    updateUrl(updatedFilters);
  };

  const updateUrl = debounce((updatedFilters: typeof filters) => {
    const query = new URLSearchParams();

    updatedFilters.category.forEach((cat) => query.append("category", cat));
    query.set("minPrice", updatedFilters.priceRange[0].toString());
    query.set("maxPrice", updatedFilters.priceRange[1].toString());

    router.replace(`?${query.toString()}`, { scroll: false });
  }, 300);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      if (
        filters.category.length > 0 &&
        !filters.category.includes(product.categoryId.name.trim())
      ) {
        return false;
      }
      return (
        product.sizes.some((size) => size.price >= filters.priceRange[0]) &&
        product.sizes.some((size) => size.price <= filters.priceRange[1])
      );
    });
  }, [filters, products]);

  if (loading) return <Loading />;
  if (error) return <p>Error: {error}</p>;
  return (
    <section className="py-12 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="col-span-1 md:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Filters</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  <div>
                    <h3 className="text-base font-medium mb-2">Category</h3>
                    <div className="grid gap-2">
                      <Label className="flex items-center gap-2">
                        <Checkbox
                          checked={filters.category.includes("Amino Acids")}
                          onCheckedChange={() =>
                            handleFilterChange("category", "Amino Acids")
                          }
                        />
                        Amino Acids
                      </Label>
                      <Label className="flex items-center gap-2">
                        <Checkbox
                          checked={filters.category.includes("Pre Workout")}
                          onCheckedChange={() =>
                            handleFilterChange("category", "Pre Workout")
                          }
                        />
                        Pre Workout
                      </Label>
                      <Label className="flex items-center gap-2">
                        <Checkbox
                          checked={filters.category.includes("Protein")}
                          onCheckedChange={() =>
                            handleFilterChange("category", "Protein")
                          }
                        />
                        Protein
                      </Label>
                      <Label className="flex items-center gap-2">
                        <Checkbox
                          checked={filters.category.includes(
                            "Daily Supplements"
                          )}
                          onCheckedChange={() =>
                            handleFilterChange("category", "Daily Supplements")
                          }
                        />
                        Daily Supplements
                      </Label>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-base font-medium mb-2">Price Range</h3>
                    <div>
                      <Slider
                        value={filters.priceRange}
                        onValueChange={handlePriceRangeChange}
                        min={0}
                        max={2500}
                        step={100}
                      />
                    </div>
                    <div className="flex mt-2 justify-between text-sm text-muted-foreground">
                      <span>₹{filters.priceRange[0]}</span>
                      <span>₹{filters.priceRange[1]}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="col-span-1 md:col-span-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {filteredProducts.map((product: Product) => (
                <div key={product._id}>
                  <Product
                    key={product._id}
                    id={product._id}
                    img={product.images[0]?.url}
                    category={product.categoryId.name}
                    name={product.name}
                    desc={product.description}
                    prize={product.sizes[0].price}
                    prizeStrike={product.sizes[0].fakePrice}
                    discountPrize={
                      product.sizes[0].fakePrice - product.sizes[0].price
                    }
                    rating={4.5}
                    hot={product.isFeatured}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Products;
