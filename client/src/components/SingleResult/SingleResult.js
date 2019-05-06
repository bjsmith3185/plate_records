import React, { Component } from "react";
// Redux
import { connect } from "react-redux";
import "./SingleResult.css";
import Encounters from "../Encounters";

class SingleResult extends Component {
  state = {};

  handleChange = event => {
    const isCheckbox = event.target.type === "checkbox";
    this.setState({
      [event.target.name]: isCheckbox
        ? event.target.checked
        : event.target.value
    });
  };

  capitalize = string => {
    return string
      .toLowerCase()
      .split(" ")
      .map(s => s.charAt(0).toUpperCase() + s.substring(1))
      .join(" ");
  };

  render() {
    return (
      <div className="result-body">
        <div className="result-title text-center">Vehicle Information </div>

        <div className="single-tagbox text-center">
          {this.props.currentSearch.tag}
        </div>
        <div className="single-tagbox-state text-center">
          {this.props.currentSearch.state.toUpperCase()}
        </div>

        <div className="single-result-area">
          <div className="single-make-model-area">
            <div className="single-make">
              Make:
              <span className="single-make-var">
                {" "}
                {this.capitalize(this.props.currentResult.vehicleMake)}
              </span>
            </div>
            <div className="single-model">
              Model:
              <span className="single-model-var">
                {" "}
                {this.capitalize(this.props.currentResult.vehicleModel)}
              </span>
            </div>
          </div>

          <div className="single-year-color-area">
            <div className="single-year">
              Year:
              <span className="single-year-var">
                {" "}
                {this.props.currentResult.vehicleYear}
              </span>
            </div>
            <div className="single-color">
              Color:
              <span className="single-color-var">
                {" "}
                {this.capitalize(this.props.currentResult.vehicleColor)}
              </span>
            </div>
          </div>

          <div className="single-line-break" />

          <div className="single-owner-area">
            <div className="single-owner">
              Owner:
              <span className="single-owner-var">
                {" "}
                {this.capitalize(this.props.currentResult.owner)}
              </span>
            </div>
            <div className="single-address">
              Address:
              <span className="single-address-var">
                {" "}
                {this.capitalize(this.props.currentResult.address)}
              </span>
            </div>
          </div>

          <div className="single-city-state-area">
            <div className="single-city">
              City:
              <span className="single-city-var">
                {" "}
                {this.capitalize(this.props.currentResult.city)}
              </span>
            </div>
            <div className="single-state">
              State:
              <span className="single-state-var">
                {" "}
                {this.props.currentResult.state.toUpperCase()}
              </span>
            </div>
          </div>
        </div>

        <br />
        {this.props.currentResult.encounters.length > 0 ? (
          <div className="result-encounters-area">
            <div className="result-encounters-qty text-center">
              Number of Encounters with a LEO:
              <span className="result-encounters-qty-var">
                {this.props.currentResult.encounters.length}
              </span>
            </div>
            <Encounters encounters={this.props.currentResult.encounters} />
          </div>
        ) : (
          <div className="result-encoutners-none text-center">
            No vehicle stops recorded
          </div>
        )}
      </div>
    );
  }
}

// this brings in the state to display on this component
const mapStateToProps = state => {
  return {
    currentResult: state.currentResult,
    currentSearch: state.currentSearch
  };
};

// functions to dispatch actions
const mapDispachToProps = dispach => {
  return {
    searchTag: (tag, token, state) => {
      dispach({
        type: "SEARCH_TAG",
        payload: { tag, token, state }
      });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispachToProps
)(SingleResult);
