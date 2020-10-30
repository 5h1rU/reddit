/**
 * This component is in charge of handle the votes
 * most of the logic is handled by useVote hook
 */
import React from "react";
import { useVote } from "../hooks/vote";
import { kFormatter } from "../utils/misc";

function Vote({ score, id }: { score: number; id: string }) {
  const { votes, upvote, downvote, toggle } = useVote(score, id);
  return (
    <>
      <button className="m-auto text-xs" onClick={upvote} data-testId="upvote">
        <svg
          className={`w-5 text-${
            toggle === "up" ? "green" : "gray"
          }-400 fill-current`}
          viewBox="0 0 20 20"
        >
          <path d="M7 10v8h6v-8h5l-8-8-8 8h5z"></path>
        </svg>
      </button>
      <span
        className={`my-1 text-xs font-semibold text-gray-400 text-${
          toggle === "down" ? "blue" : toggle === "up" ? "green" : "gray"
        }-400`}
        data-testId="score"
      >
        {kFormatter(Number(votes || score))}
      </span>
      <button
        className="m-auto text-xs"
        onClick={downvote}
        data-testId="downvote"
      >
        <svg
          className={`w-5 text-${
            toggle === "down" ? "blue" : "gray"
          }-400 fill-current`}
          viewBox="0 0 20 20"
        >
          <path d="M7 10V2h6v8h5l-8 8-8-8h5z"></path>
        </svg>
      </button>
    </>
  );
}

export { Vote };
