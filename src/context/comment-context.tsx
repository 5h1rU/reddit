/**
 * This context store the local comments data
 * the main goal here is preserve comments even if
 * the user navigate between screens.
 *
 * Note: This is not a persistent context, the whole data
 * will be wiped each time a refresh happens
 */

import React, { Dispatch } from "react";

interface IState {
  [key: string]: {
    replies: any[];
  };
}

interface IContextProps {
  state: IState;
  dispatch: Dispatch<Actions>;
}

export const CommentContext = React.createContext({} as IContextProps);

interface ISave {
  type: "save";
  payload: {
    parentId: string;
    body: string;
  };
}

export type Actions = ISave;

export const reducer = (state: IState, action: Actions): IState => {
  switch (action.type) {
    case "save":
      const newComment = {
        kind: "t1",
        data: {
          id: String(new Date()),
          parentId: action.payload.parentId,
          body: action.payload.body,
          score: 0,
          author_fullname: "Felipe",
        },
      };
      if (state[action.payload.parentId]) {
        return {
          ...state,
          [action.payload.parentId]: {
            replies: [...state[action.payload.parentId].replies, newComment],
          },
        };
      } else {
        return {
          ...state,
          [action.payload.parentId]: {
            replies: [newComment],
          },
        };
      }
  }
};

const initialState: IState = {} as IState;

export const CommentContextProvider = ({
  children,
}: {
  children: React.ReactElement;
}) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const value = { state, dispatch };
  return (
    <CommentContext.Provider value={value}>{children}</CommentContext.Provider>
  );
};
