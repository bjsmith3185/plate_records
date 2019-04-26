const NCController = require("../controllers/ncRecordsController");
const SCController = require("../controllers/scRecordsController");
const states = require("../controllers/allStates");


function findTag(state, tag) {
  return new Promise((resolve, reject) => {
    // console.log("!!!!!!!!!!!!!!!!!!1111")
    // console.log(state)
    state.findByTag(tag)
    .then(dbresult => {
      if(dbresult) {
        resolve(dbresult);
      } else {
        resolve(null)
      }
    })
    .catch(err => resolve(err))
  })
};



module.exports = {

  // search all collections for tag
  searchAllCollections: function(tag) {
    // console.log("i made it: " + tag);
    // console.log(states)
    return new Promise(async(resolve, reject) => {

      try {
        let returnData = [];
        // console.log("!!!!!")
          for (let i = 0; i < states.all.length; i++) {
              let state = states.all[i];
              let data = await findTag(state, tag)
              // console.log("below this")
              // console.log(data);
              if(data.length != 0){
                  returnData.push(data[0]);
              }
          }
      // console.log('finished searching all collections')
    if (returnData.length != 0) {
        // console.log("the results are");
        // console.log(returnData);
        resolve(returnData);
    } else {
        // console.log("tag not found")
        resolve({error: {tag: "tag not found" } })
    }
      } catch (error) {
        return reject(error);
      }

     
      
    });
  },

 

  searchStateThenTag: function(state, tag) {
    return new Promise((resolve, reject) => {
      // find out the state
      switch (state) {
        case "sc":
          {
            console.log("in the sc database");
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
            console.log("in the nc database");
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
