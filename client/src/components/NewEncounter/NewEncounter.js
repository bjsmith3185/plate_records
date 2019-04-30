import React, { Component } from "react";
import "./NewEncounter.css";

// Redux
import { connect } from "react-redux";

class NewEncounter extends Component {
  state = {
    driver: "",
    location: "",
    rs: "",
    result: "",
    encounterInfo: "",
    encounterState: "",
    encounterCity: "",
    // Error data
    driverError: "",
    locationError: "",
    rsError: "",
    resultError: "",
    encounterInfoError: "",
    encounterCityError: "",
    encounterStateError: "",

    // data related to the current vehicle search
    state: "",
    tag_id: "",
    tag: "",

    // search data is in local storage
    tagIsValid: false
  };

 

  componentWillMount = () => {
    this.checkForTagData();
    this.checkSession();
  };

  checkForTagData = () => {
    let storedValue = JSON.parse(sessionStorage.getItem("lastResult"));
    if (storedValue) {
      if (storedValue.search.tag_id) {
        // console.log("tag _id is in session storage")
        this.setState({
          tagIsValid: true,
          tag: storedValue.search.tag,
          state: storedValue.search.state,
          tag_id: storedValue.search.tag_id
        });
      }
    }
  };

  handleChange = event => {
    const isCheckbox = event.target.type === "checkbox";
    this.setState({
      [event.target.name]: isCheckbox
        ? event.target.checked
        : event.target.value
    });
    this.saveToSession();
  };

  saveToSession = () => {
    // console.log("saved")
    let save = {
      driver: this.state.driver,
      location: this.state.location,
      rs: this.state.rs,
      encounterState: this.state.encounterState,
      encounterCity: this.state.encounterCity,
      encounterInfo: this.state.encounterInfo
    };
    sessionStorage.setItem("encounterData", JSON.stringify(save));
  };

  checkSession = () => {
    // console.log("checking")
    let saved = JSON.parse(sessionStorage.getItem("encounterData"));
    // console.log(saved)
    if (saved) {
      this.setState({
        driver: saved.driver,
        location: saved.location,
        rs: saved.rs,
        encounterState: saved.encounterState,
        encounterCity: saved.encounterCity,
        encounterInfo: saved.encounterInfo
      });
    }
  };

  // submit = event => {
  //   event.preventDefault();
  //   console.log(this.state)
  // }

  submit = event => {
    event.preventDefault();
    // console.log("submit")
    const isValid = this.validate();
    if (isValid) {
      let data = {
        encounter: {
          driver: this.state.driver.toLowerCase().trim(),
          location: this.state.location.toLowerCase().trim(),
          rs: this.state.rs.toLowerCase().trim(),
          result: this.state.result.toLowerCase().trim(),
          encounterInfo: this.state.encounterInfo.toLowerCase().trim(),
          encounterCity: this.state.encounterCity.toLowerCase().trim(),
          encounterState: this.state.encounterState.toLowerCase().trim(),
          officer: this.props.userId
        },
        vehicle: {
          state: this.state.state.toLowerCase().trim(),
          tag_id: this.state.tag_id,
          tag: this.state.tag.toLowerCase().trim()
        }
      };
      this.props.sendData(data, this.props.token);
      // clear session related to encounter form
      sessionStorage.removeItem("encounterData");
      // reset state
      this.setState({
        driver: "",
        location: "",
        rs: "",
        result: "",
        encounterInfo: "",
        encounterCity: "",
        encounterState: "",
        // Error data
        driverError: "",
        locationError: "",
        rsError: "",
        resultError: "",
        encounterInfoError: "",
        encounterCityError: "",
        encounterStateError: ""
      });
    }

  
  };

  demo = () => {
    this.setState({
      driver: "bj",
      location: "charlotte",
      rs: "speeding",
      result: "ticket",
      encounterInfo: "sucka was speeding",
      encounterState: "nc",
      encounterCity: "charlotte",
      officer: this.props.userId
    });
  };

  validateStateArray = (inputState) => {
    const stateList = ['nc', 'sc'];

    for (var i = 0; i < stateList.length; i++) {
      if(inputState.toLowerCase() === stateList[i]) {
        return true;
      } else {
        return false;
      }
    }
  }

