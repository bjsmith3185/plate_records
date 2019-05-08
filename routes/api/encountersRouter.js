const router = require("express").Router();
const jwt = require("jsonwebtoken");
const check = require("../../middleware/jsonWebToken");
const newEncounter = require("../../middleware/newEncounter");
const conform = require("../../validate/conformInput");
const validateEncounter = require("../../validate/validateEncounter");
const encountersController = require("../../controllers/encountersController");

// Matches with "/api/encounter"


// create new encounter
router.route("/new/:id/:state").post(check.validateToken, (req, res) => {
  // console.log("in the post new encounters route");

  jwt.verify(req.token, "secret", (err, authData) => {
    if (err) {
      res.status(403).json({ err: "token not verified" });
    } else {

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
          res.json(dbresults);
        })
        .catch(err => {
          res.status(403).json({ err: err });
        });
    }
  });
});

// clear all encounters (primarily for testing, not proetected )
router.route("/delete/all").delete((req, res) => {
    
      encountersController.removeAll()
         .then(dbresults => {
          res.json(dbresults);
        })
        .catch(err => {
          res.status(403).json({ err: err });
        });
});

module.exports = router;
