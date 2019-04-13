const mongoose = require("mongoose");

// const bcrypt = require('bcrypt');


const Schema = mongoose.Schema;

const usersSchema = new Schema({
  name: { type: String },
  password: { type: String }
});



// usersSchema.methods.hashPassword = function (password) {
//   bcrypt.genSalt(10, function (err, salt) {
//     if(err) { return console.log(err)}

//     console.log(salt)

//     bcrypt.hash(password, salt, function(err, hashedPassword) {

//       if(err) { return console.log(err) }

//       console.log(hashedPassword)

//     })

//   })
// };



const Users = mongoose.model("Users", usersSchema);

module.exports = Users;















