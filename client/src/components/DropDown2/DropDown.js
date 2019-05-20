import React, { Component } from "react";
import "./DropDown.css";
import history from "../../history/history";

//React-Spring
import { useSpring, animated } from "react-spring";

// Redux
import { connect } from "react-redux";

class DropDown extends Component {
  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  logout = () => {
    this.props.logoutUser(this.props.userId);
    history.push("/");
  };

  toggle = () => {
    let newValue = true;
    if (this.props.showDropDown) {
      newValue = false;
    }
    this.props.toggleMenu(newValue);
  };

  switchView = view => {
    let newView = {
      viewSearchComponent: false,
      viewResultComponent: false,
      viewEnterDataComponent: false
    };

    if (view === "search") {
      newView.viewSearchComponent = true;
      this.props.switchView(newView);
    } else if (view === "result") {
      newView.viewResultComponent = true;
      this.props.switchView(newView);
    } else if (view === "enterData") {
      newView.viewEnterDataComponent = true;
      this.props.switchView(newView);
    }
  };

  select = view => {
    this.switchView(view);
    this.toggle();
  };

  render() {
    // console.log(this.props)

    const props = useSpring({ opacity: 1, from: { opacity: 0 } });

    return (
      <animated.div style={props}>
        from={{ opacity: 0 }}
        to={{ opacity: 1 }}>
        <div className="dropdown-area">
          <div onClick={this.toggle} className="dropdown-close-btn">
            X
          </div>
          <div onClick={() => this.select("search")} className="dropdown-li">
            Search
          </div>

          <div onClick={() => this.select("result")} className="dropdown-li">
            Results
          </div>

          <div onClick={() => this.select("enterData")} className="dropdown-li">
            Enter Data
          </div>

          <div onClick={this.logout} className="dropdown-logout">
            Logout
          </div>
        </div>
        )}
      </animated.div>
    );
  }
}

// this brings in the state to display on this component
const mapStateToProps = state => {
  // console.log(state);
  return {
    showDropDown: state.showDropDown,

    viewSearchComponent: state.viewSearchComponent,
    viewResultComponent: state.viewResultComponent,
    viewEnterDataComponent: state.viewEnterDataComponent
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
    toggleMenu: value => {
      dispach({
        type: "DROP_DOWN",
        payload: { value }
      });
    },
    switchView: data => {
      dispach({
        type: "SWITCH_VIEW",
        payload: { data }
      });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispachToProps
)(DropDown);
