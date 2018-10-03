import React from "react";
import GoogleMap from "./GoogleMap";
import AddressSearchBox from "./AddressSearchBox";

export default class GoogleMapView extends React.Component {
  constructor() {
    super();
    this.state = { address: "UNSW" };

    this.handleAddressSelected = this.handleAddressSelected.bind(this);
  }

  handleAddressSelected = address => {
    this.setState({ address });
  };

  render() {
    return (
      <div>
        <h3>GoogleMaps Integration</h3>
        <AddressSearchBox onAddressSelected={this.handleAddressSelected} />
        <GoogleMap address={this.state.address} />
      </div>
    );
  }
}
