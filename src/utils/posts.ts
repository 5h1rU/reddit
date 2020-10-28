import useSWR from "swr";
import placeholder from "../assets/reddit.png";

const postSkeleton = {
  data: {
    title: "Loading...",
    author_fullname: "loading...",
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

const postsSkeleton = Array.from({ length: 25 }, (v, index) => ({
  data: {
    id: `loading-news-item-${index}`,
    ...postSkeleton.data,
  },
}));

function useGetAllPosts() {
  const fetcher = (url: RequestInfo) =>
    fetch(url)
      .then((rawRes) => rawRes.json())
      .then((res) => res.data.children);

  const { data: posts } = useSWR("https://www.reddit.com/r/all.json", fetcher, {
    revalidateOnMount: true,
    initialData: postsSkeleton,
    onSuccess: (data, key, config) => {
      console.log("entra aca", data);
    },
  });

  return posts;
}

function useGetSinglePost(permalink: string) {
  const fetcher = (url: RequestInfo) =>
    fetch(url)
      .then((rawRes) => rawRes.json())
      .then((res) => {
        console.log(res[1].data.children);
        return res[0].data.children[0].data;
        // res[1].data.children[1].data.body // []
        // res[1].data.children[1].data.replies // []
        // res[1].data.children[1].data.replies[1].data.replies // []
      });
  const { data: post } = useSWR(
    `https://old.reddit.com/${permalink}.json`,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      revalidateOnMount: true,
      initialData: postSkeleton.data,
    }
  );

  return post;
}

export { useGetAllPosts, useGetSinglePost };
