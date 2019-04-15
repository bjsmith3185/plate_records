const recordsController = require("../controllers/recordsController");


module.exports = {
  search: function(tag, state) {
    return new Promise((resolve, reject) => {
      console.log("in search tag function");
      console.log("tag: " + tag)
    
      recordsController
        .findByTag(tag)
        .then(results => {
            console.log('should contain the tag search')
          console.log(results);
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
        console.log("in search many tag function");
        console.log("tag: " + tag)
      
        recordsController
          .findTags(tag)
          .then(results => {
              console.log('should contain all tags that mastch')
            console.log(results);
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
        console.log("in search state then tag");
        console.log("tag: " + tag)
        console.log("state: " + state)
      
        recordsController
          .findByState(state)
          .then(stateResults => {
              console.log('should contain all tags in.. ' + state)
            console.log(stateResults);
            if(stateResults.length === 0) {
                console.log("no matches")
            } else if (stateResults.lenght === 1) {
                console.log("one result")
            } else if ( stateResults.length > 1) {
                console.log('more than 1 result')
                // now search by tag
            }




            //   resolve(results)
          })
          .catch(err => {
            console.log(err);
            resolve(err);
          });
      });
  }
};
