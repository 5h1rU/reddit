/**
 * This component render all the comments
 * Is a recursive component in charge of show the
 * fetched comments and "sync" with local comments
 *
 */

import React from "react";
import { useSaveComment } from "../hooks/comment";
import { CommentReply } from "./comment-reply";
import { Vote } from "./vote";
import TimeAgo from "timeago-react";

function Comment({ comment }: { comment: any }) {
  const [visible, setVisible] = React.useState(true);
  const [reply, setReply] = React.useState(false);
  const { save, localComment } = useSaveComment(comment.id);

  const nestedComments = (nested: any) =>
    (nested || [])
      .filter((comment: any) => comment.kind === "t1")
      .map((comment: any) => (
        <Comment key={comment.data.id} comment={comment.data} />
      ));

  return (
    <ul className="flex-none p-4 pb-0 pr-1 bg-gray-100">
      <li className={`bg-white ${!visible && "h-10 overflow-hidden"} border`}>
        <div className="flex py-2">
          <div className="w-1/12 text-center">
            <Vote id={comment.id} score={comment.score}></Vote>
          </div>
          <div className="w-11/12 text-left">
            <div>
              <button
                className="text-gray-600"
                onClick={() => setVisible(!visible)}
              >
                {visible ? "[-]" : "[+]"}
              </button>
              <a
                className="px-1 text-blue-600 hover:underline"
                href={`https://old.reddit.com/users/${comment.author_fullname}`}
              >
                {comment.author_fullname}
              </a>
              <small>
                <TimeAgo datetime={new Date(comment.created_utc * 1000)} />
              </small>
            </div>
            <div className="py-1">{comment.body}</div>
            <footer>
              {reply ? (
                <CommentReply
                  parentId={comment.parent_id}
                  setReply={setReply}
                  save={save}
                />
              ) : (
                <button
                  className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => setReply(true)}
                >
                  Reply
                </button>
              )}
            </footer>
          </div>
        </div>
        {nestedComments(comment.replies?.data?.children)}
        {localComment ? nestedComments(localComment) : null}
      </li>
    </ul>
  );
}

export { Comment };
