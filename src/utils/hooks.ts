import React from "react";
function useVote(score: number) {
  const [vote, setVote] = React.useState<number>(score);
  const [selection, setSelection] = React.useState<"up" | "down" | null>(null);

  React.useEffect(() => {
    if (selection === "up") {
      setVote(score + 1);
    } else if (selection === "down") {
      setVote(score - 1);
    }
  }, [score, selection]);

  return { vote, selection, setSelection };
}

export { useVote };
