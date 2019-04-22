import React, { Component } from "react";

// Redux
import { connect } from "react-redux";

export default function(ComposedComponent) {

    class WithAuth extends Component {
        componentWillMount() {
         if(this.props.isAuthenicated === false) {
            // console.log("isAuthenicated is false")

            // check to see if user _id is in session storage
            if(sessionStorage.getItem("userId")) {
                // console.log('here is the user id')
                // console.log(sessionStorage.getItem('userId'))
                // api request to get users info
                this.props.loginUser(sessionStorage.getItem("userId"))
            } else {
                this.props.history.push('/')
            }
           
         } 
        }

        componentWillReceiveProps(nextProps) {
            // console.log(nextProps)
            if(nextProps.isAuthenicated === undefined) {
                console.log("isAuth is undefined")
                this.props.history.push('/')
            }
        
        }

            
      
        render() {
          return (
            <ComposedComponent {...this.props} />
          );
        }
      }

      const mapStateToProps = state => {
        return {
            // userId: state.userId,
            isAuthenicated: state.isAuthenicated,
           
        };
};

const mapDispachToProps = dispach => {
    return {
        loginUser: (userId) => {
            dispach({ type: "CHECK_USERID", payload: { userId }})
        }
    };
  };

      return connect(mapStateToProps,mapDispachToProps)(WithAuth);
}


