import React, { Component } from "react";
// Redux
import { connect } from "react-redux";
import "./SearchForm.css";

import DemoInfo from "../../components/DemoInfo";

class SearchForm extends Component {
  state = {
    tag: "",
    state: "",
    errorTag: "",
    errorState: ""
  };


  handleChange = event => {
    const isCheckbox = event.target.type === "checkbox";
    this.setState({
      [event.target.name]: isCheckbox
        ? event.target.checked
        : event.target.value
    });
  };

  submit = event => {
    event.preventDefault();
    let newState = "";

    const { isValid } = this.validate({
      tag: this.state.tag,
      state: this.state.state
    });

    if (isValid) {
      // console.log("tag format is valid");

      let newTag = this.state.tag
        .replace(/\s/g, "")
        .trim()
        .toString()
        .toLowerCase();

      if (this.state.state) {
        newState = this.state.state
          .replace(/\s/g, "")
          .trim()
          .toString()
          .toLowerCase();
      }

      this.props.searchTag(newTag, sessionStorage.getItem("token"), newState);
      // why doesnt this work
      this.setState({
        tag: "",
        state: ""
      });
    } else {
      console.log("errors");
      this.setState({
        tag: "",
        state: ""
      });
    }
  };

  validate = data => {
    let errorTag = "";
    let errorState = "";
    let state = "";

    // validate tag
    if (!data.tag) {
      errorTag = "Please enter a tag.";
    } else if (!data.tag.length > 1 || data.tag.length > 9) {
      errorTag = "Tag must be min 1 and max 9 characters";
    }

    // validate state if it exists
    if (data.state) {
      errorState = "State is not valid";
      const stateArray = ["nc", "sc"];

      state = data.state
        .replace(/\s/g, "")
        .trim()
        .toString()
        .toLowerCase();

      for (var i = 0; i < stateArray.length; i++) {
        if (state === stateArray[i]) {
          errorState = "";
        }
      }
    }

    if (errorTag || errorState) {
      this.setState({
        errorTag: errorTag,
        errorState: errorState
      });
      return { isValid: false };
    }
    return { isValid: true };
  };

  render() {
    // console.log(this.props.errors)
    const errorDiv = this.props.errors.tag ? (
      <div className="search-error">{this.props.errors.tag}</div>
    ) : (
      <div className="search-no-error" />
    );

    return (
      <div className="search-body">
        <div className="search-title text-center">
          Enter Vehicle Info to Search
        </div>
        <form className="search-form text-center">
          <div className="input-line">
            <label className="input-title">Tag</label>
            <input
              className="search-input-tag"
              value={this.state.tag}
              name="tag"
              onChange={this.handleChange}
              type="text"
              placeholder="Tag"
            />
            <div className="form-error text-center">{this.state.errorTag}</div>
          </div>

          <div className="input-line">
            <label className="input-title">State</label>
            <input
              className="search-input-state"
              value={this.state.state}
              name="state"
              onChange={this.handleChange}
              type="text"
              placeholder="State"
            />
            <div className="form-error text-center">
              {this.state.errorState}
            </div>
          </div>

          <div className="search-btn-area text-center">
            <button
              className="text-center search-btn btn btn-info"
              onClick={this.submit}
            >
              Search
            </button>
          </div>
        </form>

        <div className="search-error-area text-center">{errorDiv}</div>

        <div className="search-demo-tag-window text-center">
          <DemoInfo />
        </div>
      </div>
    );
  }
}

// this brings in the state to display on this component
const mapStateToProps = state => {
  // console.log(state);
  return {
    currentResult: state.currentResult,
    currentSearch: state.currentSearch,
    errors: state.errors
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
)(SearchForm);
