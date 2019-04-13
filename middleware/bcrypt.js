const usersController = require("../controllers/usersController");
const bcrypt = require("bcrypt");

module.exports = {
  hashPasswordThenSave: function(data) {
    return new Promise((resolve, reject) => {
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(data.password, salt, (err, hash) => {
          if (err) {
              console.log('error hashing password')
           resolve(err)
          }
          // update data with hashed password
          const newUser = {
            userName: data.userName,
            password: hash
          };
          // send data to Database
          usersController
            .create(newUser)
            .then(dbresults => {
              resolve(dbresults);
            })
            .catch(err => {
              console.log("error saving to database");
              resolve(err);
            });
        });
      });
    });
  },

  comparePasswords: function(password, hashedPassword) {
    return new Promise((resolve, reject) => {
      bcrypt.compare(password, hashedPassword, (err, isMatch) => {
        if (err) {
          console.log("err matching passwords");
          resolve(err);
        }
        resolve(isMatch);
      });
    });
  }
};
