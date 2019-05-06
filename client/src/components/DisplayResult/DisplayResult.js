import React, { Component } from "react";
// Redux
import { connect } from "react-redux";
import "./DisplayResult.css";
import SingleResult from "../SingleResult";
import MultipleResults from "../MultipleResults";


class DisplayResult extends Component {

  render() {
 
  return (
      <div className="result-area">

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
    multipleMatches: state.multipleMatches,
  };
};

// functions to dispatch actions
const mapDispachToProps = dispach => {
  return {
  };
};

export default connect(
  mapStateToProps,
  mapDispachToProps
)(DisplayResult);
