import React, { Component } from "react";
// Redux
import { connect } from "react-redux";
import "./DisplayResult.css";
import Encounters from "../../components/Encounters";

class DisplayResult extends Component {
  state = {};

  componentDidMount() {}

  componentWillReceiveProps(nextProps) {}

  handleChange = event => {
    const isCheckbox = event.target.type === "checkbox";
    this.setState({
      [event.target.name]: isCheckbox
        ? event.target.checked
        : event.target.value
    });
  };

  capitalize = string => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  render() {
    console.log(this.props.currentResult);

    const currentState = this.props.currentSearch.state
      ? this.props.currentSearch.state.toUpperCase()
      : "No State Entered";

    return (
      <div className="result-body">
        <div className="result-title text-center"> Result </div>
        <div className="result-current-search">
          Tag: {this.props.currentSearch.tag} State: {currentState}
        </div>
        <br />
        <div className="result-current-result-area">
          <div className="result-vehicle-info">
            {this.props.currentResult.vehicleYear},{" "}
            {this.capitalize(this.props.currentResult.vehicleMake)},{" "}
            {this.capitalize(this.props.currentResult.vehicleModel)},{" "}
            {this.capitalize(this.props.currentResult.vehicleColor)}
          </div>
        </div>
        <br />
        <div className="result-owner-info">
          Owner: {this.props.currentResult.owner}
          Address: {this.props.currentResult.address}
          State: {this.props.currentResult.state}
        </div>
        <br />

        {this.props.currentResult.encounters.length > 0 ? (
          <div className="result-encounters-area">
            <Encounters encounters={this.props.currentResult.encounters} />
          </div>
        ) : (
          <div className="result-encoutners-none">
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
)(DisplayResult);
