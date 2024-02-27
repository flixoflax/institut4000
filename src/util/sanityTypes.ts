import type { ImageAsset, Slug } from "@sanity/types";

type CaseStudyType = {
  client: string;
  thumbnail: ImageAsset;
  position?: number;
  shortDescription: string;
  slug: Slug; // Assuming slug.current is a string
  draftText?: string; // Optional since it might not always be provided
};

export type { CaseStudyType };
