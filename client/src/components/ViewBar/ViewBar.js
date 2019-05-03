import React, { Component } from "react";
import "./ViewBar.css";
// import history from "../../history/history";

// Redux
import { connect } from "react-redux";

class ViewBar extends Component {
  state = {
    isActive: false
  };

  componentWillMount = () => {
    this.hasDataSaved();
  };

  componentWillReceiveProps = () => {
    this.hasDataSaved();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  switchView = view => {
    // console.log('clicked');
    let newView = {
      viewSearchComponent: false,
      viewResultComponent: false,
      viewEnterDataComponent: false
    };

    if (view === "search") {
      newView.viewSearchComponent = true;
      this.props.switchView(newView);
    } else if (view === "result") {
      newView.viewResultComponent = true;
      this.props.switchView(newView);
    } else if (view === "enterData") {
      newView.viewEnterDataComponent = true;
      this.props.switchView(newView);
    }
  };

  hasDataSaved = () => {
    let searchData = JSON.parse(sessionStorage.getItem("lastResult"));
    // console.log(searchData)
    if (searchData) {
      this.setState({
        isActive: true
      });
    }
  };

  // capitalize = string => {
  //   return string
  //     .toLowerCase()
  //     .split(" ")
  //     .map(s => s.charAt(0).toUpperCase() + s.substring(1))
  //     .join(" ");
  // };

  render() {
    console.log(this.props)
    console.log(this.state)
    return (
      <div className="viewbar-area">
        <div
          onClick={() => this.switchView("search")}
          className="vb-search text-center"
        >
          {this.props.viewSearchComponent ? (
            <div className="viewbar-search-active">Search</div>
          ) : (
            <div className="viewbar-search">Search</div>
          )}
        </div>



        {this.state.isActive ? (
          <div
            onClick={() => this.switchView("result")}
            className="vb-result text-center"
          >
            {this.props.viewResultComponent ? (
              <div className="viewbar-result-active">Results</div>
            ) : (
              <div className="viewbar-result">Results</div>
            )}
          </div>
        ) : (
          <div
            className="vb-result text-center"
          >
            {this.props.viewResultComponent ? (
              <div className="viewbar-result-active">Results</div>
            ) : (
              <div className="viewbar-result">Results</div>
            )}
          </div>
        )}

        {this.state.isActive ? (
          <div
            onClick={() => this.switchView("enterData")}
            className="vb-encounter text-center"
          >
            {this.props.viewEnterDataComponent ? (
              <div className="viewbar-encounter-active">Enter Data</div>
            ) : (
              <div className="viewbar-encounter">Enter Data</div>
            )}
          </div>
        ) : (
          <div
            className="vb-encounter text-center"
          >
            {this.props.viewEnterDataComponent ? (
              <div className="viewbar-encounter-active">Enter Data</div>
            ) : (
              <div className="viewbar-encounter">Enter Data</div>
            )}
          </div>
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
    viewSearchComponent: state.viewSearchComponent,
    viewResultComponent: state.viewResultComponent,
    viewEnterDataComponent: state.viewEnterDataComponent
  };
};

// functions to dispatch actions
const mapDispachToProps = dispach => {
  return {
    switchView: data => {
      dispach({
        type: "SWITCH_VIEW",
        payload: { data }
      });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispachToProps
)(ViewBar);

{
  /* <div className="viewbar-header">
          <span onClick={() => this.switchView("search")} className="search">
            Search
          </span>

          {this.state.isActive ? (
            <span onClick={() => this.switchView("result")} className="results">
              Results
            </span>
          ) : (
            <span className="results-inactive">Results</span>
          )}

          {this.state.isActive ? (
            <span
              onClick={() => this.switchView("enterData")}
              className="results"
            >
              Enter Data
            </span>
          ) : (
            <span className="results-inactive">Enter Data</span>
          )}
        </div> */
}
