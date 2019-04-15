const NCController = require("../controllers/ncRecordsController");
const SCController = require("../controllers/scRecordsController");


module.exports = {
  search: function(tag, state) {
    return new Promise((resolve, reject) => {
      // console.log("in search tag function");
      // console.log("tag: " + tag)
    
      recordsController
        .findByTag(tag)
        .then(results => {
          //   console.log('should contain the tag search')
          // console.log(results);
            resolve(results)
        })
        .catch(err => {
          console.log(err);
          resolve(err);
        });
    });
  },

  allThatMatch: function (tag) {
    return new Promise((resolve, reject) => {
        // console.log("in search many tag function");
        // console.log("tag: " + tag)
      
        recordsController
          .findTags(tag)
          .then(results => {
            //   console.log('should contain all tags that mastch')
            // console.log(results);
            //   resolve(results)
          })
          .catch(err => {
            console.log(err);
            resolve(err);
          });
      });
  },

  searchStateThenTag: function (tag, state) {
    return new Promise((resolve, reject) => {
        // console.log("in search state then tag");
        // console.log("tag: " + tag)
        // console.log("state: " + state)

        // find out the state
        switch(state) {
          case 'sc': {
            // console.log('sc')
            SCController.findByTag(tag)
            .then(dbresult => {
              resolve(dbresult)
            })
            .catch(err => {
              console.log(err);
              resolve(err);
            });
          }
          break;

          case 'nc': {
            // console.log('nc')
            NCController.findByTag(tag)
            .then(dbresult => {
              resolve(dbresult)
            })
            .catch(err => {
              console.log(err);
              resolve(err);
            });
          }
          break;

          default: {
            console.log("no state selected")
          }

        }

      });
  }
};
