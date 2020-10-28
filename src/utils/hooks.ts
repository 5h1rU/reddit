import React from "react";
import { useUpdateSinglePost } from "./news";

function useVote(score: number, id: string) {
  const [votes, setVotes] = React.useState<number>(score);
  const [toggle, setToggle] = React.useState<"up" | "down" | null>(null);

  const data = useUpdateSinglePost(id);
  console.log(data);
  function upvote() {
    if (toggle !== "up") {
      setVotes(score + 1);
      setToggle("up");
      data();
    } else {
      setToggle(null);
      setVotes(score);
    }
  }

  function downvote() {
    if (toggle !== "down") {
      setVotes(score - 1);
      setToggle("down");
    } else {
      setToggle(null);
      setVotes(score);
    }
  }

  return { votes, upvote, downvote, toggle };
}

function usePrevious(value: string | null) {
  const ref = React.useRef<string | null>();
  React.useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

export { useVote, usePrevious };
