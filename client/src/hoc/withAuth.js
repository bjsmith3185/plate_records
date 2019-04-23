import React, { Component } from "react";
import history from '../history/history'
// Redux
import { connect } from "react-redux";

export default function(ComposedComponent) {
  class WithAuth extends Component {
    componentWillMount() {
      if (this.props.isAuthenicated === false) {
        // check to see if user _id is in session storage
        if (sessionStorage.getItem("userId")) {
          // api request to get users info
          this.props.loginUser(sessionStorage.getItem("userId"));
        } else {
          history.push('/')
        }
      }
    }

    componentWillReceiveProps(nextProps) {
      if (nextProps.isAuthenicated === undefined) {
        console.log("isAuth is undefined");
        history.push('/')
      }
    }

    render() {
      return <ComposedComponent {...this.props} />;
    }
  }

  const mapStateToProps = state => {
    return {
      isAuthenicated: state.isAuthenicated
    };
  };

  const mapDispachToProps = dispach => {
    return {
      loginUser: (userId) => {
        dispach({ type: "CHECK_USERID", payload: { userId } });
      }
    };
  };

  return connect(
    mapStateToProps,
    mapDispachToProps
  )(WithAuth);
}
