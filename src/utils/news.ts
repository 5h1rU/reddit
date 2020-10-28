import { debug } from "console";
import useSWR, { mutate } from "swr";
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

  const { data: news } = useSWR("https://www.reddit.com/r/all.json", fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  return news ?? loadingNews;
}

function useGetSinglePost(permalink: string) {
  const fetcher = (url: RequestInfo) =>
    fetch(url)
      .then((rawRes) => rawRes.json())
      .then((res) => {
        console.log(res);
        return res.data.children;
      });
  const { data: post } = useSWR(
    `https://old.reddit.com/${permalink}.json`,
    fetcher
  );

  return post ?? loadingNewsItem;
}

function useUpdateSinglePost(id: string) {
  return () =>
    mutate(
      "https://www.reddit.com/r/all.json",
      async (posts: []) => {
        let post = { data: { id: "" }, kind: {} };
        debugger;
        let newData = {};
        for (post of posts) {
          if (post.data.id === id) {
            newData = {
              ...post,
              data: {
                ...post.data,
                score: 1,
              },
            };
          }
        }
        debugger;
        return [...posts, newData];
      },
      false
    );
}

export { useGetAllNews, useGetSinglePost, useUpdateSinglePost };
