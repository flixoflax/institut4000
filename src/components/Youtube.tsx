import React from "react";

import type { TypedObject } from "astro-portabletext/types";
import YouTubePlayer from "react-player/youtube";

export interface Props extends TypedObject {
  url: string;
}

export function isYoutubeEmbed(t: unknown): t is Props {
  return (t as Props).url !== undefined;
}

export function Youtube(props: Props) {
  return (
    <div className="aspect-video">
      <YouTubePlayer
        config={{
          playerVars: {
            cc_load_policy: 1,
            cc_lang_pref: "en",
          },
        }}
        width={"100%"}
        height={"100%"}
        url={props.url as string}
      />
    </div>
  );
}
