import React from "react";
import "./TagList.css";

function capitalize (string) {
  return string
    .toLowerCase()
    .split(" ")
    .map(s => s.charAt(0).toUpperCase() + s.substring(1))
    .join(" ");
};

const TagList = props => (
  <div className="tags-area">
    {/* <div className="tags-heading text-center">Results, Select one to continue</div> */}
    {props.tags.map((item, index) => (
      <div 
      key={item._id} 
      className="tag-occurance"
      onClick={() => props.selectTag(index)}>

        <div className="tag-state">State: 
        <span className="tag-state-var"> {item.state.toUpperCase()}</span> 
        </div>

        <div className="tag-make-model-area">
          <div className="tag-make">Make: 
            <span className="tag-make-var"> {capitalize(item.vehicleMake)}</span>
          </div>
          <div className="tag-model">Model: 
            <span className="tag-model-var"> {capitalize(item.vehicleModel)}</span>
          </div>
        </div>
        
        <div className="tag-year">Year: {item.vehicleYear} </div>
        <div className="tag-color">Color: {item.vehicleColor} </div>
        <div className="tag-owner">Owner: {item.owner} </div>
        
        <div className="multi-result-info">(Click to continue)</div>
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








