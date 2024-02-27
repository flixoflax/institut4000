import { defineType, defineField } from "sanity";

export default defineType({
  name: "caseStudy",
  title: "Case Study",
  type: "document",
  fields: [
    defineField({
      name: "thumbnail",
      title: "Thumbnail",
      type: "image",
      validation: (Rule) => Rule.required(),
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "client",
      title: "Client",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "client",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "headline",
      title: "Headline",
      type: "string",
    }),
    defineField({
      name: "subheadline",
      title: "Sub Headline",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "subsubheadline",
      title: "Sub Sub Headline",
      type: "text",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "services",
      title: "Services",
      type: "array",
      validation: (Rule) => Rule.required(),
      of: [{ type: "string" }],
    }),
    defineField({
      name: "backgroundColor",
      title: "Background Color",
      type: "color",
      options: {
        disableAlpha: true,
      },
      validation: (Rule) => Rule.required(),
      initialValue: {
        _type: "color",
        hex: "#000000",
        alpha: 0.9,
        hsl: {
          _type: "hslaColor",
          h: 0,
          s: 0,
          l: 0,
          a: 0.9,
        },
        hsv: {
          _type: "hsvaColor",
          h: 0,
          s: 0,
          v: 0,
          a: 0.9,
        },
        rgb: {
          _type: "rgbaColor",
          r: 0,
          g: 0,
          b: 0,
          a: 0.9,
        },
      },
    }),
    defineField({
      name: "textColor",
      title: "Text Color",
      type: "color",
      validation: (Rule) => Rule.required(),
      options: {
        disableAlpha: true,
      },
      initialValue: {
        _type: "color",
        hex: "#FFFFFF",
        alpha: 0.9,
        hsl: {
          _type: "hslaColor",
          h: 0, // Hue is irrelevant for pure white/black, commonly set to 0
          s: 0,
          l: 1,
          a: 0.9,
        },
        hsv: {
          _type: "hsvaColor",
          h: 0,
          s: 0,
          v: 1,
          a: 0.9,
        },
        rgb: {
          _type: "rgbaColor",
          r: 255,
          g: 255,
          b: 255,
          a: 0.9,
        },
      },
    }),
    defineField({
      name: "draftText",
      title: "Draft Text",
      type: "string",
    }),
    defineField({
      name: "position",
      title: "Position",
      type: "number",
    }),
    defineField({
      name: "content",
      title: "Content",
      type: "array",
      of: [{ type: "block" }, { type: "image" }],
    }),
  ],
});
