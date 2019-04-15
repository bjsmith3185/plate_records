const recordsController = require("../controllers/recordsController");

let tempUpdateData = {
  $push: {
    encounters: {
      driver: "jason petty",
      location: "100 n tryon st",
      rs: "speeding",
      result: "citation",
      encounterInfo: "88 in 35",
      officer: "5cb2526f9c9f9b57f4b05228",
      date: "2019-02-02"
    }
  }
};

module.exports = {
  updateRecord: function(data) {
    return new Promise((resolve, reject) => {
      console.log("in update Record function");
    
      recordsController
        .update({ _id: "5cb252de46e0eb386cdee1f3" }, tempUpdateData)
        .then(results => {
          console.log(results);
          recordsController
            .findOne({ _id: results._id })
            .then(updatedResult => {
              resolve(updatedResult);
            })
            .catch(err => {
              console.log(err);
              resolve(err);
            });
        })
        .catch(err => {
          console.log(err);
          resolve(err);
        });
    });
  }
};
