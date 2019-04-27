import React, { Component } from "react";
import "./StopForm.css";



const StopForm = (props) => (

      <div className="stop-form-area">
        <div className="stop-form-title text-center">Add Item to List</div>

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
 
 )

 export default StopForm;