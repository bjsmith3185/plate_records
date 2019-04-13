const router = require("express").Router();
const jwt = require("jsonwebtoken");
const check = require('../../middleware/jsonWebToken')


// Matches with "/api/system"

router
  .route("/")
  .post(check.validateToken, (req, res) => {
    console.log("in the search/main route");

    jwt.verify(req.token, 'secret', (err, authData) => {
      if(err) {
        res.status(403).json({err: 'token not verified'})
      } else {
        res.json({
          text: "protected search route",
          authData: authData
        });
      }
    })
  });


module.exports = router;





