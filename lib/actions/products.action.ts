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

export async function fetchProductById(id: string) {
  try {
    await connectToDb();

    const product = await Product.findById(id).populate("feedbacks").exec();

    if (!product) {
      throw new Error("Product not found");
    }

    const productJson = product.toObject();

    return productJson;
  } catch (error) {
    console.error("Error fetching product by ID:", error);
    throw new Error("Failed to fetch product");
  }
}

export async function fetchProductBySlug(slug: string) {
  try {
    await connectToDb();

    const product = await Product.findOne({ slug })
      .populate("images")
      .populate("sizes.sizeId")
      .populate("flavourId")
      .populate("categoryId")
      .populate("feedbacks")
      .exec();

    if (!product) {
      throw new Error("Product not found");
    }

    console.log(product);
    const productObj = product.toObject();

    return JSON.stringify(productObj);
  } catch (error) {
    console.error("Error fetching product by slug:", error);
    throw new Error("Failed to fetch product");
  }
}
