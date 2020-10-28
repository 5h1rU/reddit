import React from "react";
import { useVote } from "../utils/hooks";

function Vote({ score }: { score: number }) {
  const { selection, setSelection, vote } = useVote(score);

  return (
    <>
      <button
        disabled={selection === "up" && true}
        className="m-auto text-xs"
        onClick={() => setSelection("up")}
      >
        <svg
          className={
            selection === "up"
              ? "w-5 text-green-400 fill-current"
              : "w-5 text-gray-400 fill-current"
          }
          viewBox="0 0 20 20"
        >
          <path d="M7 10v8h6v-8h5l-8-8-8 8h5z"></path>
        </svg>
      </button>
      <span className="my-1 text-xs font-semibold">{vote}</span>
      <button
        disabled={selection === "down" && true}
        className="m-auto text-xs"
        onClick={() => setSelection("down")}
      >
        <svg
          className={
            selection === "down"
              ? "w-5 text-blue-400 fill-current"
              : "w-5 text-gray-400 fill-current"
          }
          viewBox="0 0 20 20"
        >
          <path d="M7 10V2h6v8h5l-8 8-8-8h5z"></path>
        </svg>
      </button>
    </>
  );
}

export { Vote };
