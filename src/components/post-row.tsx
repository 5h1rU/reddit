/**
 * This component render all the post details as a row in the UI
 */

import React from "react";
import { Link } from "react-router-dom";
import TimeAgo from "timeago-react";
import placeholder from "../assets/reddit.png";
import { Vote } from "./vote";

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
    created_utc: number;
    num_comments: number;
    score: number;
    permalink: string;
  };
}

function PostRow({ postItem }: IPostRow) {
  const {
    author_fullname,
    id,
    title,
    domain,
    subreddit_name_prefixed,
    thumbnail,
    created_utc,
    num_comments,
    score,
    permalink,
  } = postItem;

  const placeholderFallback = () => {
    return !["self", "nsfw", "default", "(unknown)"].includes(thumbnail)
      ? thumbnail
      : placeholder;
  };
  return (
    <div className="flex w-full bg-white border rounded">
      <div className="flex flex-col w-1/12 pt-2 text-center">
        <Vote score={score} id={id}></Vote>
      </div>
      <div className="flex w-11/12 pt-2 text-left">
        <img
          className="w-1/12"
          src={placeholderFallback()}
          width="70"
          height="38"
          alt={title}
        />
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
            Submitted {<TimeAgo datetime={new Date(created_utc * 1000)} />} ago
            by
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
            <Link
              className="text-xs text-gray-700 text-bold hover:underline"
              to={`/post${permalink}`}
            >
              {num_comments} comments
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export { PostRow };
