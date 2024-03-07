import path from "path";
import { ImageResponse } from "@vercel/og";
import fs from "fs";
import {
  getCaseStudies,
  type CaseStudyFull,
  getCaseStudy,
} from "../../../util/sanity";
import type { JSXElementConstructor, ReactElement } from "react";

interface Props {
  params: { slug: string };
  props: { study: CaseStudyFull };
}

export async function GET({ props }: Props) {
  const { study } = props;
  const fullStudy = await getCaseStudy(study.slug);

  //   using custom font files
  const geistMedium = fs.readFileSync(
    path.resolve("./public/fonts/geist-sans-latin-700-normal.woff"),
  );

  const geistBold = fs.readFileSync(
    path.resolve("./public/fonts/geist-sans-latin-700-normal.woff"),
  );

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
            src: fullStudy.thumbnailUrl,
            style: {
              width: "500px",
              height: "630px",
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
                  children: fullStudy.client,
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
                  children: fullStudy.subsubheadline
                    ?.replace("<br />", "")
                    .replace("<br>", ""),
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
        background: fullStudy.backgroundColor.hex,
        color: fullStudy.textColor.hex,
      },
    },
  };

  return new ImageResponse(
    html as unknown as ReactElement<unknown, JSXElementConstructor<unknown>>,
    {
      width: 1200,
      height: 630,
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

// to generate an image for each blog posts in a collection
export async function getStaticPaths() {
  const studies = await getCaseStudies();
  const filteredStudies = studies.filter((study) => study.draftText === null);
  return filteredStudies.map((study) => ({
    params: { slug: study.slug },
    props: { study },
  }));
}
