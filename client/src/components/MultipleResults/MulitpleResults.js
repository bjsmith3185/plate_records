import React, { Component } from "react";
// Redux
import { connect } from "react-redux";
import "./MultipleResults.css";
import TagList from "../TagList";


class MultipleResults extends Component {
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

  selectTag = (id) => {
    console.log("select this tag " + id)
  }

  render() {
 


    return (
      <div className="multi-result-body">
        <div className="multi-result-title text-center"> Multiple States matches for tag  </div>
        <div className="multi-result-current-search text-center">{this.props.currentSearch.tag}</div>
        <TagList tags={this.props.currentResult} selectTag={this.selectTag} />
        
      </div>
    );
  }
}

// this brings in the state to display on this component
const mapStateToProps = state => {
  console.log(state)
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
)(MultipleResults);
