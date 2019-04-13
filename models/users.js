const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const usersSchema = new Schema({
  name: { type: String },
  userName: { type: String },
  password: { type: String },
  code: { type: String },
  org: { type: String },
  email: { type: String }
});

const Users = mongoose.model("Users", usersSchema);

module.exports = Users;















