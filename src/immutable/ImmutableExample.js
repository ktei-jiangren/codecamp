import React from "react";
const { Map } = require("immutable");

class Example extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      o: Map({ a: "a", b: "b" })
    };
  }

  handleUpdateClick = () => {
    this.updateState3();
  };

  updateState3() {
    this.setState({ o: this.state.o.set("a", "A").set("b", "B") });
  }

  render() {
    console.log("rendering");
    return (
      <div>
        <h1>a: {this.state.o.get("a")}</h1>
        <h1>b: {this.state.o.get("b")}</h1>
        <button onClick={this.handleUpdateClick}>Update</button>
      </div>
    );
  }
}

export default Example;
