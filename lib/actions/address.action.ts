"use server";

import Address from "@/lib/models/address.model";
import { connectToDb } from "../mongoose";
import { auth } from "@clerk/nextjs/server";

// Fetch address for a user
export async function fetchAddress() {
  try {
    await connectToDb();

    const { userId } = auth();
    console.log(userId);
    const address = await Address.findOne({ clerkId: userId });
    console.log(address);
    if (!address) {
      return null;
    }
    return JSON.stringify(address);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch address");
  }
}

// Update address for a user or create if it doesn't exist
export interface AddressParams {
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phoneNumber?: string;
}

export async function updateAddress(params: AddressParams) {
  try {
    await connectToDb();
    const { userId } = auth();
    const {
      addressLine1,
      addressLine2,
      city,
      state,
      postalCode,
      country,
      phoneNumber,
    } = params;

    let address = await Address.findOne({ clerkId: userId });

    if (address) {
      // Update existing address
      address.addressLine1 = addressLine1;
      address.addressLine2 = addressLine2;
      address.city = city;
      address.state = state;
      address.postalCode = postalCode;
      address.country = country;
      address.phoneNumber = phoneNumber;
    } else {
      // Create new address
      address = new Address({
        clerkId: userId,
        addressLine1,
        addressLine2,
        city,
        state,
        postalCode,
        country,
        phoneNumber,
      });
    }

    await address.save();
  } catch (err) {
    console.log(err);
    throw new Error("Failed to update address");
  }
}
