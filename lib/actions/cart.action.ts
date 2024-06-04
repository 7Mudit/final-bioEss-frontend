"use server";

import User from "@/lib/models/user.model";
import { connectToDb } from "../mongoose";
import { revalidatePath } from "next/cache";

// Fetch cart items for a user
export async function fetchCart(userId: string) {
  try {
    await connectToDb();
    const user = await User.findById(userId).populate("cart.product");
    console.log(user);
    if (!user) throw new Error("User not found");
    return user.cart;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch cart");
  }
}

// Update cart item quantity for a user
export async function updateCart(params: any) {
  try {
    await connectToDb();
    const { userId, productId, quantity } = params;

    await User.findByIdAndUpdate(
      userId,
      {
        $set: { "cart.$[elem].quantity": quantity },
      },
      {
        arrayFilters: [{ "elem.product": productId }],
        new: true,
      }
    );

    revalidatePath("/cart");
  } catch (err) {
    console.log(err);
    throw new Error("Failed to update cart");
  }
}

// Clear cart items for a user
export async function clearCart(userId: string) {
  try {
    await connectToDb();
    await User.findByIdAndUpdate(userId, { cart: [] });
    revalidatePath("/cart");
  } catch (err) {
    console.log(err);
    throw new Error("Failed to clear cart");
  }
}
