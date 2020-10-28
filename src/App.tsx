import React from "react";
import News from "./screens/news";
import { BrowserRouter as Router, Route } from "react-router-dom";

import "./styles/App.css";
import Post from "./screens/post";

function App() {
  return (
    <div className="App">
      <Router>
        <Route exact path="/">
          <News />
        </Route>
        <Route path="/post/:permalink">
          <Post />
        </Route>
      </Router>
    </div>
  );
}

export default App;
