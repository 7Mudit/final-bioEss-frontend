"use server";
import Category from "@/lib/models/category.model";
import { connectToDb } from "../mongoose";

export async function getCategories() {
  try {
    await connectToDb();

    const categories = await Category.find({
      storeId: "66585955a3fe976423095792",
    });

    return categories;
  } catch (error) {
    console.error("[CATEGORY_GET]", error);
  }
}
