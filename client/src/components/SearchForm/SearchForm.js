import React, { Component } from "react";
// Redux
import { connect } from "react-redux";
import "./SearchForm.css";



class SearchForm extends Component {
  state = {
    tag: '',
    state: '',
    errorTag: '',
    errorState: '',
  }

  componentDidMount() {}



  handleChange = event => {
    const isCheckbox = event.target.type === "checkbox";
    this.setState({
      [event.target.name]: isCheckbox
      ? event.target.checked
      : event.target.value
    })
  }

  // submit = event => {
  //   event.preventDefault();

  //   const {isValid} = this.validate({tag: this.state.tag, state: this.state.state})

  //   if (isValid) {
  //     console.log("everthing is ok")

  //     let newTag = this.state.tag.replace(/\s/g, "").trim().toString().toLowerCase();
  //     let newState = this.state.state.replace(/\s/g, "").trim().toString().toLowerCase();

  //     this.props.searchStateTag(newTag, newState, sessionStorage.getItem("token"))

  //   } else {
  //     console.log("errors")
  //     this.setState({
  //       tag: '',
  //       state: ''
  //     })
  //   }
      
  // };

  submit = event => {
    event.preventDefault();
    let newState = '';

    const {isValid} = this.validate({tag: this.state.tag, state: this.state.state})

    if (isValid) {
      console.log("everthing is ok")

      let newTag = this.state.tag.replace(/\s/g, "").trim().toString().toLowerCase();

      if(this.state.state) {
        newState = this.state.state.replace(/\s/g, "").trim().toString().toLowerCase();
      }
      

      this.props.searchTag(newTag, sessionStorage.getItem("token"), newState)

    } else {
      console.log("errors")
      this.setState({
        tag: '',
        state: ''
      })
    }
      
  };

  validate = (data) => {
    let errorTag = '';
    let errorState = '';
    let state = '';
    
    // validate tag
    if (!data.tag) {
      errorTag = "Please enter a tag.";
    } else if (!data.tag.length > 1 || data.tag.length > 9) {
      errorTag = "Tag must be min 1 and max 9 characters"
    }

    // validate state if it exists
    if (data.state) {
      errorState = "State is not valid"
      const stateArray = ['nc', 'sc'];

      state = data.state.replace(/\s/g, "").trim().toString().toLowerCase();

      for (var i = 0; i < stateArray.length; i++) {
        if(state === stateArray[i]) {
         errorState = '';
        }
      }
    }


    if(errorTag || errorState) {
      this.setState({
        errorTag: errorTag,
        errorState: errorState,
    
      })
      return {isValid: false};
    }
    return {isValid: true};
  }

  // validate = (data) => {
  //   let errorTag = '';
  //   let errorState = '';
  //   let state = '';
    
  //   // validate tag
  //   if (!data.tag) {
  //     errorTag = "Please enter a tag.";
  //   } else if (!data.tag.length > 1 || data.tag.length > 9) {
  //     errorTag = "Tag must be min 1 and max 9 characters"
  //   }

  //   // validate state
  //   if (!data.state) {
  //     errorState = "Please enter a state.";
  //   } else {
  //     errorState = "State is not valid"
  //     const stateArray = ['nc', 'sc'];

  //     state = data.state.replace(/\s/g, "").trim().toString().toLowerCase();

  //     for (var i = 0; i < stateArray.length; i++) {
  //       if(state === stateArray[i]) {
  //        errorState = '';
  //       }
  //     }
  //   }



  //   if(errorTag || errorState) {
  //     this.setState({
  //       errorTag: errorTag,
  //       errorState: errorState,
    
  //     })
  //     return {isValid: false};
  //   }
  //   return {isValid: true};
  // }

    
  render() {

  

    return (
      <div className="search-body">
        <div className="form-title text-center">Enter Tag / State to Search</div>

        <div className="input-line">
          <label className="input-title">Tag</label>
          <input
            className="search-input"
            value={this.tag}
            name="tag"
            onChange={this.handleChange}
            type="text"
            placeholder="Tag"
          />
          <div className="form-error">{this.state.errorTag}</div>
        </div>

        <div className="input-line">
          <label className="input-title">State</label>
          <input
            className="search-input"
            value={this.state.state}
            name="state"
            onChange={this.handleChange}
            type="text"
            placeholder="State"
          />
          <div className="form-error" >{this.state.errorState}</div>
        </div>

        

        <div className="search-btn-area text-center">
          <button
            className="text-center search-btn btn btn-info"
            onClick={this.submit}
            // disabled={this.state.isValid}
          >
            Search
          </button>
        </div>
      </div>
    );
  }
}

// this brings in the state to display on this component
const mapStateToProps = state => {
  return {

  };
};

// functions to dispatch actions
const mapDispachToProps = dispach => {
  return {
    searchStateTag: (tag, state, token) => {
      dispach({
        type: "SEARCH_STATE_TAG",
        payload: { tag, state, token }
      });
    },

    searchTag: (tag, token, state) => {
      dispach({
        type: "SEARCH_TAG",
        payload: { tag, token, state }
      });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispachToProps
)(SearchForm);
