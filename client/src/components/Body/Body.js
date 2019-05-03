import React, { Component } from "react";
import "./Body.css";
import ViewBar from "../../components/ViewBar";
import SearchForm from "../../components/SearchForm";
import DisplayResult from "../../components/DisplayResult";
import NewEncounter from "../../components/NewEncounter";

// Redux
import { connect } from "react-redux";

class Body extends Component {
  // state = {
  //   isActive: false
  // };

  // componentWillMount = () => {
  //   this.hasDataSaved();
  // };

  // componentWillReceiveProps = () => {
  //   this.hasDataSaved();
  // };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  // switchView = view => {
  //   // console.log('clicked');
  //   let newView = {
  //     viewSearchComponent: false,
  //     viewResultComponent: false,
  //     viewEnterDataComponent: false
  //   };

  //   if (view === "search") {
  //     newView.viewSearchComponent = true;
  //     this.props.switchView(newView);
  //   } else if (view === "result") {
  //     newView.viewResultComponent = true;
  //     this.props.switchView(newView);
  //   } else if (view === "enterData") {
  //     newView.viewEnterDataComponent = true;
  //     this.props.switchView(newView);
  //   }
  // };

  // hasDataSaved = () => {
  //   let searchData = JSON.parse(sessionStorage.getItem("lastResult"));
  //   // console.log(searchData)
  //   if (searchData) {
  //     this.setState({
  //       isActive: true
  //     });
  //   }
  // };

  render() {
    // const isActive = this.isActive();

    return (
      <div className="body-area">
        {/* <div className="body-header">
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
        </div> */}

        <ViewBar />

        <div className="body-body">
          {this.props.viewSearchComponent && <SearchForm />}

          {this.props.viewResultComponent && <DisplayResult />}

          {this.props.viewEnterDataComponent && <NewEncounter />}
        </div>
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
    // switchView: data => {
    //   dispach({
    //     type: "SWITCH_VIEW",
    //     payload: { data }
    //   });
    // }
  };
};

export default connect(
  mapStateToProps,
  mapDispachToProps
)(Body);
