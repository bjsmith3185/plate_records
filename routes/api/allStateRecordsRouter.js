const router = require("express").Router();
const jwt = require("jsonwebtoken");
const check = require("../../middleware/jsonWebToken");
const records = require("../../controllers/recordsController");
const insertRecord = require('../../middleware/insertRecord');
const tagSearch = require('../../middleware/tagSearch');
const newTag = require('../../middleware/newTag');

// Matches with "/api/tags"


// const recordData = {
//   tag: "abc1234",
//   state: "nc",
//   vehicleMake: "ford",
//   vehicleModel: "f150",
//   vehicleYear: "1990",
//   vehicleColor: "blue",
//   owner: "tom petty",
//   address: "111 heartbreak ln",
//   encounters: [
//     {
//       driver: "tall bird",
//       date: "2019-01-01",
//       location: "200 hucks rd",
//       rs: "no tag",
//       result: "warning",
//       encounterInfo: "the tag was inside the vehicle",
//       officer: "5cb2526f9c9f9b57f4b05228"
//     }
//   ]
// };

const recordData = {
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

const recordData1 = {
  tag: "abc1234",
  state: "nc",
  vehicleMake: "chevy",
  vehicleModel: "pickup",
  vehicleYear: "1990",
  vehicleColor: "blue",
  owner: "john petty",
  address: "111 heartbreak ln",
  encounters: []
};

// create new record
router.route("/new").post(check.validateToken, (req, res) => {
    console.log("in the post records route");

    jwt.verify(req.token, 'secret', (err, authData) => {
      console.log(authData)
      if(err) {
        res.status(403).json({err: 'token not verified'})
      } else {
        newTag
        .enterTag(req.body.state, req.body)
        .then(dbresults => {
          res.json(dbresults);
        })
        .catch(err => {
          res.status(403).json({ err: err });
        });

        // res.json({
        //   text: "protected search route",
        //   authData: authData
        // });
      }
    })
 });




// get All records
router.route("/").get(check.validateToken, (req, res) => {
  console.log("in the get records  protected route");

  jwt.verify(req.token, "secret", (err, authData) => {
    if (err) {
      res.status(403).json({ err: "token not verified" });
    } else {
      records
        .findAll()
        .then(dbresults => {
          res.json(dbresults);
        })
        .catch(err => {
          res.status(403).json({ err: err });
        });
    }
  });
});


// //  update record
// router.route("/").put(check.validateToken, (req, res) => {
//   console.log("in the update protected route");

//   jwt.verify(req.token, "secret", (err, authData) => {
//     if (err) {
//       res.status(403).json({ err: "token not verified" });
//     } else {
//      insertRecord.updateRecord()
//      .then(dbresults => {
//        res.json(dbresults)

//      })
//          .catch(err => {
//       res.status(403).json({ err: err });
//     });
//     }
//   });
// });


// get specific tag
router.route("/tag").get(check.validateToken, (req, res) => {
  // console.log("in the get specific tag  protected route");

  jwt.verify(req.token, "secret", (err, authData) => {
    if (err) {
      res.status(403).json({ err: "token not verified" });
    } else {
      tagSearch.searchStateThenTag(req.body.tag, req.body.state)
      .then(result => {
        res.json(result)
      })
        .catch(err => {
          res.status(403).json({ err: err });
        });
    }
  });
});

module.exports = router;





// router.route("/").post((req, res) => {
//   console.log("in the post records route");
//   records
//     .create(recordData)
//     .then(dbresults => {
//       res.json(dbresults);
//     })
//     .catch(err => {
//       res.status(403).json({ err: err });
//     });
// });
