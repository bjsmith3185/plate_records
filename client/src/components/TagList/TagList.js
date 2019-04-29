import React from "react";
import "./TagList.css";

const TagList = props => (
  <div className="tags-area">
    <div className="tags-heading text-center">Results, Select one to continue</div>
    {props.tags.map(item => (
      <div 
      key={item._id} 
      className="tag-occurance"
      onClick={() => props.selectTag(item._id)}>
        <div className="tag-make">Make: {item.vehicleMake} </div>
        <div className="tag-model">Model: {item.vehicleModel} </div>
        <div className="tag-year">Year: {item.vehicleYear} </div>
        <div className="tag-color">Color: {item.vehicleColor} </div>
        <div className="tag-owner">Owner: {item.owner} </div>
        <div className="tag-state">State: {item.state} </div>
        <hr/>
      </div>
    ))}
  </div>
);

export default TagList;
// vehicleMake
// vehicleModel
// vehiclecolor
// vehicleYear
// owner
// state








