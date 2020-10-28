import useSWR from "swr";
import placeholder from "../assets/reddit.png";

const loadingNewsItem = {
  data: {
    title: "Loading...",
    author_fullname: "loading...",
    loadingBook: true,
    domain: "loading",
    subreddit_name_prefixed: "loading",
    thumbnail_height: "loading",
    thumbnail_width: "loading",
    thumbnail: placeholder,
    created: "loading",
    num_comments: "loading",
    score: "loading",
  },
};

const loadingNews = Array.from({ length: 25 }, (v, index) => ({
  data: {
    id: `loading-news-item-${index}`,
    ...loadingNewsItem.data,
  },
}));

function useGetAllNews() {
  const fetcher = (url: RequestInfo) =>
    fetch(url)
      .then((rawRes) => rawRes.json())
      .then((res) => res.data.children);

  const { data: news } = useSWR("https://www.reddit.com/r/all.json", fetcher);

  return news ?? loadingNews;
}

export { useGetAllNews };
