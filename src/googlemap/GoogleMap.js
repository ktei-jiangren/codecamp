import React from "react";
import axios from "axios";
import PropTypes from "prop-types";

const API_KEY = "AIzaSyC3WB5pjBflXaJTGaDssugT2YdxIDSC8To";

class GoogleMap extends React.PureComponent {
  componentDidMount() {
    this.updateMap();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.address !== this.props.address) {
      this.updateMap();
    }
  }

  getGeocode() {
    const address = encodeURIComponent(this.props.address);
    const requestUri = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${API_KEY}`;

    return axios.get(requestUri);
  }

  updateMap() {
    const addressToSearch = (this.props.address || "").trim();
    if (!addressToSearch) {
      return;
    }
    this.getGeocode().then(response => {
      const { results } = response.data;
      if (results.length) {
        const {
          geometry: { location }
        } = results[0];
        const latLng = new google.maps.LatLng(location.lat, location.lng);
        this.map = new google.maps.Map(this.mapContainer);
        this.map.setCenter(latLng);
        this.map.setZoom(16);
        this.marker = new google.maps.Marker({
          map: this.map,
          position: latLng
        });
      }
    });
  }

  updateMapContainerRef = ref => {
    this.mapContainer = ref;
  };

  render() {
    return (
      <div
        ref={this.updateMapContainerRef}
        style={{ width: 800, height: 600 }}
      />
    );
  }
}

GoogleMap.propTypes = {
  address: PropTypes.string
};

export default GoogleMap;
