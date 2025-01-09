import { defineType, defineField } from "sanity";
import { PlayIcon } from "@sanity/icons";

export const videoEmbed = defineType({
  name: "video",
  type: "object",
  title: "Video",
  icon: PlayIcon,
  fields: [
    defineField({
      name: "url",
      type: "url",
      title: "Video URL",
      description: "Supports various video platforms (Vimeo, YouTube, etc.)",
    }),
    defineField({
      name: "caption",
      type: "string",
      title: "Caption",
    }),
  ],
  preview: {
    select: {
      title: "caption",
      subtitle: "url",
    },
  },
});
