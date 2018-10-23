import React from "react";

export default class CdnjsSearch extends React.Component {
  constructor() {
    super();
    this.state = {
      result: {},
      isLoading: false,
      query: "jquery"
    };
  }

  componentDidMount() {
    this.loadData();
  }

  loadData() {
    const apiUrl = this.constructApiUrl();
    if (!apiUrl) {
      return;
    }
    this.setState({ isLoading: true });
    $.getJSON(apiUrl, data => {
      this.setState({ isLoading: false, result: data });
    });
  }

  constructApiUrl() {
    const query = this.state.query.trim();
    if (!query) {
      return "";
    }
    return `https://api.cdnjs.com/libraries/${encodeURIComponent(query)}`;
  }

  handleSubmit = e => {
    e.preventDefault();
    this.setState({ query: "" });
    this.loadData();
  };

  handleUserInput = e => {
    if (this.searchTimer) {
      clearTimeout(this.searchTimer);
    }
    this.setState({ query: e.target.value.trim() });
    this.searchTimer = setTimeout(() => {
      this.loadData();
    }, 1000);
  };

  render() {
    const { name, filename, version, license, assets = [] } = this.state.result;
    return (
      <div className="container" style={{ margin: "15px auto" }}>
        <form onSubmit={this.handleSubmit}>
          <input value={this.state.query} onChange={this.handleUserInput} />
        </form>
        {this.state.isLoading && (
          <div className="container" style={{ margin: "15px auto" }}>
            <h3>Loading...</h3>
          </div>
        )}
        {!this.state.isLoading &&
          this.state.result && (
            <div>
              <label>Name</label> {name} <br />
              <label>File name</label> {filename} <br />
              <label>Version</label> {version} <br />
              <label>License</label> {license} <br />
              <label>All versions</label>
              <div>
                {assets.map(x => (
                  <div>{x.version}</div>
                ))}
              </div>
            </div>
          )}
      </div>
    );
  }
}
