const router = require("express").Router();
const jwt = require("jsonwebtoken");
const check = require("../../middleware/jsonWebToken");
const newEncounter = require("../../middleware/newEncounter");
const conform = require("../../validate/conformInput");
const validateEncounter = require("../../validate/validateEncounter");

// Matches with "/api/encounter"
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
router.route("/new/:id/:state").post(check.validateToken, (req, res) => {
  // console.log("in the post new encounters route");

  jwt.verify(req.token, "secret", (err, authData) => {
    if (err) {
      res.status(403).json({ err: "token not verified" });
    } else {
      // console.log("in the post new encounters route");
      // console.log(req.params.id);
      // console.log(req.params.state)
      // console.log(req.body)

      let { paramErrors, data } = conform.conformEncounterParams(req.params.id, req.params.state);
      if(paramErrors) {
        console.log(paramErrors)
        return res.status(400).json(paramErrors);
      }
      // console.log("here?")
      // console.log(data)
      req.body = conform.conformNewEncounterData(req.body);

      let { errors, isValid } = validateEncounter(req.body);
      if (!isValid) {
        console.log(errors);
        return res.status(400).json(errors);
      }
    
      newEncounter
        .encounter(data.tag_id, data.tagState, req.body)
        .then(dbresults => {
          // console.log("what is here???")
          // console.log(dbresults)
          res.json(dbresults);
        })
        .catch(err => {
          res.status(403).json({ err: err });
        });
    }
  });
});

module.exports = router;
