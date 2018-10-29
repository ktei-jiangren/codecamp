import React from "react";

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

  componentWillMount() {
    this.setTopTenPosts(this.props.posts);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.posts !== nextProps.posts) {
      this.setTopTenPosts(nextProps);
    }
  }

  setTopTenPosts(posts) {
    this.setState({
      topTen: [...posts].sort((a, b) => b.likes - a.likes).slice(0, 10)
    });
  }

  handleSearchTextChange = e => {
    this.setState({ searchText: e.target.value });
  };

  render() {
    // const { posts } = this.props;
    // const topTen = [...posts].sort((a, b) => b.likes - a.likes).slice(0, 10);
    return (
      <div>
        <input
          value={this.state.searchText}
          onChange={this.handleSearchTextChange}
        />
        <PostList posts={this.state.topTen} />
      </div>
    );
  }
}

export default Example;
