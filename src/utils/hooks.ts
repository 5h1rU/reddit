import React, { useContext } from "react";
import { PostContext } from "../post-context";

function useVote(score: number, id: string) {
  const [votes, setVotes] = React.useState<number>(score);
  const [toggle, setToggle] = React.useState<"up" | "down" | "none">("none");

  const { dispatch, state } = useContext(PostContext);

  React.useEffect(() => {
    if (state[id]) {
      setToggle(state[id].vote);
    }
  }, [id, state]);

  function upvote() {
    if (toggle !== "up") {
      setVotes(score + 1);
      dispatch({ type: "up", payload: { id } });
    } else {
      dispatch({ type: "none", payload: { id } });
      setVotes(score);
    }
  }

  function downvote() {
    if (toggle !== "down") {
      setVotes(score - 1);
      dispatch({ type: "down", payload: { id } });
    } else {
      dispatch({ type: "none", payload: { id } });
      setVotes(score);
    }
  }

  return { votes, upvote, downvote, toggle };
}

export { useVote };
