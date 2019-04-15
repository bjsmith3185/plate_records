const router = require("express").Router();
const jwt = require("jsonwebtoken");
const check = require("../../middleware/jsonWebToken");
const newEncounter = require('../../middleware/newEncounter');


// Matches with "/api/encounters"
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

const recordData1 = {
  tag: "abc1235",
  state: "nc",
  vehicleMake: "chevy",
  vehicleModel: "pickup",
  vehicleYear: "1990",
  vehicleColor: "blue",
  owner: "john petty",
  address: "111 heartbreak ln",
  encounters: [
    {
      driver: "short bird",
      date: "2019-01-01",
      location: "400 hucks rd",
      rs: "no tag",
      result: "warning",
      encounterInfo: "the tag was inside the vehicle",
      officer: "5cb2526f9c9f9b57f4b05228"
    }
  ]
};

// create new encounter
router.route("/new/:id").post(check.validateToken, (req, res) => {
    // console.log("in the post new encounters route");

    jwt.verify(req.token, 'secret', (err, authData) => {
      if (err) {
        res.status(403).json({err: 'token not verified'})
      } else  {
        newEncounter.encounter(req.params.id, req.body)
        .then(dbresults => {
          // console.log("what is here???")
          // console.log(dbresults)
          res.json(dbresults);
        })
        .catch(err => {
          res.status(403).json({ err: err });
        });

        // res.json({
        //   text: "protected search route/ encounters with params",
        //   authData: authData
        // });
      }
    })
 });




module.exports = router;


