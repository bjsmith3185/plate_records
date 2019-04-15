const router = require("express").Router();
const jwt = require("jsonwebtoken");
const check = require("../../middleware/jsonWebToken");
const newTag = require('../../middleware/newTag');
const searchTag = require('../../middleware/tagSearch');

// Matches with "/api/tag"


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




module.exports = router;



