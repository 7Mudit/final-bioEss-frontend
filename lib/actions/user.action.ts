"use server";
import User from "@/lib/models/user.model";
import { connectToDb } from "../mongoose";
import { revalidatePath } from "next/cache";

export async function createUser(userData: any) {
  try {
    connectToDb();
    const newUser = await User.create(userData);
    return newUser;
  } catch (err) {
    console.log(err);
  }
}

export async function updateUser(params: any) {
  try {
    connectToDb();
    const { clerkId, updateData, path } = params;
    await User.findOneAndUpdate({ clerkId }, updateData, {
      new: true,
    });
    revalidatePath(path);
  } catch (err) {
    console.log(err);
  }
}
export async function deleteUser(params: any) {
  try {
    connectToDb();
    const { clerkId } = params;
    const user = await User.findOne({ clerkId });
    if (!user) {
      throw new Error("User not found");
    }
    // delete everything related to user

    const deletedUser = await User.findByIdAndDelete(user._id);
    return deletedUser;
  } catch (err) {
    console.log(err);
  }
}
