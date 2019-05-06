import React, { Component } from "react";
import "./Body.css";
// import ViewBar from "../../components/ViewBar";
import SearchForm from "../../components/SearchForm";
import DisplayResult from "../../components/DisplayResult";
import NewEncounter from "../../components/NewEncounter";

// Redux
import { connect } from "react-redux";

class Body extends Component {


  render() {

    return (
      <div className="body-area">

        <React.Fragment>
          {this.props.viewSearchComponent && <SearchForm />}

          {this.props.viewResultComponent && <DisplayResult />}

          {this.props.viewEnterDataComponent && <NewEncounter />}
        </React.Fragment>
      </div>
    );
  }
}

// this brings in the state to display on this component
const mapStateToProps = state => {
  // console.log(state)
  return {
    viewSearchComponent: state.viewSearchComponent,
    viewResultComponent: state.viewResultComponent,
    viewEnterDataComponent: state.viewEnterDataComponent
  };
};

// functions to dispatch actions
const mapDispachToProps = dispach => {

};

export default connect(
  mapStateToProps,
  mapDispachToProps
)(Body);
