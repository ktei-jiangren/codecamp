import React from "react";

class Example extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      o: { a: "a", b: "b" }
    };
  }

  handleUpdateClick = () => {
    this.updateState1();
  };

  // Problematic
  updateState1() {
    const newState = this.state;
    newState.o.a = "A";
    newState.o.b = "B";
    this.setState(newState);
  }

  // Not performant
  updateState2() {
    this.setState({ ...this.state, o: { a: "A", b: "B" } });
  }

  render() {
    console.log("rendering");
    return (
      <div>
        <h1>a: {this.state.o.a}</h1>
        <h1>b: {this.state.o.b}</h1>
        <button onClick={this.handleUpdateClick}>Update</button>
      </div>
    );
  }
}

export default Example;