  validate = () => {


    let driverError = "";
    let locationError = "";
    let rsError = "";
    let resultError = "";
    let encounterInfoError = "";
    let encounterCityError = "";
    let encounterStateError = "";

    if (!this.state.driver) {
      driverError = "Please enter a driver or 'unknown'.";
    }

    if (!this.state.location) {
      locationError = "Please enter a street.";
    }

    if (!this.state.rs) {
      rsError = "Please enter reason for the stop.";
    }

    if (!this.state.result) {
      resultError = "Please enter result for the stop.";
    }

    if (!this.state.encounterInfo) {
      encounterInfoError = "Please enter details about the stop.";
    }

    if (!this.state.encounterCity) {
      encounterCityError = "Please enter a city.";
    }

    if (!this.state.encounterState) {
      encounterStateError = "Please enter a state.";
    } else if(!this.validateStateArray(this.state.encounterState)) {
      encounterStateError = "Please enter a valid state"
    }

    if (
      driverError ||
      locationError ||
      rsError ||
      resultError ||
      encounterInfoError ||
      encounterCityError ||
      encounterStateError
    ) {
      this.setState({
        driverError: driverError,
        locationError: locationError,
        rsError: rsError,
        resultError: resultError,
        encounterInfoError: encounterInfoError,
        encounterCityError: encounterCityError,
        encounterStateError: encounterStateError
      });
      return false;
    }

    return true;
  };

  render() {
    return (
      <div className="newencounter-area">
        {this.state.tagIsValid ? (
          <div>
            <div className="newencounter-title text-center">
              Enter information related to the vehicle stop below
            </div>
            <div onClick={this.demo} className="newencounter-demo text-center">
              Demo Data
            </div>
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
                <label className="line-title">Street</label>
                <input
                  className="stop-input"
                  value={this.state.location}
                  name="location"
                  onChange={this.handleChange}
                  type="text"
                  placeholder="Location"
                />
                <div className="stop-form-error">
                  {this.state.locationError}
                </div>
              </div>

              <div className="line-item">
                <label className="line-title">State</label>
                  <select
                    name="encounterState"
                    onChange={this.handleChange}
                  >
                    <option >Select</option>
                    <option
                      value="nc"
                    >North Carolina</option>
                    <option 
                      value="nc"
                    >South Carolina</option>
                  </select>
               
                <div className="stop-form-error">
                  {this.state.encounterStateError}
                </div>
              </div>

              {/* <div className="line-item">
                <label className="line-title">State</label>
                <input
                  className="stop-input"
                  value={this.state.encounterState}
                  name="encounterState"
                  onChange={this.handleChange}
                  type="text"
                  placeholder="State"
                />
                <div className="stop-form-error">
                  {this.state.encounterStateError}
                </div>
              </div> */}

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
                <div className="stop-form-error">
                  {this.state.encounterCityError}
                </div>
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

                <select
                    name="result"
                    onChange={this.handleChange}
                  >
                    <option >Select</option>
                    <option
                      value="warning"
                    >warning</option>
                    <option 
                      value="citation"
                    >Citation</option>
                    <option 
                      value="arrest"
                    >Arrest</option>
                    <option 
                      value="verbal"
                    >Verbal</option>
                    <option 
                      value="other"
                    >Other</option>
                  </select>


                {/* <input
                  className="stop-input"
                  value={this.state.result}
                  name="result"
                  onChange={this.handleChange}
                  type="text"
                  placeholder="Result of Stop"
                /> */}
                <div className="stop-form-error">{this.state.resultError}</div>
              </div>

              <div className="line-item">
                <label className="line-title">Information about the Stop</label>
                <textarea
                  className="stop-input"
                  value={this.state.encounterInfo}
                  name="encounterInfo"
                  onChange={this.handleChange}
                  type="text"
                  placeholder="Text"
                  rows="3"
                  cols="50"
                />
                <div className="stop-form-error">
                  {this.state.encounterInfoError}
                </div>
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
            <div className="newencounter-notag-area">
              Enter a vehicle tag before proceding
            </div>
          </div>
        )}
      </div>
    );
  }
}

// this brings in the state to display on this component
const mapStateToProps = state => {
  // console.log(state);
  return {
    userId: state.userId,
    token: state.token,
    tag_id: state.currentSearch.tag_id,
    tag: state.currentSearch.tag
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
