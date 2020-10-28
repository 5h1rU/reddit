import React from "react";
import { formatDate } from "../utils/misc";
import { Vote } from "./vote";
import placeholder from "../assets/reddit.png";
import { Link } from "react-router-dom";

interface IPostRow {
  postItem: {
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
    permalink: string;
    votePreference: string;
  };
}

function PostRow({ postItem }: IPostRow) {
  const {
    author_fullname,
    id,
    title,
    domain,
    subreddit_name_prefixed,
    thumbnail_height,
    thumbnail_width,
    thumbnail,
    created,
    num_comments,
    score,
    permalink,
  } = postItem;

  const placeholderFallback = () => {
    if (thumbnail !== "self" || "nsfw" || "default") {
      return thumbnail;
    } else {
      return placeholder;
    }
  };
  return (
    <div className="flex w-full bg-white border rounded">
      <div className="flex flex-col w-1/12 pt-2 text-center">
        <Vote score={score} id={id}></Vote>
      </div>
      <div className="flex w-11/12 pt-2 text-left">
        <img src={placeholderFallback()} width="70" height="38" alt={title} />
        <div className="pl-1">
          <h2 className="text-base leading-tight text-blue-600">
            <Link to={`/post${permalink}`}>{title}</Link>
            <a
              href={`https://${domain}`}
              className="pl-1 text-xs text-gray-500"
            >
              ({domain})
            </a>
          </h2>
          <small className="text-gray-500">
            Submitted {formatDate(created)} ago by
            <a
              className="px-1 text-blue-600 hover:underline"
              href={`https://old.reddit.com/username/${author_fullname}`}
            >
              {author_fullname}
            </a>
            to
            <a
              className="px-1 text-blue-600 hover:underline"
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

export { PostRow };
