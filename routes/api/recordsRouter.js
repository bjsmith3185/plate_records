const router = require("express").Router();
const jwt = require("jsonwebtoken");
const check = require("../../middleware/jsonWebToken");
const records = require("../../controllers/recordsController");

// Matches with "/api/records"

// router
//   .route("/")
//   // .post(check.validateToken, (req, res) => {
//     console.log("in the post records route");

//     jwt.verify(req.token, 'secret', (err, authData) => {
//       if(err) {
//         res.status(403).json({err: 'token not verified'})
//       } else {
//         res.json({
//           text: "protected search route",
//           authData: authData
//         });
//       }
//     })
//   });

const recordData = {
  tag: "abc1234",
  state: "nc",
  vehicleMake: "ford",
  vehicleModel: "f150",
  vehicleYear: "1990",
  vehicleColor: "blue",
  owner: "tom petty",
  address: "111 heartbreak ln",
  encounters: [
    {
      driver: "tall bird",
      date: "2019-01-01",
      location: "200 hucks rd",
      rs: "no tag",
      result: "warning",
      encounterInfo: "the tag was inside the vehicle",
      officer: "5cb2526f9c9f9b57f4b05228"
    }
  ]
};

router.route("/").post((req, res) => {
  console.log("in the post records route");
  records
    .create(recordData)
    .then(dbresults => {
      res.json(dbresults);
    })
    .catch(err => {
      res.status(403).json({ err: err });
    });
});

// router
// .route("/")
//   .get((req, res) => {
//   console.log("in the get all records route");
//     records.findAll()
//     .then(dbresults => {

//       res.json(dbresults)
//     })
//     .catch(err => {
//       res.status(403).json({err: err})
//     })

// });

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

module.exports = router;
