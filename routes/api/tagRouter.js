const router = require("express").Router();
const jwt = require("jsonwebtoken");
const check = require("../../middleware/jsonWebToken");
const newTag = require("../../middleware/newTag");
const validateNewTag = require("../../validate/validateNewTag");
const conform = require("../../validate/conformInput");

// Matches with "/api/tag"

// create new record
router.route("/new").post((req, res) => {

      req.body = conform.conformNewTagData(req.body);

      let { errors, isValid } = validateNewTag(req.body);
      if (!isValid) {
        console.log(errors);
        return res.status(400).json(errors);
      }

      newTag
        .enterTag(req.body.state, req.body)
        .then(dbresults => {
          res.json(dbresults);
        })
        .catch(err => {
          res.status(403).json({ err: err });
        });
});


// create multiple records
router.route("/new/multi/:state").post((req, res) => {

      let state = req.params.state;

      // req.body = conform.conformNewTagData(req.body);

      // let { errors, isValid } = validateNewTag(req.body);
      // if (!isValid) {
      //   console.log(errors);
      //   return res.status(400).json(errors);
      // }

      // console.log("success");

      newTag
        .enterMultipleTags(state, req.body)
        .then(dbresults => {
          res.json(dbresults);
        })
        .catch(err => {
          res.status(403).json({ err: err });
        });
 
 

});


// router.route("/new").post(check.validateToken, (req, res) => {
//   console.log("in the create new tag route");

//   jwt.verify(req.token, "secret", (err, authData) => {

//     if (err) {
//       res.status(403).json({ err: "token not verified" });
//     } else {
//       req.body = conform.conformNewTagData(req.body);

//       let { errors, isValid } = validateNewTag(req.body);
//       if (!isValid) {
//         console.log(errors);
//         return res.status(400).json(errors);
//       }

//       console.log("success");

//       newTag
//         .enterTag(req.body.state, req.body)
//         .then(dbresults => {
//           res.json(dbresults);
//         })
//         .catch(err => {
//           res.status(403).json({ err: err });
//         });
 
//     }
//   });
// });

module.exports = router;
