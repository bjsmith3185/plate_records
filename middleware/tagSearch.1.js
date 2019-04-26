const NCController = require("../controllers/ncRecordsController");
const SCController = require("../controllers/scRecordsController");

const states = require("../controllers/allStates");

module.exports = {
  search: function(tag, state) {
    return new Promise((resolve, reject) => {
      // console.log("in search tag function");
      // console.log("tag: " + tag)
    });
  },

  // search all collections for tag
  searchAllCollections: function(tag) {
    console.log("i made it: " + tag)

    return new Promise((resolve, reject) => {
      // let returnData = []

      states.all.forEach(state => {
        state.findByTag(tag).then(result => {
          if (result.length > 0) {
            // console.log(result)
            resolve(result);
          }
        });
      });

      // reject ("did nto work")
      // let data = {error: {tag: "No record found"}};
      // return resolve(data);
    });
  },

  searchStateThenTag: function(state, tag) {
    return new Promise((resolve, reject) => {
      // find out the state
      switch (state) {
        case "sc":
          {
            console.log("in the sc database")
            SCController.findByTag(tag)
              .then(dbresult => {
                resolve(dbresult);
              })
              .catch(err => {
                console.log(err);
                resolve(err);
              });
          }
          break;

        case "nc":
          {
            console.log("in the nc database")
            NCController.findByTag(tag)
              .then(dbresult => {
                resolve(dbresult);
              })
              .catch(err => {
                console.log(err);
                resolve(err);
              });
          }
          break;

        default: {
          console.log("no state selected");
        }
      }
    });
  }
};
