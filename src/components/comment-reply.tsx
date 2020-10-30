/**
 * This form is in charge of handling the local replies
 * using the save prop the comment is send to a context
 * and memoized there.
 */

import React from "react";

interface ICommentReply {
  parentId: string;
  setReply: React.Dispatch<React.SetStateAction<boolean>>;
  save: (comment: string) => void;
}

function CommentReply({ parentId, setReply, save }: ICommentReply) {
  const [comment, setComment] = React.useState("");
  const handleSave = (e: any) => {
    e.preventDefault();
    save(comment);
    setReply(false);
  };

  return (
    <form className="flex flex-1 flex-col py-4 pr-4" onSubmit={handleSave}>
      <label htmlFor="comment">Reply a comment</label>
      <textarea
        id="comment"
        className="border-2 mt-4 p-1 rounded"
        onChange={(e) => setComment(e.target.value)}
        value={comment}
      ></textarea>
      <div className="flex pt-2">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4">
          Save
        </button>
        <button
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => setReply(false)}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

export { CommentReply };
