import React from "react";
import { useGetAllPosts } from "../utils/posts";
import { PostRow } from "../components/post-row";

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
    created: number;
    num_comments: number;
    score: number;
    permalink: string;
    votePreference: string;
  };
}

function News() {
  const posts = useGetAllPosts();

  return (
    <ol className="container mx-auto font-sans antialiased">
      {posts.map(({ data }: IPost) => (
        <li key={data.id} className="flex">
          <PostRow postItem={data} />
        </li>
      ))}
    </ol>
  );
}

export default News;
