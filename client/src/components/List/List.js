import React, { Component } from "react";
import "./List.css";

// Redux
import { connect } from "react-redux";

class List extends Component {
  state = {
    showEditWindow: false,
    item: "",
    qty: "",
    store: "",

    selectedItem: "",
    selectedQty: "",
    selectedStore: "",
    selected_id: ""
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  delete = item_id => {
    let deleteData = {
      item: item_id,
      user: localStorage.getItem("userId")
    };
    this.props.removeItem(deleteData);
  };

  strike = (id, strikeThru) => {
    if (strikeThru) {
      strikeThru = false;
    } else {
      strikeThru = true;
    }
    this.props.checkOff(id, strikeThru);
  };

  edit = id => {
    let add = false;
    let edit;
    let dropDown = false;

    if (this.props.showEditMenu) {
      edit = false;
    } else {
      edit = true;
    }

    for (var i = 0; i < this.props.storeList.length; i++) {
      if (this.props.storeList[i]._id === id) {
        this.props.setItemToEdit(
          this.props.storeList[i].item,
          this.props.storeList[i].qty,
          this.props.storeList[i].store,
          this.props.storeList[i]._id,
          edit,
          add,
          dropDown
        );
      }
    }
  };

  submitChanges = () => {
    let item, qty, store;

    if (this.state.item === "") {
      item = this.state.selectedItem;
    } else {
      item = this.state.item;
    }
    if (this.state.qty === "") {
      qty = this.state.selectedQty;
    } else {
      qty = this.state.qty;
    }
    if (this.state.store === "") {
      store = this.state.selectedStore;
    } else {
      store = this.state.store;
    }

    let updated = {
      item: item.toLowerCase(),
      qty: qty.toLowerCase(),
      store: store.toLowerCase()
    };

    let userInfo = {
      userId: this.props.userId,
      myStore: this.props.myStore.toLowerCase()
    };

    this.props.updateList(this.state.selected_id, updated, userInfo);
    this.cancelEdit();
    this.setState({
      item: "",
      qty: "",
      store: "",
      showEditWindow: false
    });
  };

  render() {
    const listArea =
      this.props.showEditMenu ||
      this.props.showDropdownMenu ||
      this.props.showAddItemMenu
        ? "list-area-open"
        : "list-area";

    return (
      <div className={listArea}>
        {/* list area displayed either in edit mode or regular */}

        {this.props.editing ? (
          <div>
            {/* beginning of actual list items with edit button  */}
            {this.props.storeList && (
              <div className="item-list-container">
                {this.props.storeList.map((item, i) => (
                  <div className="item" key={i}>
                    <div
                      className="item-container text-left"
                      onClick={() => this.strike(item._id, item.strikeThru)}
                    >
                      <span className="item-name">{item.item}</span>
                      <span className="item-qty">&#40; {item.qty} &#41;</span>
                    </div>

                    <div className="item-btn-container text-right">
                      <div
                        className="item-edit-btn text-cener"
                        onClick={() => this.edit(item._id)}
                      >
                        Edit
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div>
            {/* beginning of actual list items with delete button  */}
            {this.props.storeList && (
              <div className="item-list-container">
                {this.props.storeList.map((item, i) => (
                  <div className="item" key={i}>
                    {item.strikeThru ? (
                      <div
                        className="item-container text-left strike"
                        onClick={() => this.strike(item._id, item.strikeThru)}
                      >
                        <span className="item-name">{item.item}</span>
                        <span className="item-qty">{item.qty}</span>
                      </div>
                    ) : (
                      <div
                        className="item-container text-left"
                        onClick={() => this.strike(item._id, item.strikeThru)}
                      >
                        <span className="item-name">{item.item}</span>
                        <span className="item-qty">&#40; {item.qty} &#41;</span>
                      </div>
                    )}

                    <div className="item-btn-container text-right">
                      <div
                        className="item-delete-btn"
                        onClick={() => this.delete(item._id)}
                      >
                        X
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}

// this brings in the state to display on this component
const mapStateToProps = state => {
  return {
    name: state.name,
    countRemaining: state.countRemaining,
    allList: state.allList,
    storeList: state.storeList,
    storeNames: state.storeNames,
    myStore: state.myStore,
    editing: state.editing,
    userId: state.userId,
    showEditMenu: state.showEditMenu,
    showDropdownMenu: state.showDropdownMenu,
    showAddItemMenu: state.showAddItemMenu
  };
};

const mapDispachToProps = dispach => {
  return {
    setItemToEdit: (
      selectedItem,
      selectedQty,
      selectedStore,
      selected_id,
      showEditMenu,
      showAddItemMenu,
      showDropdownMenu
    ) => {
      dispach({
        type: "SET_UPDATE_ITEM",
        payload: {
          selectedItem,
          selectedQty,
          selectedStore,
          selected_id,
          showEditMenu,
          showAddItemMenu,
          showDropdownMenu
        }
      });
    },

    checkOff: (id, strikeThru) => {
      dispach({ type: "STRIKE_THRU", val: { id: id, strikeThru: strikeThru } });
    },

    removeItem: data => {
      dispach({ type: "DELETE_ITEM", val: data });
    },

    updateList: (id, data, userInfo) => {
      dispach({
        type: "UPDATE_LIST",
        val: { id, payload: { data, userInfo } }
      });
    },

    cancelUpdate: editing => {
      dispach({
        type: "CANCEL_UPDATE",
        payload: { editing }
      });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispachToProps
)(List);
