import React from "react";
import "./Encounters.css";

const Encounters = props => (
  <div className="encounters-area">
    Previous Stop Information
    {props.encounters.map(item => (
      <div key={item._id} className="encounter-occurance">
        <div className="encounter-date">Date of Stop: {item.date} </div>
        <div className="encounter-rs">Reason for Stop: {item.rs} </div>
        <div className="encounter-driver">Driver during stop: {item.driver} </div>
        <div className="encounter-location">Location of stop: {item.location} </div>
        <div className="encounter-result">Result from stop: {item.result} </div>
        <div className="encounter-info">Comments: {item.encounterInfo} </div>
        <hr/>
        <div className="encouter-officer-info">
          <div className="encounter-officer-name">Officer: {item.officer.name}</div>
          <div className="encounter-officer-org">Department: {item.officer.org}</div>
          <div className="encounter-officer-code">Badge#: {item.officer.code}</div>
          <div className="encounter-officer-name">Email: {item.officer.email}</div>
        </div>
      </div>
    ))}
  </div>
);

export default Encounters;
// date
// driver
// encounterInfo 
// location 
// result 
// rs 

//------
// officer.code
// officer. email
// officer.name
// officer.org




