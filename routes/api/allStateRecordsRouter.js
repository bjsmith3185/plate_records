const router = require("express").Router();
const jwt = require("jsonwebtoken");
const check = require("../../middleware/jsonWebToken");
const tagSearch = require('../../middleware/tagSearch');
const newTag = require('../../middleware/newTag');
const searchTag = require('../../middleware/tagSearch');

// Matches with "/api/tags"


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
    // console.log("in the post records route");

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




// search by tag and state
router.route("/search").get(check.validateToken, (req, res) => {
  // console.log("in the search by tag/state  protected route");

  jwt.verify(req.token, "secret", (err, authData) => {
    if (err) {
      res.status(403).json({ err: "token not verified" });
    } else {
        searchTag.searchStateThenTag(req.body.tag, req.body.state)
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



