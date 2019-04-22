const usersController = require("../controllers/usersController");
const bcrypt = require("../middleware/bcrypt");
const token = require("./jsonWebToken");

module.exports = {
  login: function(data) {
    return new Promise((resolve, reject) => {
      // console.log(data)
      let search = {
        userName: data.userName
      };
      usersController
        .findOne(search)
        .then(dbresults => {
          // console.log(dbresults);

          // if the user is not found
          if (dbresults.length === 0) {
            console.log("username not found");
            return resolve({ error: 
              { username: "User name is not found" }
            });
          }
          // if the user is found, check password
          else if (dbresults.length >= 1) {
            bcrypt
              .comparePasswords(data.password, dbresults[0].password)
              .then(checked => {
                // console.log(checked);
                //   // user can login
                // console.log("here")
                // console.log(dbresults)

                // if the password does not match
                if (!checked) {
                  console.log("password doesnt match");
                  resolve({ error: 
                    { password: "Password doesn't match" }
                  });
                }
                // if the password does match
                else {
                  let payload = {
                    userName: dbresults[0].userName,
                    _id: dbresults[0]._id,
                            
                  };

                  token
                    .createToken(payload)
                    .then(newtoken => {
                                        
                      resolve({token: newtoken.token, isAuthenicated: checked});
                      // resolve(newtoken);
                    })
                    .catch(err => console.log(err));
                }
              })
              .catch(err => console.log(err));
          }
        })
        .catch(err => console.log(err));
    });
  }
};
