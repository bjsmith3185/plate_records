import React, { Component } from "react";
import "./Home.css";
// Redux
import { connect } from "react-redux";
import Navbar from "../../components/Navbar";
// import Header from "../../components/Header";
// import InfoBar from "../../components/InfoBar";

class HomePage extends Component {
  componentWillMount() {
    // const { history } = this.props;
    // const user_id = localStorage.getItem("userId");
    // this.props.loadAllData(user_id, history);
  }


  render() {
    // console.log(this.props)
    return (
      <div className="home-area">
      <Navbar />
      <h1> Home Page</h1>
    
          {/* <Header />

          {this.props.myStore && <InfoBar />}
  

          {this.props.storeList && <List />} */}

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
