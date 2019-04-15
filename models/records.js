const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const recordsSchema = new Schema({
  tag: { type: String },
  state: { type: String },
  vehicleMake: { type: String },
  vehicleModel: { type: String },
  vehicleYear: { type: String },
  vehicleColor: { type: String },
  owner: { type: String },
  address: { type: String },
  encounters: [{ type: Schema.Types.ObjectId, ref: "Encounters" }]
});

const Records = mongoose.model("Records", recordsSchema);

module.exports = Records;
