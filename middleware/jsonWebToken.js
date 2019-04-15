
const jwt = require("jsonwebtoken");

module.exports = {
  createToken: function(data) {
    return new Promise((resolve, reject) => {
      // Sign Token
      jwt.sign(data, "secret", { expiresIn: 99600 }, (err, token) => {
        if (err) {
          return resolve({ error: err });
        }

        resolve({ token: "Bearer " + token });
      });
    });
  },

  validateToken: function(req,res,next) {
    return new Promise((resolve, reject) => {
      // function validateToken(req,res,next) {
        // Get auth header value
        const bearerHeader = req.headers['authorization'];
        // check if bearer is undefined
        if(typeof bearerHeader !== 'undefined') {
          // Split at the space to get token
          const bearer = bearerHeader.split(' ');
          // Get token from array
          const bearerToken = bearer[1];
          // Set the token
          req.token = bearerToken;
          // call Next middleware
          return resolve(next());
    
        } else {
          // Forbidden
          return resolve(res.status(404).json({err: "not allowed"}))
        }
    
      // }


    })
  }

};