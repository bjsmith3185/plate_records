const router = require("express").Router();
const jwt = require("jsonwebtoken");
const check = require("../../middleware/jsonWebToken");
const newTag = require('../../middleware/newTag');
const searchTag = require('../../middleware/tagSearch');
const validateSearch = require('../../validate/validateSearch');
const conform = require('../../validate/validateOperators')

// Matches with "/api/search"


// // create new record
// router.route("/new").post(check.validateToken, (req, res) => {
//     // console.log("in the post records route");

//     jwt.verify(req.token, 'secret', (err, authData) => {
//       console.log(authData)

      
//       if(err) {
//         res.status(403).json({err: 'token not verified'})
//       } else {
//         newTag
//         .enterTag(req.body.state, req.body)
//         .then(dbresults => {
//           res.json(dbresults);
//         })
//         .catch(err => {
//           res.status(403).json({ err: err });
//         });

//         // res.json({
//         //   text: "protected search route",
//         //   authData: authData
//         // });
//       }
//     })
//  });




// search by tag and state
router.route("/").get(check.validateToken, (req, res) => {
  // console.log("in the search by tag/state  protected route");

  jwt.verify(req.token, "secret", (err, authData) => {
    if (err) {
      res.status(403).json({ err: "token not verified" });
    } else {
      console.log("validating tag search")
      req.body.tag = conform.removeHyphen(req.body.tag);
      
      let { errors, isValid } = validateSearch(req.body);
      if (!isValid) {
        return res.status(400).json(errors);
      }
     
      
      console.log('success')


        // searchTag.searchStateThenTag(req.params.state, req.body.tag)
        // .then(dbresults => {
        //   res.json(dbresults);
        // })
        // .catch(err => {
        //   res.status(403).json({ err: err });
        // });
    }
  });
});


// search by only tag
router.route("/state/all").get(check.validateToken, (req, res) => {
  // console.log("in the search by tag/state  protected route");

  jwt.verify(req.token, "secret", (err, authData) => {
    if (err) {
      res.status(403).json({ err: "token not verified" });
    } else {
        searchTag.searchAllCollections(req.body.tag)
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



