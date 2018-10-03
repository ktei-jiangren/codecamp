import React from "react";
import PropTypes from "prop-types";

function mapPredictionToAutocompleteOption(prediction) {
  return {
    value: prediction.place_id,
    label: `${prediction.structured_formatting.main_text} ${
      prediction.structured_formatting.secondary_text
    }`
  };
}

class AddressSearchBox extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      searchTerm: ""
    };
  }

  componentDidMount() {
    $(this.searchBox).autocomplete({
      source: (request, resolve) => {
        const term = (request.term || "").trim();
        if (term.length === 0) {
          resolve([]);
        } else {
          const autoComplete = new google.maps.places.AutocompleteService();
          autoComplete.getPlacePredictions(
            {
              input: term,
              types: ["geocode"],
              componentRestrictions: {
                country: "au"
              }
            },
            predictions => {
              const autocompleteOptions = (predictions || []).map(
                mapPredictionToAutocompleteOption
              );
              resolve(autocompleteOptions);
            }
          );
        }
      },
      minLength: 2,
      select: (event, ui) => {
        event.preventDefault();
        if (this.props.onAddressSelected) {
          this.props.onAddressSelected(ui.item.label);
        }
        this.setState({ searchTerm: ui.item.label });
        return false;
      },
      focus: () => false
    });
  }

  handleSearchTermChange = e => {
    this.setState({ searchTerm: e.target.value });
  };

  updateSearchBoxRef = ref => {
    this.searchBox = ref;
  };

  render() {
    return (
      <div>
        <input
          ref={this.updateSearchBoxRef}
          className="form-control"
          style={{ width: 400 }}
          placeholder="Enter address"
          value={this.state.searchTerm}
          onChange={this.handleSearchTermChange}
        />
      </div>
    );
  }
}

AddressSearchBox.propTypes = {
  onAddressSelected: PropTypes.func
};

export default AddressSearchBox;
