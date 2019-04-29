import React, { Component } from "react";
// Redux
import { connect } from "react-redux";
import "./DisplayResult.css";
import SingleResult from "../SingleResult";
import MultipleResults from "../MultipleResults";


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
 
  

    return (
      <div className="result-body">
        <div className="result-title text-center"> Search Results </div>
        {this.props.multipleMatches ? (
          <MultipleResults />
        ) : (
          <SingleResult />
        )}
        
      </div>
    );
  }
}

// this brings in the state to display on this component
const mapStateToProps = state => {
  // console.log(state)
  return {
    currentResult: state.currentResult,
    currentSearch: state.currentSearch,
    multipleMatches: state.multipleMatches,

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
