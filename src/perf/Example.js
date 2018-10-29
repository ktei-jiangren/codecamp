import React from "react";

function PostList({ posts }) {
  let complexity = 0;
  const result = (
    <ul>
      {posts.map(p => {
        complexity++;
        return <li key={p.name}>{p.name}</li>;
      })}
    </ul>
  );
  console.log(complexity);
  return result;
}

class Example extends React.Component {
  constructor() {
    super();
    this.state = {
      searchText: "",
      posts: []
    };
  }

  handleSearchTextChange = e => {
    this.setState({ searchText: e.target.value });
  };

  render() {
    const { posts } = this.props;
    const topTen = [...posts].sort((a, b) => b.likes - a.likes).slice(0, 10);
    return (
      <div>
        <input
          value={this.state.searchText}
          onChange={this.handleSearchTextChange}
        />
        <PostList posts={topTen} />
      </div>
    );
  }
}

export default Example;
