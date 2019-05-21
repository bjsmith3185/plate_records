const NCController = require("../controllers/ncRecordsController");
const SCController = require("../controllers/scRecordsController");
const states = require("../controllers/allStates");


function findTag(state, tag) {
  return new Promise((resolve, reject) => {
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

    return new Promise(async(resolve, reject) => {

        let returnData = [];
          for (let i = 0; i < states.all.length; i++) {
              let state = states.all[i];
              let data = await findTag(state, tag)

              if(data.length != 0){
                  returnData.push(data[0]);
              }
          }
    if (returnData.length != 0) {
        resolve(returnData);
    } else {
        resolve({error: {tag: "Tag Not Found" } })
    }

    });
  },

 

  searchStateThenTag: function(state, tag) {
    return new Promise((resolve, reject) => {
      // find out the state
      switch (state) {
        case "sc":
          {
            SCController.findByTag(tag)
              .then(dbresult => {
                if (dbresult.length != 0) {
                  resolve(dbresult);
              } else {
                  resolve({error: {tag: "Tag Not Found" } })
              }
              })
              .catch(err => {
                console.log(err);
                resolve(err);
              });
          }
          break;

        case "nc":
          {

            NCController.findByTag(tag)
              .then(dbresult => {
                if (dbresult.length != 0) {
                  resolve(dbresult);
              } else {
                  resolve({error: {tag: "Tag Not Found" } })
              }
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
