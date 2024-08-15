"use server";

import { SeoMetadata } from "../models";
import { connectToDb } from "../mongoose";

// Server action to fetch SEO metadata by slug
export async function fetchSeoMetadataBySlug(slug: string) {
  try {
    await connectToDb();

    const seoMetadata = await SeoMetadata.findOne({ slug }).exec();

    if (!seoMetadata) {
      throw new Error("SEO metadata not found");
    }
    console.log(seoMetadata);
    return seoMetadata;
  } catch (error) {
    console.error(`Error fetching SEO metadata with slug ${slug}:`, error);
    throw new Error("Failed to fetch SEO metadata");
  }
}
