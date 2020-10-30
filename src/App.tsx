import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { CommentContextProvider } from "./context/comment-context";
import { PostContextProvider } from "./context/post-context";
import Post from "./screens/post";
import Posts from "./screens/posts";

function App() {
  return (
    <div className="App" data-testId="app-root">
      <PostContextProvider>
        <CommentContextProvider>
          <Router>
            <Route exact path="/">
              <Posts />
            </Route>
            <Route path="/post/:permalink">
              <Post />
            </Route>
          </Router>
        </CommentContextProvider>
      </PostContextProvider>
    </div>
  );
}

export default App;
