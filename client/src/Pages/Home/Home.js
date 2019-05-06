import React, { Component } from "react";
import "./Home.css";
// Redux
import { connect } from "react-redux";
import Navbar from "../../components/Navbar";
import Body from "../../components/Body";
import ViewBar from "../../components/ViewBar";

class HomePage extends Component {
  componentWillMount() {
    // Check session storage for any search data
    this.loadPreviousSearch();
  }

  loadPreviousSearch = () => {
    const savedView = JSON.parse(sessionStorage.getItem("view"));
    const savedData = JSON.parse(sessionStorage.getItem("lastResult"));
    // check for multiple matches below
    const savedMultiResult = JSON.parse(
      sessionStorage.getItem("multipleMatches")
    );
    if (savedView && savedData) {
      // Send data to store
      this.props.setLastSearch(savedData, savedView, savedMultiResult);
    }
  };

  render() {
    // console.log(this.props)
    return (
      <div className="home-area">
        <Navbar />

        <ViewBar />

        <Body />
      </div>
    );
  }
}

// this brings in the state to display on this component
const mapStateToProps = state => {
  // console.log(state)
  return {};
};

const mapDispachToProps = dispach => {
  return {
    setLastSearch: (data, view, multi) => {
      dispach({ type: "PREV_RESULT", payload: { data, view, multi } });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispachToProps
)(HomePage);
