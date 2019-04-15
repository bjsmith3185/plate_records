const NCController = require("../controllers/ncRecordsController");
const SCController = require("../controllers/scRecordsController");


const tagNC1 = {
  tag: "abc1234",
  state: "nc",
  vehicleMake: "ford",
  vehicleModel: "f150",
  vehicleYear: "1990",
  vehicleColor: "blue",
  owner: "tom petty",
  address: "111 heartbreak ln",
  encounters: []
};

const tagNC2 = {
  tag: "abc1235",
  state: "nc",
  vehicleMake: "chevy",
  vehicleModel: "pickup",
  vehicleYear: "1990",
  vehicleColor: "blue",
  owner: "john petty",
  address: "111 heartbreak ln",
  encounters: []
};

const tagSC1 = {
  tag: "abc1234",
  state: "sc",
  vehicleMake: "ford",
  vehicleModel: "f150",
  vehicleYear: "1990",
  vehicleColor: "blue",
  owner: "tom petty",
  address: "111 heartbreak ln",
  encounters: []
};

const tagSC2 = {
  tag: "abc1235",
  state: "sc",
  vehicleMake: "chevy",
  vehicleModel: "pickup",
  vehicleYear: "1990",
  vehicleColor: "blue",
  owner: "john petty",
  address: "111 heartbreak ln",
  encounters: []
};

module.exports = {
  enterTag: function(state, data) {
    return new Promise((resolve, reject) => {
      console.log('in select state route')
      console.log(state)
      console.log(data.tag)

      if (state === 'sc') {
        SCController.create(tagSC1)
        .then(dbresult => { resolve(dbresult) })
        .catch(err => { resolve(err)})
      } else if ( state === 'nc') {
        NCController.create(tagNC1)
        .then(dbresult => { resolve(dbresult) })
        .catch(err => { resolve(err)})
      } else {
        resolve({err: "no state found"})
      }
      
    });
  }
};