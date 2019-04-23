import React, { Component } from "react";
import "./Home.css";
// Redux
import { connect } from "react-redux";
import Navbar from "../../components/Navbar";
import Body from "../../components/Body";


class HomePage extends Component {
  componentWillMount() {

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
    userName: state.userName,
    code: state.code,
    org: state.org,
    name: state.name,
    userId: state.userId,
    isAuthenicated: state.isAuthenicated,
    // history: state.history
    
    // userId: state.userId,
    // allList: state.allList,
    // myStore: state.myStore,
    // editing: state.editing,
    // storeList: state.storeList,
  };
};

const mapDispachToProps = dispach => {
  return {
    // loadAllData: (id, history) => {
    //   dispach({ type: "LOAD_DATA", payload: { id, history } });
    // },

    // setHistory: history => {
    //   dispach({ type: "SET_HISTORY", payload: { history } });
    // }
  };
};

export default connect(
  mapStateToProps,
  mapDispachToProps
)(HomePage);
