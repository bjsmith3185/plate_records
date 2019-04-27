import React, { Component } from "react";
import "./Body.css";
import SearchForm from "../../components/SearchForm";
import DisplayResult from "../../components/DisplayResult";
import NewEncounter from "../../components/NewEncounter";

// Redux
import { connect } from "react-redux";

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
    console.log(this.props.viewSearchComponent)
    if (this.props.viewSearchComponent) {
      console.log('switch view was true')
      this.props.switchView(false)
      
    } else {
      console.log('switch view was false')
      this.props.switchView(true)
    }
  }

 

  render() {
    return (
      <div className="body-area">
      <div className="body-header">
        <span onClick={this.switchView} className='search'>Search</span>
        <span onClick={this.switchView}  className='results'>Results</span>
        <div className="body-enter-stop">
        Enter Stop Info
        </div>
      </div>

      <NewEncounter />

      {/* {this.props.viewSearchComponent ? (
        <div className="body-search-area">
          <SearchForm />
        </div>
      ) : (
        <div className="body-results-area">
          <DisplayResult />
        </div>
      )} */}

        
      </div>
    );
  }
}

// this brings in the state to display on this component
const mapStateToProps = state => {
  // console.log(state)
  return {
    currentResult: state.currentResult,
    currentSearch: state.currentSearch,
    viewSearchComponent: state.viewSearchComponent,
  };
};

// functions to dispatch actions
const mapDispachToProps = dispach => {
  return {
    switchView: (value) => {
      dispach({
        type: "SWITCH_VIEW",
        payload: { value }
      });
    }
  };
};


export default connect(
  mapStateToProps,
  mapDispachToProps
)(Body);


