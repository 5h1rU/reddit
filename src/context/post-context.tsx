/**
 * This context store the local votes data
 * the main goal here is preserve votes status even if
 * the user navigate between screens.
 *
 * Note: This is not a persistent context, the whole data
 * will be wiped each time a refresh happens
 */


import React, { Dispatch } from "react";

interface IState {
  [key: string]: {
    vote: "up" | "down" | "none";
  };
}

interface IContextProps {
  state: IState;
  dispatch: Dispatch<Actions>;
}

export const PostContext = React.createContext({} as IContextProps);

interface INone {
  type: "none";
  payload: {
    id: string;
  };
}

interface IUp {
  type: "up";
  payload: {
    id: string;
  };
}

interface IDown {
  type: "down";
  payload: {
    id: string;
  };
}

export type Actions = IUp | IDown | INone;

export const reducer = (state: IState, action: Actions): IState => {
  switch (action.type) {
    case "up":
      return {
        ...state,
        [action.payload.id]: { vote: "up" },
      };
    case "down":
      return {
        ...state,
        [action.payload.id]: { vote: "down" },
      };
    case "none":
      return {
        ...state,
        [action.payload.id]: { vote: "none" },
      };
  }
};

const initialState: IState = {} as IState;

export const PostContextProvider = ({
  children,
}: {
  children: React.ReactElement;
}) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const value = { state, dispatch };
  return <PostContext.Provider value={value}>{children}</PostContext.Provider>;
};
