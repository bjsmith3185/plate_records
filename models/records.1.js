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
  encounters: [
    {
      driver: { type: String },
      date: { type: Date },
      location: { type: String },
      rs: { type: String },
      result: { type: String },
      encounterInfo: { type: String },
      officer: {
        type: Schema.Types.ObjectId,
        ref: "Users"
      }
    }
  ]
});

const Records = mongoose.model("Records", recordsSchema);

module.exports = Records;
