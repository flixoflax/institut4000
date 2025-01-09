import React from "react";
import type { TypedObject } from "astro-portabletext/types";
import ReactPlayer from "react-player";

export interface Props extends TypedObject {
  url: string;
  caption?: string;
}

export function isVideoEmbed(t: unknown): t is Props {
  return (t as Props).url !== undefined;
}

export function Video(props: Props) {
  return (
    <div className="space-y-2">
      <div className="aspect-video">
        <ReactPlayer url={props.url} width="100%" height="100%" controls />
      </div>
      {props.caption && (
        <p className="text-sm text-gray-500">{props.caption}</p>
      )}
    </div>
  );
}
