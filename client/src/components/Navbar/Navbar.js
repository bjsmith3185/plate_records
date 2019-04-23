import React, { Component } from "react";
import "./Navbar.css";
import history from '../../history/history'

// Redux
import { connect } from "react-redux";

class Navbar extends Component {


  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  logout = () => {
    this.props.logoutUser(this.props.userId)
    history.push("/")
  }
  

  render() {
  
    // console.log(this.props)
    return (
      <div className='logout-area'>
        <button onClick={this.logout}>Logout</button>
      </div>
    );
  }
}

// this brings in the state to display on this component
const mapStateToProps = state => {
  // console.log(state)
  return {
    userId: state.userId

  };
};

const mapDispachToProps = dispach => {
  return {
    logoutUser: (userId) => {
   
      dispach({
        type: "LOG_OUT",
        payload: { userId }
      });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispachToProps
)(Navbar);
