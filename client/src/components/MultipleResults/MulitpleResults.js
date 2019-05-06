import React, { Component } from "react";
// Redux
import { connect } from "react-redux";
import "./MultipleResults.css";
import TagList from "../TagList";


class MultipleResults extends Component {

  handleChange = event => {
    const isCheckbox = event.target.type === "checkbox";
    this.setState({
      [event.target.name]: isCheckbox
        ? event.target.checked
        : event.target.value
    });
  };



  selectTag = (index) => {
    let data = {
      currentResult: this.props.currentResult[index],
      multipleMatches: false,
      currentSearch: {
        tag: this.props.currentSearch.tag,
        tag_id: this.props.currentResult[index]._id,
        state: this.props.currentResult[index].state
      }
    }
     this.props.selectTag(data)
  }

  render() {
    // console.log(this.props)
    return (
      <div className="multi-result-body">
        
         <div className="multi-result-tagbox text-center">
            {this.props.currentSearch.tag}
        </div>

        <div className="multi-result-title text-center">
        <span className="multi-result-qty"> {this.props.currentResult.length} </span>
         Results</div>
     
        <TagList tags={this.props.currentResult} selectTag={this.selectTag} />
        
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
    selectTag: (data) => {
      dispach({
        type: "SELECT_TAG",
        payload: { data }
      });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispachToProps
)(MultipleResults);
