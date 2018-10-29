import React from "react";
import ReactDOM from "react-dom";
import * as _ from "lodash";
import PerfExample from "./perf/Fix2";

const posts = _.range(1, 101).map(n => ({ name: `Post ${n}`, likes: n }));
ReactDOM.render(
  <PerfExample posts={posts} />,
  document.getElementById("index")
);
