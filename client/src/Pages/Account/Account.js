import React, { Component } from "react";
import { Link } from "react-router-dom";
// import API from "../../utils/API";
import "./Account.css";
import * as ROUTES from "../../constants/routes";

class Account extends Component {
  componentDidMount() {

  }

  // componentWillUnmount() {

  // }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render = () => {
    return (
      <div>
        <h1>Account Page</h1>
        <Link to={ROUTES.HOME}>Sign In</Link>
      </div>
    );
  };
}

export default Account;
