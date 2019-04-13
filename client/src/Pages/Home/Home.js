import React, { Component } from "react";
import Nav from "../../components/Nav";
import API from "../../utils/API";
import "./Home.css";

class Home extends Component {

  state = {
    allData: [],
  
  };


  componentDidMount = () => {
    this.allNames();
  };

  allNames = () => {

    API.getNames()
      .then(res => {
        this.setState({
          allData: res.data
        })
      })
      .catch(err => console.log(err));
  };


  render() {
    return (
      <div>
        <Nav />
        <br />
        <div className="admin-header">
          <h1 className="home-h1">Welcome to MERN Template</h1>
        </div>
      </div>
    );
  }
}

export default Home;
