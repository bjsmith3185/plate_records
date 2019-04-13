const usersController = require("../controllers/usersController");
const bcrypt = require('../middleware/bcrypt');
const token = require('./jsonWebToken')

module.exports = {
  login: function(data) {
    return new Promise((resolve, reject) => {
        console.log(data)
        let search = {
            userName: data.userName
        }
      usersController
        .findOne(search)
        .then(dbresults => {
            console.log(dbresults)
            bcrypt.comparePasswords(data.password, dbresults[0].password)
            .then(checked => {
                console.log(checked)
                // user can login
              console.log("here")
              console.log(dbresults)
              let payload = {
                userName: dbresults[0].userName,
                _id: dbresults[0]._id
              }

              token.createToken(payload)
              .then(newtoken => {
                resolve(newtoken)
              })
              .catch(err => console.log(err));

            })
            .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
    });
  }
};
