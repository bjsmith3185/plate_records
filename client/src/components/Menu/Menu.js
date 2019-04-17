import React, { Component } from "react";
// Redux
import { connect } from "react-redux";
import "./Menu.css";

class Menu extends Component {
  state = {
    showStoresList: false
  };

  componentDidMount() {}

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  showStoresArea = () => {
    if (this.state.showStoresList) {
      this.setState({
        showStoresList: false
      });
    } else {
      this.setState({
        showStoresList: true
      });
    }
  };

  selectStore = store => {
    this.props.setStore(store, this.props.userId, false);
    this.setState({
      showStoresList: false
    });
  };

  showEdit = () => {
    let showStatus;
    if (this.props.editing) {
      showStatus = false;
    } else {
      showStatus = true;
    }
    this.props.showEditArea(showStatus);
  };

  signOutUser = () => {
    this.props.signOut(this.props.userId, this.props.history);
  };

  closeDropDown = () => {
    this.props.closeDropDownMenu();
  };

  render() {
    return (
      <div className="menu-area">
        <div onClick={this.showStoresArea} className="menu-link stores-link">
          - Stores
        </div>
        {this.state.showStoresList && (
          <div className="stores-dropdown">
            {this.props.storeNames.map((store, i) => (
              <div
                key={i}
                className="store-listing"
                onClick={() => {
                  this.selectStore(store);
                }}
              >
                {store
                  .toLowerCase()
                  .split(" ")
                  .map(s => s.charAt(0).toUpperCase() + s.substring(1))
                  .join(" ")}
                <span className="store-listing-qty" />
              </div>
            ))}
          </div>
        )}

        <div className="menu-link edit-link" onClick={this.showEdit}>
          - Edit List
        </div>

        <div className="menu-link signout-link" onClick={this.signOutUser}>
          - Signout
        </div>

        <div className="menu-link close-menu-link" onClick={this.closeDropDown}>
          Close Menu
        </div>
      </div>
    );
  }
}

// this brings in the state to display on this component
const mapStateToProps = state => {
  return {
    showDropdownMenu: state.showDropdownMenu,
    showAddItemMenu: state.showAddItemMenu,
    showEditMenu: state.showEditMenu,
    name: state.name,
    countRemaining: state.countRemaining,
    allList: state.allList,
    storeList: state.storeList,
    storeNames: state.storeNames,
    myStore: state.myStore,
    userId: state.userId,
    history: state.history,
    editing: state.editing
  };
};

// functions to dispatch actions
const mapDispachToProps = dispach => {
  return {
    setStore: (myStore, userId, showDropdownMenu) => {
      dispach({
        type: "SET_STORE",
        payload: { myStore, userId, showDropdownMenu }
      });
    },

    signOut: (userId, history) => {
      dispach({
        type: "SIGN_OUT",
        payload: { userId, history }
      });
    },

    closeDropDownMenu: () => {
      dispach({
        type: "SHOW_DROPDOWN_MENU",
        payload: { showDropdownMenu: false }
      });
    },

    showEditArea: showStatus => {
      dispach({
        type: "EDIT",
        payload: { editing: showStatus }
      });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispachToProps
)(Menu);
