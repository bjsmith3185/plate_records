import React from "react";
import "./TagList.css";

function capitalize(string) {
  return string
    .toLowerCase()
    .split(" ")
    .map(s => s.charAt(0).toUpperCase() + s.substring(1))
    .join(" ");
}

const TagList = props => (
  <div className="tag-area">
    {/* <div className="tags-heading text-center">Results, Select one to continue</div> */}
    {props.tags.map((item, index) => (
      <div
        key={item._id}
        className="tag-occurance"
        onClick={() => props.selectTag(index)}
      >
        <div className="tag-state">
          State:
          <span className="tag-state-var"> {item.state.toUpperCase()}</span>
        </div>

        <div className="tag-make-model-area">
          <div className="tag-make">
            Make:
            <span className="tag-make-var">
              {" "}
              {capitalize(item.vehicleMake)}
            </span>
          </div>
          <div className="tag-model">
            Model:
            <span className="tag-model-var">
              {" "}
              {capitalize(item.vehicleModel)}
            </span>
          </div>
        </div>

        <div className="tag-year-color-area">
          <div className="tag-year">
            Year:
            <span className="tag-year-var"> {item.vehicleYear}</span>
          </div>
          <div className="tag-color">
            Color:
            <span className="tag-color-var">
              {" "}
              {capitalize(item.vehicleColor)}
            </span>
          </div>
        </div>

        <div className="tag-owner-area">
          <div className="tag-owner">
            Owner:
            <span className="tag-owner-var"> {capitalize(item.owner)}</span>
          </div>
        </div>

        <div className="multi-result-info text-center">(Click to continue)</div>
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
