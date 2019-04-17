import React, { Component } from "react";
import API from "../../utils/API";
import * as ROUTES from "../../constants/routes";

class Populate extends Component {

  addUser = () => {
    API.populateUser()
    .then(result => {
      console.log("user added")
    })
    .catch(error => console.log(error))
  }

  addShopping = () => {
    API.populateShopping()
    .then(result => {
      console.log("shopping item added")
    })
    .catch(error => console.log(error))
  }

  backToApp = () => {
    this.props.history.push(ROUTES.LANDING);
  }


  render() {
    return (
      <div>
        <h1> populate page</h1>

        <br/>
        <br/>
        <div>Add user to database</div>
        <button onClick={this.addUser}>User</button>

        <br/>
        <br/>
        <br/>
        {/* <div>Add shopping item to database</div>
        <button onClick={this.addShopping}>User</button> */}

        <br/>
        <br/>
        <br/>
        <div>Back to the app</div>
        <button onClick={this.backToApp}>Return</button>

      </div>

    );
  }
}

export default Populate;
