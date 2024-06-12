"use server";

import User from "@/lib/models/user.model";
import { connectToDb } from "../mongoose";
import { revalidatePath } from "next/cache";
import { auth } from "@clerk/nextjs/server";

// Fetch cart items for a user
export async function fetchCart() {
  try {
    await connectToDb();

    const { userId } = auth();
    console.log(userId);
    const user = await User.findOne({ clerkId: userId }).populate({
      path: "cart.product",
      populate: { path: "images" },
    });
    if (!user) throw new Error("User not found");
    return JSON.stringify(user.cart);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch cart");
  }
}

// Update cart item quantity for a user
export async function updateCart(params: any) {
  try {
    await connectToDb();
    const { userId } = auth();
    const { productId, quantity, flavor, size } = params;

    const user = await User.findOne({ clerkId: userId });
    if (!user) throw new Error("User not found");

    const cartItem = user.cart.find(
      (item: any) => item.product.toString() === productId
    );

    if (cartItem) {
      cartItem.quantity = quantity;
      cartItem.flavor = flavor;
      cartItem.size = size;
    } else {
      user.cart.push({
        product: productId,
        quantity,
        flavor,
        size,
      });
    }

    await user.save();
    revalidatePath("/cart");
  } catch (err) {
    console.log(err);
    throw new Error("Failed to update cart");
  }
}

// Remove a cart item for a user
export async function removeFromCart(productId: string) {
  try {
    await connectToDb();
    const { userId } = auth();

    const user = await User.findOne({ clerkId: userId });
    if (!user) throw new Error("User not found");

    user.cart = user.cart.filter(
      (item: any) => item.product.toString() !== productId
    );

    await user.save();
    revalidatePath("/cart");
  } catch (err) {
    console.log(err);
    throw new Error("Failed to remove item from cart");
  }
}

// Clear cart items for a user
export async function clearCart() {
  try {
    await connectToDb();
    const { userId } = auth();
    await User.findOneAndUpdate({ clerkId: userId }, { cart: [] });
  } catch (err) {
    console.log(err);
    throw new Error("Failed to clear cart");
  }
}
