import React, { Component } from "react";
import "./DemoInfo.css";

// Redux
import { connect } from "react-redux";

class DemoInfo extends Component {
  state = {
    showInfo: true
  };

  toggle = () => {
    this.setState({
      showInfo: !this.state.showInfo
    });
  };

  render() {
    return (
      <div className="demoinfo-area">
        {this.state.showInfo ? (
          <div className="demoinfo-window">
            <div onClick={this.toggle} className="demoinfo-close-btn">
              X
            </div>
            <div className="demoinfo-title text-center">
              Sample tags to use for demo purposes
            </div>

            <div className="demointo-table text-center">
              <div className="demoinfo-tag">
                <div className="demoinfo-li-tag a">abc1234</div>
                <div className="demoinfo-li-tag b">get$</div>
                <div className="demoinfo-li-tag a">twotags</div>
                <div className="demoinfo-li-tag b line">xyz1234</div>
    
                <div className="demoinfo-li-tag a">abc1235</div>
                <div className="demoinfo-li-tag b">lawman</div>
                <div className="demoinfo-li-tag a">twotags</div>
                <div className="demoinfo-li-tag b">1234abc</div>
              </div>

              <div className="demoinfo-state">
                <div className="demoinfo-li-state a">nc</div>
                <div className="demoinfo-li-state b">nc</div>
                <div className="demoinfo-li-state a">nc</div>
                <div className="demoinfo-li-state b line">nc</div>
   
                <div className="demoinfo-li-state a">sc</div>
                <div className="demoinfo-li-state b">sc</div>
                <div className="demoinfo-li-state a">sc</div>
                <div className="demoinfo-li-state b">sc</div>
              </div>
            </div>
          </div>
        ) : (
          <div onClick={this.toggle} className="demoinfo-btn-area text-center">
            <div> Click to see sample tags from database </div>
            <div> &#40; for demo only &#41; </div>
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
  };
};

const mapDispachToProps = dispach => {
  return {
  };
};

export default connect(
  mapStateToProps,
  mapDispachToProps
)(DemoInfo);
