import React from "react";
import { formatDate } from "../utils/misc";
import { Vote } from "./vote";
import placeholder from "../assets/reddit.png";

interface NewsRowInterface {
  newsItem: {
    author_fullname: string;
    id: string;
    title: string;
    domain: string;
    subreddit_name_prefixed: string;
    thumbnail_height: number;
    thumbnail_width: number;
    thumbnail: string;
    created: number;
    num_comments: number;
    score: number;
  };
}

function NewsRow({ newsItem }: NewsRowInterface) {
  const {
    author_fullname,
    title,
    domain,
    subreddit_name_prefixed,
    thumbnail_height,
    thumbnail_width,
    thumbnail,
    created,
    num_comments,
    score,
  } = newsItem;

  const placeholderFallback = () => {
    if (thumbnail !== "self" || "nsfw" || "default") {
      return thumbnail;
    } else {
      return placeholder;
    }
  };
  return (
    <div className="flex w-2/3 bg-white border rounded">
      <div className="flex flex-col w-1/12 pt-2 text-center">
        <Vote score={score}></Vote>
      </div>
      <div className="flex w-11/12 pt-2 text-left">
        <img
          src={placeholderFallback()}
          width="70"
          height="70"
          alt={thumbnail}
        />
        <div className="pl-1">
          <h2 className="text-base leading-tight text-blue-600">
            <a href="#">{title}</a>
            <a
              href={`https://${domain}`}
              className="pl-1 text-xs text-gray-500"
            >
              ({domain})
            </a>
          </h2>
          <small className="text-gray-500">
            Submitted {formatDate(created)} ago by{" "}
            <a
              className="text-blue-600 hover:underline"
              href={`https://old.reddit.com/username/${author_fullname}`}
            >
              {author_fullname}
            </a>{" "}
            to{" "}
            <a
              className="text-blue-600 hover:underline"
              href={`https://old.reddit.com/${subreddit_name_prefixed}`}
            >
              {subreddit_name_prefixed}
            </a>
          </small>
          <div>
            <a
              className="text-xs text-gray-700 text-bold hover:underline"
              href="google"
            >
              {num_comments} comments
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export { NewsRow };
