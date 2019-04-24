import React, { Component } from "react";
import "./Body.css";
import SearchForm from "../../components/SearchForm"

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

      { this.state.showSearch && <div className="body-search-area">
           <SearchForm />
           </div>}

      { this.state.showResults && <div className="body-results-area">See Results</div>}

     
        
      </div>
    );
  }
}




export default Body;
