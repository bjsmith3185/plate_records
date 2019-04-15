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
    return new Promise((resolve, reject) => {
      states.all.forEach(state => {
        state.findByTag(tag).then(result => {
          if (result.length > 0) {
            resolve(result);
          }
        });
      });
    });
  },

  searchStateThenTag: function(state, tag) {
    return new Promise((resolve, reject) => {
      // console.log("in search state then tag");
      // console.log("tag: " + tag)
      // console.log("state: " + state)

      // find out the state
      switch (state) {
        case "sc":
          {
            // console.log('sc')
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
            // console.log('nc')
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
