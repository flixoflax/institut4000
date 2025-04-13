import { defineCollection, z } from "astro:content";

const projects = defineCollection({
  type: "content",
  schema: ({ image }) =>
    z.object({
      image: image(),
      title: z.string(),
      description: z.string(),
      date: z.coerce.date(),
      draft: z.boolean().optional(),
      demoURL: z.string().optional(),
      repoURL: z.string().optional(),
    }),
});

const commissions = defineCollection({
  type: "content",
  schema: ({ image }) =>
    z.object({
      image: image(),
      title: z.string(),
      logo: image(),
      description: z.string(),
      date: z.coerce.date(),
      draft: z.boolean().optional(),
      demoURL: z.string().optional(),
    }),
});

export const collections = { projects, commissions };
