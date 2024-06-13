"use server";
import { connectToDb } from "../mongoose";
import Product from "@/lib/models/product.model";

export async function fetchAllProducts() {
  try {
    await connectToDb();
    // https://bioessentia.store/api/66585955a3fe976423095792/products
    const products = await Product.find({ storeId: "66585955a3fe976423095792" })
      .populate("images") // Populating images field
      .exec();

    return JSON.stringify(products);
  } catch (err) {
    console.error("Failed to fetch products:", err);
    throw new Error("Failed to fetch products");
  }
}
