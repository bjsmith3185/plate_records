const router = require("express").Router();
const jwt = require("jsonwebtoken");
const check = require("../../middleware/jsonWebToken");
const newTag = require('../../middleware/newTag');
const searchTag = require('../../middleware/tagSearch');
const validateNewTag = require('../../validate/validateNewTag');
const conform = require('../../validate/conformInput')

// Matches with "/api/tag"


// create new record
router.route("/new").post(check.validateToken, (req, res) => {
    console.log("in the create new tag route");

    jwt.verify(req.token, 'secret', (err, authData) => {
      // console.log(authData)

      if(err) {
        res.status(403).json({err: 'token not verified'})
      } else {

        console.log(req.body)
        req.body = conform.conformNewTagData(req.body)
        console.log(req.body)
      // let { errors, isValid } = validateNewTag(req.body);
      // if (!isValid) {
      //   console.log(errors)
      //   return res.status(400).json(errors);
      // }

      // // console.log(req.body)
      // console.log('success')

      //   newTag
      //   .enterTag(req.body.state, req.body)
      //   .then(dbresults => {
      //     res.json(dbresults);
      //   })
      //   .catch(err => {
      //     res.status(403).json({ err: err });
      //   });

        // res.json({
        //   text: "protected search route",
        //   authData: authData
        // });
      }
    })
 });




module.exports = router;



