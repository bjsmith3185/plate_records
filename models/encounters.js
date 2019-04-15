const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const encountersSchema = new Schema({
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
});

const Encounters = mongoose.model("Encounters", encountersSchema);

module.exports = Encounters;
