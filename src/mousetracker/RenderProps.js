import React from "react";

class RenderProps extends React.Component {
  constructor(props) {
    super(props);
    this.state = { x: 0, y: 0 };
  }

  handleMouseMove = event => {
    this.setState({
      x: event.clientX,
      y: event.clientY
    });
  };

  render() {
    return (
      <div style={{ height: "100%" }} onMouseMove={this.handleMouseMove}>
        <h1>Move the mouse around!</h1>
        {this.props.render(this.state)}
      </div>
    );
  }
}

export default RenderProps;
