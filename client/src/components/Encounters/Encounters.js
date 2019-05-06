import React from "react";
import "./Encounters.css";

import moment from "moment";

function convert(d) {
  let data = moment(d).format("MM-DD-YYYY");
  return data;
}

function capitalize(string) {
  return string
    .toLowerCase()
    .split(" ")
    .map(s => s.charAt(0).toUpperCase() + s.substring(1))
    .join(" ");
}

const Encounters = props => (
  <React.Fragment>
    {props.encounters.map((item, index) => (
      <div key={item._id} className="encounter-occurance">
        <div className="encounter-line text-center">
          <div className="encounter-heading">
            Encounter
            <span className="encounter-index"> {index + 1} </span>
            of
            <span className="encounter-index-total">
              {" "}
              {props.encounters.length}
            </span>
          </div>

          <div className="encounter-date">Date: {convert(item.date)} </div>
        </div>

        <div className="encounter-rs">
          Reason for Stop:
          <span className="encounter-rs-var">{capitalize(item.rs)}</span>
        </div>

        <div className="encounter-result">
          Result from stop:
          <span className="encounter-result-var">
            {capitalize(item.result)}
          </span>
        </div>

        <div className="encounter-line-break text-center" />

        <div className="encounter-operator-area">
          <div className="encounter-driver">
            Driver during stop:
            <span className="encounter-driver-var">
              {capitalize(item.driver)}
            </span>
          </div>

          <div className="encounter-location">
            Address of Stop:
            <span className="encounter-location-var">
              {capitalize(item.location)}
            </span>
          </div>

          <div className="encounter-city">
            City:
            <span className="encounter-city-var">
              {capitalize(item.encounterCity)}
            </span>
          </div>

          <div className="encounter-state">
            State:
            <span className="encounter-state-var">
              {item.encounterState.toUpperCase()}
            </span>{" "}
          </div>
        </div>

        <div className="encounter-line-break text-center" />

        <div className="encounter-notes-area">
          <div className="encounter-info">Comments:</div>
          <div className="encounter-info-var"> {item.encounterInfo} </div>
        </div>

        <div className="encounter-line-break text-center" />

        <div className="encouter-officer-info text-center">
          <div className="encounter-officer-name">
            LEO: {capitalize(item.officer.name)}
          </div>
          <div className="encounter-officer-org">
            Dept: {item.officer.org.toUpperCase()}
          </div>
          <div className="encounter-officer-code">
            Badge#: {item.officer.code}
          </div>
          <div className="encounter-officer-email">
            Email: {item.officer.email}
          </div>
        </div>
      </div>
    ))}
  </React.Fragment>
);

export default Encounters;
