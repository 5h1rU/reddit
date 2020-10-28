import React from "react";
import { useLocation } from "react-router-dom";
import { useGetSinglePost } from "../utils/news";

function Post() {
  let { pathname } = useLocation();
  const permalink = pathname.split("/").slice(2, -1).join("/");
  console.log(permalink);
  debugger;
  const post = useGetSinglePost(permalink);

  return <div>{JSON.stringify(post)}</div>;
}

export default Post;
