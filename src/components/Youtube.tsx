import React from "react";
import YouTubePlayer from "react-player/youtube";

import type { TypedObject } from "astro-portabletext/types";

export interface Props extends TypedObject {
  url: string;
}

export function isYoutubeEmbed(t: unknown): t is Props {
  return (t as Props).url !== undefined;
}

export function Youtube(props: Props) {
  return (
    <div className="aspect-video">
      <YouTubePlayer width={"100%"} height={"100%"} url={props.url} />
    </div>
  );
}
