import React, { Component } from "react";
// Redux
import { connect } from "react-redux";
import "./Form.css";

const formState = {
  item: '',
  qty: '',
  store: '',
  itemError: '',
  qtyError: '',
  storeError: '',
}

class Form extends Component {
  state = formState;

  componentDidMount() {}



  handleChange = event => {
    const isCheckbox = event.target.type === "checkbox";
    this.setState({
      [event.target.name]: isCheckbox
      ? event.target.checked
      : event.target.value
    })
  }

  submit = event => {
    event.preventDefault();
    const isValid = this.validate();
    if (isValid) {
      let data = {
        item: this.state.item.toLowerCase(),
        store: this.state.store.toLowerCase(),
        qty: this.state.qty
      };
      let user = this.props.userId;
  
      let menu = { showAddItemMenu: false };
  
      this.props.addItem(user, data, menu);
      this.setState(formState)
    }
  };

  validate = () => {
    let itemError = '';
    let qtyError = '';
    let storeError = '';

    if (!this.state.item) {
      itemError = "Please enter an item.";
    }

    if (!this.state.qty) {
      qtyError = "Please enter a quanity.";
    }

    if (!this.state.store) {
      storeError = "Please enter a store.";
    }

    if (itemError || qtyError || storeError) {
      this.setState({
        itemError: itemError,
        qtyError: qtyError,
        storeError: storeError,
      })
      return false
    }

    return true;
  }

  // add = event => {
  //   event.preventDefault();
  //   let data = {
  //     item: this.state.item.toLowerCase(),
  //     store: this.state.store.toLowerCase(),
  //     qty: this.state.qty
  //   };
  //   let user = this.props.userId;

  //   let menu = { showAddItemMenu: false };

  //   this.props.addItem(user, data, menu);
  //   this.setState({
  //     item: "",
  //     store: "",
  //     qty: "",

     
  //   });
  // };

    // onChange = event => {
  //   this.setState({ [event.target.name]: event.target.value });
  //   // this.validationCheck()
  // };

  // validationCheck = () => {
     //   if(!this.state.store === '' && !this.state.item === '') {
  //     this.setState({
  //       isValid: false
  //     })
  //  } 
  // }

  render() {

    const itemDiv = this.state.itemError ? "line-input-red" : "line-input";
    const qtyDiv = this.state.qtyError ? "line-input-red" : "line-input" ;
    const storeDiv = this.state.storeError ? "line-input-red" : "line-input" ; 

    return (
      <div className="form-area">
        <div className="form-title text-center">Add Item to List</div>

        <div className="line-item">
          <label className="line-title">Item</label>
          <input
            className={itemDiv}
            value={this.item}
            name="item"
            onChange={this.handleChange}
            type="text"
            placeholder="Enter Item"
          />
          <div className="form-error">{this.state.itemError}</div>
        </div>

        <div className="line-item">
          <label className="line-title">Qty</label>
          <input
            className={qtyDiv}
            value={this.qty}
            name="qty"
            onChange={this.handleChange}
            type="text"
            placeholder="Qty"
          />
          <div className="form-error" >{this.state.qtyError}</div>
        </div>

        <div className="line-item">
          <label className="line-title">Store</label>
          <input
            className={storeDiv}
            value={this.store}
            name="store"
            onChange={this.handleChange}
            type="text"
            placeholder="Store"
          />
          <div className="form-error">{this.state.storeError}</div>
        </div>

        <div className="form-btn-area text-center">
          <button
            className="text-center form-btn btn btn-info"
            onClick={this.submit}
            // disabled={this.state.isValid}
          >
            Add
          </button>
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
    addItem: (user, data, menu) => {
      dispach({
        type: "ADD_ITEM",
        payload: { user, data, menu }
      });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispachToProps
)(Form);
