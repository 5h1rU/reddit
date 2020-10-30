import React, { useContext, useState } from "react";
import { CommentContext } from "../context/comment-context";

function useSaveComment(parentId: string) {
  const { dispatch, state } = useContext(CommentContext);
  const [localComment, setLocalComment] = useState<any[] | null>(null);
  React.useEffect(() => {
    if (state[parentId]) {
      setLocalComment(state[parentId].replies);
    }
  }, [parentId, state]);

  function save(body: string) {
    dispatch({ type: "save", payload: { parentId, body } });
  }

  console.log(localComment);
  return { save, localComment };
}

export { useSaveComment };
