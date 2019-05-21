const NCController = require("../controllers/ncRecordsController");
const SCController = require("../controllers/scRecordsController");
const encountersController = require("../controllers/encountersController");

let tempUpdateData = {
  driver: "jason petty",
  location: "100 n tryon st",
  rs: "speeding",
  result: "citation",
  encounterInfo: "88 in 35",
  officer: "5cb4f2840a1df13eb8fe2ef5",
  date: "2019-02-02"
};

let tempUpdateData2 = {
  driver: "tom petty",
  location: "200 n tryon st",
  rs: "speeding",
  result: "warning",
  encounterInfo: "77 in 35",
  officer: "5cb4f2840a1df13eb8fe2ef5",
  date: "2019-02-02"
};

module.exports = {
  encounter: function(tag_id, state, data) {
    return new Promise((resolve, reject) => {
      // insert new encounter to db
      encountersController
        .create(data)
        .then(encountersResults => {
          //  console.log("inserted the new data into encounters")
          //  console.log(encountersResults)
          let encountered_id = {
            $push: {
              encounters: encountersResults._id
            }
          };
          // insert the newly crated _id into the correct tag collection

          switch (state) {
            case "sc":
              {
                SCController.update(tag_id, encountered_id)
                  .then(updated => {
                    // console.log('pushed the new encounter into records collection')

                    // return populated result from the original tag, records collection
                    SCController.findById(tag_id)
                      .then(dbresults => {
                        // console.log('find the records collection to return to user')
                        // console.log(dbresults)
                        resolve(dbresults);
                      })
                      .catch(err => resolve(err));
                  })
                  .catch(err => resolve(err));
              }
              break;

            case "nc":
              {
                NCController.update(tag_id, encountered_id)
                  .then(updated => {
                    // return populated result from the original tag, records collection
                    NCController.findById(tag_id)
                      .then(dbresults => {
                        // console.log('find the records collection to return to user')
                        resolve(dbresults);
                      })
                      .catch(err => resolve(err));
                  })
                  .catch(err => resolve(err));
              }
              break;

            default: {
            }
          }
        })
        .catch(err => resolve(err));
    });
  }
};
