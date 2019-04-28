import React, { Component } from "react";
import "./NewEncounter.css";

// Redux
import { connect } from "react-redux";

class NewEncounter extends Component {
  state = {
    driver: '',
    location: '',
    rs: '',
    result: '',
    encounterInfo: '',
    encounterState: '',
    encounterCity: '',
    // temp data for development
    state: "nc",
    tag_id: "5cc0e8c513ac8d71d4151f98",

    // search data is in local storage
    tagIsValid: false,


  };

  componentWillMount = () => {
    this.checkForTagData();

  }

  checkForTagData = () => {
    let storedValue = JSON.parse(sessionStorage.getItem('lastResult'));
    if( storedValue ) {
      if (storedValue.search.tag_id) {
        console.log("tag _id is in session storage")
        this.setState({
          tagIsValid: true
        })
      }
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

  submit = event => {
    event.preventDefault();
    console.log("submit")

    let data = {
      encounter: {
      driver: this.state.driver,
      location: this.state.location,
      rs: this.state.rs,
      result: this.state.result,
      encounterInfo: this.state.encounterInfo,
      encounterCity: this.state.encounterCity,
      encounterState: this.state.encounterState,
      officer: this.props.userId,
      },
      vehicle: {
        state: this.state.state,
        tag_id: this.props.tag_id,
      }
      
    }
    this.props.sendData(data, this.props.token);

    this.setState({
      driver: '',
      location: '',
      rs: '',
      result: '',
      encounterInfo: '',
      encounterCity: '',
      encounterState:'',
    })
  }

  demo = () => {
    this.setState({
      driver: "bj",
      location: "charlotte",
      rs: "speeding",
      result: "ticket",
      encounterInfo: "sucka was speeding",
      encounterState: 'nc',
      encounterCity: 'charlotte',
      officer: this.props.userId,
    })
  }

  render() {
    return (
      <div className="newencounter-area">

      {this.state.tagIsValid ? (
        <div>
 <div className="newencounter-title text-center">
          Enter information related to the vehicle stop below
        </div>
        <div onClick={this.demo} className="newencounter-demo text-center">Demo Data</div>
        <form className="newencounter-form-area">
          <div className="line-item">
            <label className="line-title">Driver</label>
            <input
              className="stop-input"
              value={this.state.driver}
              name="driver"
              onChange={this.handleChange}
              type="text"
              placeholder="Driver"
            />
            <div className="stop-form-error">{this.state.driverError}</div>
          </div>

          <div className="line-item">
            <label className="line-title">Location</label>
            <input
              className="stop-input"
              value={this.state.location}
              name="location"
              onChange={this.handleChange}
              type="text"
              placeholder="Location"
            />
            <div className="stop-form-error">{this.state.locationError}</div>
          </div>

          <div className="line-item">
            <label className="line-title">State</label>
            <input
              className="stop-input"
              value={this.state.encounterState}
              name="encounterState"
              onChange={this.handleChange}
              type="text"
              placeholder="State"
            />
            <div className="stop-form-error">{this.state.encounterStateError}</div>
          </div>

          <div className="line-item">
            <label className="line-title">City</label>
            <input
              className="stop-input"
              value={this.state.encounterCity}
              name="encounterCity"
              onChange={this.handleChange}
              type="text"
              placeholder="City"
            />
            <div className="stop-form-error">{this.state.encounterCityError}</div>
          </div>

          <div className="line-item">
            <label className="line-title">Reason for Stop</label>
            <input
              className="stop-input"
              value={this.state.rs}
              name="rs"
              onChange={this.handleChange}
              type="text"
              placeholder="Reason for Stop"
            />
            <div className="stop-form-error">{this.state.rsError}</div>
          </div>

          <div className="line-item">
            <label className="line-title">Result of Stop</label>
            <input
              className="stop-input"
              value={this.state.result}
              name="result"
              onChange={this.handleChange}
              type="text"
              placeholder="Result of Stop"
            />
            <div className="stop-form-error">{this.state.resultError}</div>
          </div>

          <div className="line-item">
            <label className="line-title">Information about the Stop</label>
            <input
              className="stop-input"
              value={this.state.encounterInfo}
              name="encounterInfo"
              onChange={this.handleChange}
              type="text"
              placeholder="Text"
            />
            <div className="stop-form-error">{this.state.encounterInfoError}</div>
          </div>

          

          

          <div className="stop-form-btn-area text-center">
            <button
              className="text-center sto-form-btn btn btn-info"
              onClick={this.submit}
              // disabled={this.state.isValid}
            >
              Submit
            </button>
          </div>
        </form>
          </div>

      ) : (
        <div>
          <div className="newencounter-notag-area">Enter a vehicle tag before proceding</div>
          </div>

      )}




       
      </div>
    );
  }
}

// this brings in the state to display on this component
const mapStateToProps = state => {
  console.log(state);
  return {
    userId: state.userId,
    token: state.token,
    tag_id: state.currentSearch.tag_id,
   
  };
};

// functions to dispatch actions
const mapDispachToProps = dispach => {
  return {
    sendData: (data, token) => {
      dispach({
        type: "STOP_DATA",
        payload: { data, token }
      });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispachToProps
)(NewEncounter);
