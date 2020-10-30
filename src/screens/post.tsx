/**
 * This screen is in charge of render each post in detail including
 * comments.
 *
 * The permalink value there is modified in order to guarante the right
 * format passed to the hook useGetSinglePost
 */

import React from "react";
import { useLocation } from "react-router-dom";
import { Comment } from "../components/comment-row";
import { PostRow } from "../components/post-row";
import { useGetSinglePost } from "../utils/posts";

function Post() {
  let { pathname } = useLocation();
  const permalink = pathname.split("/").slice(2, -1).join("/");
  const { post, comments } = useGetSinglePost(permalink);
  return (
    <div className="container mx-auto py-4 font-sans antialiased">
      <PostRow postItem={post} />
      <ul className="flex-none w-full bg-white border rounded">
        {comments.map((data: any) => (
          <li key={data.id} className="">
            <Comment key={data.id} comment={data} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Post;
