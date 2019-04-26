const router = require("express").Router();
const jwt = require("jsonwebtoken");
const check = require("../../middleware/jsonWebToken");
const newTag = require("../../middleware/newTag");
const search = require("../../middleware/tagSearch");
const validate = require("../../validate/validateSearch");
const conform = require("../../validate/conformInput");

// Matches with "/api/search"


// search by only tag
router.route("/all/:tag").get(check.validateToken, (req, res) => {
  console.log("in the search by ONLY tag  protected route");
  jwt.verify(req.token, "secret", (err, authData) => {
    if (err) {
      res.status(403).json({ err: "token not verified" });
    } else {
      // console.log("validating tag ONLY search");
      let searchData = {
        tag: req.params.tag
      }
      let { errors, isValid } = validate.validateTagOnlySearch(searchData);
      if (!isValid) {
        // console.log("!!!!")
        return res.status(400).json(errors);
      }
     
      searchData = conform.conformTagData(searchData);
      // console.log(searchData)
      search
        .searchAllCollections(searchData.tag)
        .then(dbresults => {
          console.log("what is this")
          console.log(dbresults)
          res.json(dbresults);
        })
        .catch(err => {
          // console.log("????")
          // console.log(err)
          res.status(403).json({ err: err });
        });
    }
  });
});

// search by tag and state
router.route("/:state/:tag").get(check.validateToken, (req, res) => {
  console.log("in the search by tag/state  protected route");

  jwt.verify(req.token, "secret", (err, authData) => {
    if (err) {
      res.status(403).json({ err: "token not verified" });
    } else {
      // console.log("validating state/tag search");
      let searchData ={
        state: req.params.state,
        tag: req.params.tag
      }
      searchData = conform.conformSearchData(searchData);

      let { errors, isValid } = validate.validateStateTagSearch(searchData);
      if (!isValid) {
        return res.status(400).json(errors);
      }

      search
        // .searchStateThenTag(req.body.state, req.body.tag)
        .searchStateThenTag(searchData.state, searchData.tag)
        .then(dbresults => {
          // console.log("see if this is valid")
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
