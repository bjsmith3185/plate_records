import React, { Component } from "react";
import "./Home.css";
// Redux
import { connect } from "react-redux";
import Navbar from "../../components/Navbar";
import Body from "../../components/Body";


class HomePage extends Component {
  componentWillMount() {
    // Check session storage for any search data
    this.loadPreviousSearch();
  }

  loadPreviousSearch = () => {
    const data = JSON.parse(sessionStorage.getItem('lastResult'));
    if (data) {
      // Send data to store
      this.props.setLastSearch(data)
    }
  }


  render() {
    // console.log(this.props)
    return (
      <div className="home-area">
      <Navbar />
      
      <Body />
   
      </div>
    );
  }
}

// this brings in the state to display on this component
const mapStateToProps = state => {
  // console.log(state)
  return {
 
  };
};

const mapDispachToProps = dispach => {
  return {
    setLastSearch: (data) => {
      dispach({ type: "PREV_RESULT", payload: { data }})
    }

  };
};

export default connect(
  mapStateToProps,
  mapDispachToProps
)(HomePage);
