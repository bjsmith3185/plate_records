const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const scRecordsSchema = new Schema({
  tag: { type: String },
  state: { type: String },
  vehicleMake: { type: String },
  vehicleModel: { type: String },
  vehicleYear: { type: String },
  vehicleColor: { type: String },
  owner: { type: String },
  address: { type: String },
  city: { type: String },
  encounters: [{ type: Schema.Types.ObjectId, ref: "Encounters" }]
});

const SCRecords = mongoose.model("SCRecords", scRecordsSchema);

module.exports = SCRecords;
