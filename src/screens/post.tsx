import React from "react";
import { useLocation } from "react-router-dom";
import { PostRow } from "../components/post-row";
import { useGetSinglePost } from "../utils/posts";

function Post() {
  let { pathname } = useLocation();
  const permalink = pathname.split("/").slice(2, -1).join("/");
  const post = useGetSinglePost(permalink);
  console.log("from post", post);
  return (
    <div className="container mx-auto font-sans antialiased">
      <PostRow postItem={post} />
    </div>
  );
}

export default Post;
