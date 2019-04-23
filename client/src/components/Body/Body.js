import React, { Component } from "react";
import "./Body.css";

// Redux
// import { connect } from "react-redux";

class Body extends Component {
  state = {
    showSearch: true,
    showResults: false,
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  switchView = () => {
    console.log('clicked')
    console.log(this.state)
    if (this.showSearch) {
      this.setState({
        showSearch: false,
        showResults: true
      })
    } else {
      this.setState({
        showSearch: true,
        showResults: false
      })
    }
  }

  showSearchView = () => {
    console.log("search")
    this.setState({
      showSearch: true,
      showResults: false
    })
  }

  showResultsView = () => {
    console.log("results")
    this.setState({
      showSearch: false,
      showResults: true
    })
  }
    

  render() {
    return (
      <div className="body-area">
      <div className="body-header">
        <span onClick={this.showSearchView} className='search'>Search</span>
        <span onClick={this.showResultsView}  className='results'>Results</span>
      </div>

      {/* { this.state.showSearch && <div className="body-search-area">Search Tag</div>}

      { this.state.showResults && <div className="body-results-area">See Results</div>} */}

      <ul className="nav nav-tabs">
  <li className="active"><a href="#">Home</a></li>
  <li className="dropdown">
    <a className="dropdown-toggle" data-toggle="dropdown" href="#">Menu 1
    <span className="caret"></span></a>
    <ul className="dropdown-menu">
      <li><a href="#">Submenu 1-1</a></li>
      <li><a href="#">Submenu 1-2</a></li>
      <li><a href="#">Submenu 1-3</a></li> 
    </ul>
  </li>
  <li><a href="#">Menu 2</a></li>
  <li><a href="#">Menu 3</a></li>
</ul>
        
      </div>
    );
  }
}




export default Body;
