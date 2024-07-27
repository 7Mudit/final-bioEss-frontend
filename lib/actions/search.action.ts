"use server";
import { connectToDb } from "../mongoose";
import Product from "@/lib/models/product.model";

interface Product {
  _id: string;
  name: string;
}

export default async function handleSearchNavbar(query: string) {
  await connectToDb();

  if (!query) {
    return JSON.stringify({ error: "Query is required" });
  }

  try {
    const results: Product[] = await Product.find({
      storeId: "66585955a3fe976423095792",
      name: { $regex: query, $options: "i" },
    }).select("name");
    return JSON.stringify(results);
  } catch (error) {
    console.error("Error fetching search results:", error);
    return JSON.stringify({ error: "Internal server error" });
  }
}
