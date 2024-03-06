import path from "path";
import { ImageResponse } from "@vercel/og";
import fs from "fs";
import type { JSXElementConstructor, ReactElement } from "react";

export async function GET() {
  //   using custom font files
  const geistMedium = fs.readFileSync(
    path.resolve("./public/fonts/geist-sans-latin-700-normal.woff"),
  );

  const geistBold = fs.readFileSync(
    path.resolve("./public/fonts/geist-sans-latin-700-normal.woff"),
  );

  const me = fs.readFileSync(path.resolve("./public/img/me.jpg"));

  // const me = fs.readFileSync(
  //   process.env.NODE_ENV === "development"
  //     ? path.resolve("/img/me.webp".replace(/\?.*/, "").replace("/@fs", ""))
  //     : path.resolve("/img/me.webp".replace("/", "dist/")),
  // );

  // Astro doesn't support tsx endpoints so usign React-element objects
  const html = {
    type: "div",
    props: {
      key: "bgContainer",
      children: [
        {
          type: "img",
          props: {
            key: "thumbnail",
            src: me.buffer,
            style: {
              width: "500px",
              height: "600px",
              objectFit: "cover",
            },
          },
        },
        {
          type: "div",
          props: {
            key: "container",
            tw: "pl-10 shrink flex flex-col",
            children: [
              {
                type: "div",
                props: {
                  key: "client",
                  style: {
                    fontSize: "24px",
                    fontFamily: "Geist Sans Medium",
                    paddingBottom: "20px",
                  },
                  children: "Niels Clormann",
                },
              },
              {
                type: "div",
                props: {
                  key: "description",
                  style: {
                    fontSize: "48px",
                    fontFamily: "Geist Sans Bold",
                    paddingBottom: "20px",
                  },
                  children: "I love to create digital experiences.",
                },
              },
            ],
          },
        },
        {
          type: "div",
          props: {
            key: "logo-container",
            tw: "absolute right-[40px] bottom-[40px] flex items-center",
            children: [
              {
                type: "div",
                props: {
                  tw: "text-3xl",
                  children: "Institut 4000",
                  key: "logo",
                  style: {
                    fontFamily: "Geist Sans Medium",
                  },
                },
              },
            ],
          },
        },
      ],
      tw: "w-full h-full flex items-center justify-between relative pr-10",
      style: {
        background: "#000000",
        color: "#ffffff",
      },
    },
  };

  return new ImageResponse(
    html as unknown as ReactElement<unknown, JSXElementConstructor<unknown>>,
    {
      width: 1200,
      height: 600,
      fonts: [
        {
          name: "Geist Sans Bold",
          data: geistBold.buffer,
          style: "normal",
        },
        {
          name: "Geist Sans Medium",
          data: geistMedium.buffer,
          style: "normal",
        },
      ],
    },
  );
}
