"use server";

import { connectToDb } from "../mongoose";
import Coupon from "@/lib/models/coupon.model";

export async function validateCoupon(code: string) {
  try {
    await connectToDb();
    const coupon = await Coupon.findOne({ code, isActive: true });

    if (!coupon) {
      return JSON.stringify({ valid: false });
    }

    const currentDate = new Date();
    if (currentDate > coupon.expiryDate) {
      return JSON.stringify({ valid: false });
    }

    return JSON.stringify({
      valid: true,
      discountPercentage: coupon.discountPercentage,
      couponId: coupon._id,
    });
  } catch (err) {
    console.error("Failed to validate coupon:", err);
    throw new Error("Failed to validate coupon");
  }
}
