const usersController = require("../controllers/usersController");
const bcrypt = require("bcrypt");

module.exports = {
  hashPasswordThenSave: function(data) {
    return new Promise((resolve, reject) => {
        // create salt
      bcrypt.genSalt(10, function(err, salt) {
        if (err) {
          console.log("error generating salt");
          resolve(err);
        }
        // create hashedpassword using salt
        bcrypt.hash(data.password, salt, function(err, hashedPassword) {
          if (err) {
            console.log("error generating hash/salt");
            resolve(err);
          }
          // update data with hashed password
          const newUser = {
            name: data.name,
            password: hashedPassword
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

  comparePasswords: function () {
    return new Promise((resolve, reject) => {



    })
  }

};
