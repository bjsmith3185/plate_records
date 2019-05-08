import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as ROUTES from "../../constants/routes";
import ncTags from "./ncTagData";
import scTags from "./scTagData";

// Redux
import { connect } from "react-redux";

class Populate extends Component {
  state = {
    name: "",
    userName: "",
    password: "",
    code: "",
    org: "",
    email: ""
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.newUserAdded) {
      this.setState({
        name: "",
        userName: "",
        password: "",
        code: "",
        org: "",
        email: ""
      });
    }
  }

  handleChange = event => {
    const isCheckbox = event.target.type === "checkbox";
    this.setState({
      [event.target.name]: isCheckbox
        ? event.target.checked
        : event.target.value
    });
  };

  addUser = event => {
    event.preventDefault();

    let newUser = {
      name: this.state.name,
      userName: this.state.userName,
      password: this.state.password,
      code: this.state.code,
      org: this.state.org,
      email: this.state.org
    };
    this.props.addNewUser(newUser);
  };

  demoUser = () => {
    this.setState({
      name: "emmett smith",
      userName: "emmettsmith",
      password: "1234",
      code: "007",
      org: "apd",
      email: "e@mail.com"
    });
  };

  addNewRecords = state => {
    let dataArray = [];

    if (state === "sc") {
      dataArray = scTags;
    } else if (state === "nc") {
      dataArray = ncTags;
    }

    this.props.addNewTags(state, dataArray);
  };

  encounters = () => {
    this.props.removeEncounters();
  };

  render() {
    return (
      <div>
        <h1>Populate Page</h1>

        <br />
        <br />
        <div>Add user to database</div>
        <button onClick={this.demoUser}>Demo User</button>
        <br />
        <br />
        <form>
          <label>Name</label>
          <input
            value={this.state.name}
            name="name"
            onChange={this.handleChange}
            placeholder="Name"
          />

          <br />
          <label>User-Name</label>
          <input
            value={this.state.userName}
            name="userName"
            onChange={this.handleChange}
            placeholder="User-Name"
          />
          <br />

          <label>Password</label>
          <input
            value={this.state.password}
            name="password"
            onChange={this.handleChange}
            placeholder="Password"
          />
          <br />

          <label>Badge Number</label>
          <input
            value={this.state.code}
            name="code"
            onChange={this.handleChange}
            placeholder="Badge Number"
          />
          <br />

          <label>Organization</label>
          <input
            value={this.state.org}
            name="org"
            onChange={this.handleChange}
            placeholder="Organization Name"
          />
          <br />

          <label>Email</label>
          <input
            value={this.state.email}
            name="email"
            onChange={this.handleChange}
            placeholder="User's Email"
          />
          <br />

          <button onClick={this.addUser}>Add User</button>
        </form>
        {this.props.newUserAdded && (
          <div className="populate-adduser-info">User Successfully Added</div>
        )}

        <br />
        <br />
        <br />

        <button onClick={() => this.addNewRecords("nc")}>Reset NC Tags</button>

        <br />
        <br />

        <button onClick={() => this.addNewRecords("sc")}>Reset SC Tags</button>

        <br />
        <br />

        {this.props.newTagRecords && (
          <div className="populate-adduser-info">Tag Records Were Reset</div>
        )}

        <br />
        <br />

        <button onClick={this.encounters}>Clear Encounters Data</button>

        <br />
        <br />

        {this.props.encountersCleared && (
          <div className="populate-adduser-info">Encounters Were Reset</div>
        )}

        <br />
        <br />

        <Link to={ROUTES.LANDING}>Back to the App</Link>
      </div>
    );
  }
}

// this brings in the state to display on this component
const mapStateToProps = state => {
  // console.log(state);
  return {
    newUserAdded: state.newUserAdded,
    newTagRecords: state.newTagRecords,
    encountersCleared: state.encountersCleared
  };
};

// functions to dispatch actions
const mapDispachToProps = dispach => {
  return {
    addNewUser: data => {
      dispach({
        type: "ADD_USER",
        payload: { data }
      });
    },
    addNewTags: (state, data) => {
      dispach({
        type: "ADD_TAGS",
        payload: { data, state }
      });
    },
    removeEncounters: () => {
      dispach({
        type: "CLEAR_ENCOUNTERS"
      });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispachToProps
)(Populate);
