/**
 * This is the main screen
 * the whole set of initial posts is loaded here
 */

import React from "react";
import { PostRow } from "../components/post-row";
import { useGetAllPosts } from "../utils/posts";

interface IPost {
  data: {
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
    votePreference: string;
  };
}

function Posts() {
  const posts = useGetAllPosts();

  return (
    <ol className="container mx-auto py-4 font-sans antialiased">
      {posts.map(({ data }: IPost) => (
        <li key={data.id} className="flex">
          <PostRow postItem={data} />
        </li>
      ))}
    </ol>
  );
}

export default Posts;
