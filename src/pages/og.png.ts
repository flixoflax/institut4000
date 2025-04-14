import fs from "fs";
import path from "path";
import { ImageResponse } from "@vercel/og";
import { HOME } from "~/consts";

export async function GET() {
  // Load custom fonts
  const SwitzerSemiBold = fs.readFileSync(
    path.resolve("./src/assets/fonts/Switzer-Semibold.woff")
  );
  const SwitzerRegular = fs.readFileSync(
    path.resolve("./src/assets/fonts/Switzer-Regular.woff")
  );

  // Create the OpenGraph image structure
  const html = {
    type: "div",
    props: {
      style: {
        display: "flex",
        width: "100%",
        height: "100%",
        background: "#f5f5f5",
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
                          fontSize: "32px",
                          fontFamily: "Switzer Regular",
                          marginTop: "16px",
                          color: "#404040",
                        },
                        children: HOME.DESCRIPTION,
                      },
                    },
                  ],
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
    height: 630,
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
