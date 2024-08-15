import React from "react";
import ProductPage from "../_components/ProductPage";
import { fetchSeoMetadataBySlug } from "@/lib/actions/seo.action";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const seoMetadata = await fetchSeoMetadataBySlug(params.slug);

  return {
    title: seoMetadata.title,
    description: seoMetadata.description,
    openGraph: {
      title: seoMetadata.ogTitle,
      description: seoMetadata.ogDescription,
      url: seoMetadata.ogUrl,
      images: [
        {
          url: seoMetadata.ogImage,
          width: 800,
          height: 600,
          alt: seoMetadata.altTag,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: seoMetadata.ogTitle,
      description: seoMetadata.ogDescription,
      images: [seoMetadata.ogImage],
    },
    alternates: {
      canonical: seoMetadata.canonical,
    },
    robots: seoMetadata.metaRobots,
  };
}

const page = ({ params }: any) => {
  return (
    <div>
      <ProductPage params={params} />
    </div>
  );
};

export default page;
