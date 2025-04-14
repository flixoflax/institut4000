import { getCollection, type CollectionEntry } from "astro:content";
import fs from "fs";
import path from "path";
import { ImageResponse } from "@vercel/og";
import { readingTime } from "~/lib/utils";

interface Props {
  params: { slug: string };
  props: { project: CollectionEntry<"projects"> };
}

export async function GET({ props }: Props) {
  const { project } = props;

  // Calculate reading time
  const readingTimeText = readingTime(project.body);

  // Load custom fonts
  const SwitzerSemiBold = fs.readFileSync(
    path.resolve("./src/assets/fonts/Switzer-Semibold.woff")
  );
  const SwitzerRegular = fs.readFileSync(
    path.resolve("./src/assets/fonts/Switzer-Regular.woff")
  );

  // Load project cover image
  const projectCover = fs.readFileSync(
    process.env.NODE_ENV === "development"
      ? path.resolve(
          project.data.image.src.replace(/\?.*/, "").replace("/@fs", "")
        )
      : path.resolve(project.data.image.src.replace("/", "dist/"))
  );

  // Create the OpenGraph image structure
  const html = {
    type: "div",
    props: {
      style: {
        display: "flex",
        width: "100%",
        height: "100%",
        background: "#f8f8f8",
        fontFamily: "Switzer Regular",
      },
      children: [
        // Left section (2/3 of the width) for text content
        {
          type: "div",
          props: {
            style: {
              display: "flex",
              flexDirection: "column",
              width: "67%",
              height: "100%",
              padding: "64px 80px",
              position: "relative",
            },
            children: [
              // Institut 4000 at the top
              {
                type: "div",
                props: {
                  style: {
                    position: "absolute",
                    left: "80px",
                    top: "64px",
                    display: "flex",
                    alignItems: "center",
                  },
                  children: [
                    {
                      type: "div",
                      props: {
                        style: {
                          fontSize: "28px",
                          fontFamily: "Switzer Semibold",
                        },
                        children: "Institut 4000",
                      },
                    },
                  ],
                },
              },

              // Main content in the center
              {
                type: "div",
                props: {
                  style: {
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    flexGrow: 1,
                  },
                  children: [
                    {
                      type: "div",
                      props: {
                        style: {
                          fontSize: "64px",
                          fontFamily: "Switzer Semibold",
                          lineHeight: 1.2,
                        },
                        children: project.data.title,
                      },
                    },
                    {
                      type: "div",
                      props: {
                        style: {
                          fontSize: "32px",
                          fontFamily: "Switzer Regular",
                          marginTop: "16px",
                          color: "#404040",
                        },
                        children: project.data.description,
                      },
                    },
                  ],
                },
              },

              // Reading time at the bottom left
              {
                type: "div",
                props: {
                  style: {
                    position: "absolute",
                    left: "80px",
                    bottom: "64px",
                    display: "flex",
                    alignItems: "center",
                  },
                  children: [
                    {
                      type: "div",
                      props: {
                        style: {
                          fontSize: "24px",
                          fontFamily: "Switzer Regular",
                          color: "#404040",
                        },
                        children: `${project.data.date.toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          }
                        )} • ${readingTimeText}`,
                      },
                    },
                  ],
                },
              },
            ],
          },
        },

        // Right section (1/3 of the width) for image
        {
          type: "div",
          props: {
            style: {
              display: "flex", // Added this to fix the error
              position: "relative",
              width: "33%",
              height: "100%",
              overflow: "hidden",
            },
            children: [
              {
                type: "img",
                props: {
                  src: `data:image/png;base64,${projectCover.toString(
                    "base64"
                  )}`,
                  style: {
                    objectFit: "cover",
                    width: "100%",
                    height: "100%",
                  },
                },
              },
            ],
          },
        },
      ],
    },
  };

  // Return the generated image
  return new ImageResponse(html, {
    width: 1200,
    height: 600,
    fonts: [
      {
        name: "Switzer Semibold",
        data: SwitzerSemiBold,
        style: "normal",
      },
      {
        name: "Switzer Regular",
        data: SwitzerRegular,
        style: "normal",
      },
    ],
  });
}

// Generate an image for each project in the collection
export async function getStaticPaths() {
  const projects = await getCollection("projects");
  return projects.map((project) => ({
    params: { slug: project.slug },
    props: { project },
  }));
}
