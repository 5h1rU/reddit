import useSWR from "swr";
import placeholder from "../assets/reddit.png";

let cache: any[] = [];

let postSkeleton = {
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
    score: "0",
  },
};

let commentSkeleton = {
  id: String(new Date()),
  parentId: "loading",
  body: "loading",
  score: 0,
  author_fullname: "loading",
  created_utc: "loading",
};

const postsSkeleton = Array.from({ length: 25 }, (v, index) => ({
  data: {
    id: `loading-news-item-${index}`,
    ...postSkeleton.data,
  },
}));

/**
 * determines which info to show in the first load
 * if the post is already loaded the initial data
 * will use it and awaits for data revalidation
 */
function setInitialPostData(permalink: string) {
  if (!cache.length) {
    return postSkeleton.data;
  }
  const postCache = cache.filter((post) => {
    return post.data.permalink === `/${permalink}/`;
  });

  return postCache[0]?.data ?? postSkeleton.data;
}

/**
 * - return all the posts
 * - assign structure to the postSkeleton in order to use
 *   this info in a future load.
 * - add the set of posts to a cache (see setInitialPostData)
 */
function useGetAllPosts() {
  const fetcher = (url: RequestInfo) =>
    fetch(url)
      .then((rawRes) => rawRes.json())
      .then((res) => {
        postSkeleton = res.data.children[0];
        cache = res.data.children;
        return res.data.children;
      });

  const { data: posts } = useSWR("https://old.reddit.com/r/all.json", fetcher, {
    revalidateOnMount: true,
    initialData: postsSkeleton,
  });

  return posts;
}

/**
 * - returns a single post based on the permalink
 *   fetched from the url
 * - in this case the paylod has two parts
 * 1. Post details
 * 2. Comments
 *
 * The idea here is returns the data splited
 * this allow to the app use this hook coming
 * from outside or opening from an internal link
 *
 * initialData determines which is the best UI to show
 *
 */
function useGetSinglePost(permalink: string) {
  const fetcher = (url: RequestInfo) =>
    fetch(url)
      .then((rawRes) => rawRes.json())
      .then((res) => {
        return {
          post: res[0].data.children[0].data,
          comments: res[1].data.children.map((comment: { data: any }) => {
            return comment.data;
          }),
        };
      });
  const { data } = useSWR(`https://old.reddit.com/${permalink}.json`, fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    revalidateOnMount: true,
    initialData: {
      post: setInitialPostData(permalink),
      comments: [commentSkeleton],
    },
  });

  return { post: data?.post, comments: data?.comments };
}

export { useGetAllPosts, useGetSinglePost };
