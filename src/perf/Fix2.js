import React from "react";
import memoize from "memoize-one";

class PostList extends React.PureComponent {
  render() {
    let complexity = 0;
    const result = (
      <ul>
        {this.props.posts.map(p => {
          complexity++;
          return <li key={p.name}>{p.name}</li>;
        })}
      </ul>
    );
    console.log(complexity);
    return result;
  }
}

class Example extends React.Component {
  constructor() {
    super();
    this.state = {
      searchText: "",
      posts: []
    };
  }

  topTen = memoize(posts =>
    [...posts].sort((a, b) => b.likes - a.likes).slice(0, 10)
  );

  handleSearchTextChange = e => {
    this.setState({ searchText: e.target.value });
  };

  render() {
    return (
      <div>
        <input
          value={this.state.searchText}
          onChange={this.handleSearchTextChange}
        />
        <PostList posts={this.topTen(this.props.posts)} />
      </div>
    );
  }
}

export default Example;
