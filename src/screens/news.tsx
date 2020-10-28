import React from "react";
import { useGetAllNews } from "../utils/news";
import { NewsRow } from "../components/news-row";

interface NewsInterface {
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
  };
}
function News() {
  const news = useGetAllNews();

  return (
    <ol className="container mx-auto font-sans antialiased">
      {news.map(({ data }: NewsInterface) => (
        <li key={data.id} className="flex">
          <NewsRow newsItem={data} />
        </li>
      ))}
    </ol>
  );
}

export default News;
