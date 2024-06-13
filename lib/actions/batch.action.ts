"use server";
import { connectToDb } from "../mongoose";
import Batch from "@/lib/models/batch.model";

export async function validateBatch(batchId: string) {
  try {
    await connectToDb();
    const batch = await Batch.findOne({ batchId });
    return batch ? true : false;
  } catch (err) {
    console.error("Failed to validate batch:", err);
    throw new Error("Failed to validate batch");
  }
}
