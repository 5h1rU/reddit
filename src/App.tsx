import React from "react";
import Posts from "./screens/posts";
import { BrowserRouter as Router, Route } from "react-router-dom";

import "./styles/App.css";
import Post from "./screens/post";
import { PostContextProvider } from "./post-context";

function App() {
  return (
    <div className="App">
      <PostContextProvider>
        <Router>
          <Route exact path="/">
            <Posts />
          </Route>
          <Route path="/post/:permalink">
            <Post />
          </Route>
        </Router>
      </PostContextProvider>
    </div>
  );
}

export default App;
