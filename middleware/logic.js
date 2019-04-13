const usersController = require("../controllers/usersController");

module.exports = {
  doSomething: function() {
    return new Promise((resolve, reject) => {
      usersController
        .findAll()
        .then(dbresults => {
          resolve(dbresults);
        })
        .catch(err => console.log(err));
    });
  }
};
