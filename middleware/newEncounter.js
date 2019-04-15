const recordsController = require("../controllers/recordsController");
const encountersController = require("../controllers/encountersController");


let tempUpdateData = {
        driver: "jason petty",
        location: "100 n tryon st",
        rs: "speeding",
        result: "citation",
        encounterInfo: "88 in 35",
        officer: "5cb4dcd8da37f718b0bd94f2",
        date: "2019-02-02"
  };

  let tempUpdateData2 = {
    driver: "tom petty",
    location: "200 n tryon st",
    rs: "speeding",
    result: "warning",
    encounterInfo: "77 in 35",
    officer: "5cb4dcd8da37f718b0bd94f2",
    date: "2019-02-02"
};

module.exports = {
  encounter: function(recordId, data) {
    return new Promise((resolve, reject) => {
      console.log("in newEncounter function");
    //   console.log(recordId)
    //   console.log(data.vehicle)
    
     // insert new encounter to db
     encountersController.create(tempUpdateData)
     .then(encountersResults => {
         console.log("inserted the new data into encounters")
         console.log(encountersResults)
         let encountered_id = {
            $push: {
                encounters: encountersResults._id
            } 
        }
            // insert the newly crated _id into records db

            recordsController.update(recordId, encountered_id)
            .then(updated => {
                    console.log('pushed the new encounter into records collection')
                    
                // return populated result from the original tag, records collection
                recordsController.findById(recordId)
                .then(dbresults => {
                    console.log('find the records collection to return to user')
                    console.log(dbresults)
                    resolve(dbresults)
                })
                .catch((err) => resolve(err))
            })
            .catch((err) => resolve(err))
     })
     .catch((err) => resolve(err))
    });
  }
};
