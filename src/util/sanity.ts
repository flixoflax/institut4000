import type { ImageAsset, Image, Slug } from "@sanity/types";
import type { PortableTextBlock } from "@portabletext/types";
import { sanityClient } from "sanity:client";
import groq from "groq";

type CaseStudy = {
  client: string;
  thumbnail: ImageAsset;
  position?: number;
  description: string;
  slug: Slug; // Assuming slug.current is a string
  draftText?: string; // Optional since it might not always be provided
};

interface Color {
  hex: string;
  alpha: number;
  hsl: { h: number; s: number; l: number; a: number };
  hsv: { h: number; s: number; v: number; a: number };
  rgb: { r: number; g: number; b: number; a: number };
}

interface CaseStudyFull {
  thumbnailUrl: string;
  client: string;
  slug: Slug;
  headline?: string;
  subheadline: PortableTextBlock[];
  subsubheadline: string;
  description: string;
  services: string[];
  backgroundColor: Color;
  textColor: Color;
  draftText?: string;
  position?: number;
  content: Array<PortableTextBlock | Image>;
}

const getCaseStudies = async (): Promise<CaseStudy[]> => {
  return await sanityClient.fetch<CaseStudy[]>(groq`
    *[_type == "caseStudy"] | order(position asc) {
    "client": client,
    "thumbnail": thumbnail,
    "position": position,
    "description": description,
    "slug": slug.current,
    "draftText": draftText
    }
`);
};

const getCaseStudy = async (slug: string): Promise<CaseStudyFull> => {
  return await sanityClient.fetch<CaseStudyFull>(
    groq`
  *[_type == "caseStudy" && slug.current == $slug][0] {
  
  "thumbnailUrl": thumbnail.asset->url,
  client,
  slug,
  headline,
  subheadline[]{
    ..., 
    // For embedded images within blocks
    _type == "image" => {
      "url": @.asset->url
    }
  },
  subsubheadline,
  description,
  services[],
  backgroundColor{
    hex,
    alpha,
    hsl{h, s, l, a},
    hsv{h, s, v, a},
    rgb{r, g, b, a}
  },
  textColor{
    hex,
    alpha,
    hsl{h, s, l, a},
    hsv{h, s, v, a},
    rgb{r, g, b, a}
  },
  draftText,
  position,
  content[]{
    ...,
    _type == "image" => {
      "url": @.asset->url
    }
  }
}
  `,
    { slug },
  );
};

export { getCaseStudies, getCaseStudy };
export type { CaseStudyFull };
