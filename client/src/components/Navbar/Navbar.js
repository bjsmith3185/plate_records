import React, { Component } from "react";
import "./Navbar.css";
import history from "../../history/history";

// Redux
import { connect } from "react-redux";

class Navbar extends Component {
  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  logout = () => {
    this.props.logoutUser(this.props.userId);
    history.push("/");
  };

  capitalize = string => {
    return string
      .toLowerCase()
      .split(" ")
      .map(s => s.charAt(0).toUpperCase() + s.substring(1))
      .join(" ");
  };

  toggle = () => {
    let newValue = true;
    if(this.props.showDropDown) {
      newValue = false;
    } 

    this.props.toggleMenu(newValue);
  }

  render() {
    // console.log(this.props)
    return (
      <div className="navbar-area">
        <div className="navbar-dropdown">
            <button onClick={this.toggle} className="navbar-menu-button btn-default">&#9776;</button>
        </div>

        <div className="navbar-center-div text-center">
          <div className="navbar-appname text-center">Know Your Stop</div>

          <div className="navbar-username text-center">
            {this.capitalize(this.props.name)}
          </div>

          <div className="navbar-userinfo text-center">
            <span className="navbar-org">{this.props.org}</span>
            <span className="navbar-code"># {this.props.code}</span>
          </div>
        </div>

        <div className="navbar-logout-area" onClick={this.logout}>
          <div className="navbar-logout text-center">Logout</div>
        </div>
      </div>
    );
  }
}

// this brings in the state to display on this component
const mapStateToProps = state => {
  // console.log(state);
  return {
    userId: state.userId,
    name: state.name,
    org: state.org.toUpperCase(),
    code: state.code,
    showDropDown: state.showDropDown,
  };
};

const mapDispachToProps = dispach => {
  return {
    logoutUser: userId => {
      dispach({
        type: "LOG_OUT",
        payload: { userId }
      });
    },
    toggleMenu: (value) => {
      dispach({
        type: "DROP_DOWN",
        payload: { value }
      })
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispachToProps
)(Navbar);
