const router = require("express").Router();
const jwt = require("jsonwebtoken");
const check = require('../../middleware/jsonWebToken')
const login = require("../../middleware/login");
const hash = require("../../middleware/bcrypt");
const Users = require("../../controllers/usersController");
const validate = require("../../validate/validateLogin");
const validateRegister = require("../../validate/validateRegister");

// Matches with "/api/users"

// get all users route
router.route("/all").get((req, res) => {
  // console.log("in the find all route");
  Users.findAll()
    .then(dbresults => {
      res.json(dbresults);
    })
    .catch(err => res.status(422).json(err));
});

// create new user route
router.route("/new").post((req, res) => {
  // console.log("in the create user route");
  // check input thru validator
  let { errors, isValid } = validate.validateLogin(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  // if data is valid continue

  hash
    .hashPasswordThenSave(req.body)
    .then(dbresults => res.json(dbresults))
    .catch(err => res.status(422).json(err));
});

// login in route
router.route("/login").post((req, res) => {
  // console.log("in login route");
  // check input thru validator

  let { errors, isValid } = validate.validateLogin(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  // if data is valid continue
  login
    .login(req.body)
    .then(dbresults => {
      res.json(dbresults);
    })
    .catch(err => res.status(422).json(err));
});

// login in route with user_id
router.route("/login/:id").post((req, res) => {
  // console.log("in login route, user id: " + req.params.id);
  // check input thru validator

  let { errors, isValid } = validate.validateUserId(req.params.id);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  // if data is valid continue
  login
    .loginWithUserId(req.params.id)
    .then(dbresults => {
      res.json(dbresults);
    })
    .catch(err => res.status(422).json(err));
});

// // log out user
// router.route("/logout/:id").post((req, res) => {
//   // console.log("in login route, user id: " + req.params.id);
//   // check input thru validator

//   // let { errors, isValid } = validate.validateUserId(req.params.id);
//   // if (!isValid) {
//   //   return res.status(400).json(errors);
//   // }
//   // if data is valid continue
//   login
//     .loginWithUserId(req.params.id)
//     .then(dbresults => {
//       res.json(dbresults);
//     })
//     .catch(err => res.status(422).json(err));
// });

// delete user route
router
  .route("/delete/:id")
  .delete(check.validateToken, (req, res) => {

    jwt.verify(req.token, 'secret', (err, authData) => {
      if(err) {
        res.status(403).json({err: 'token not verified'})
      } else {

          Users.remove(req.params.id)
          .then(dbresult => {
            console.log("user deleted")
            res.json({status: "User was removed from db"})
          })
          .catch(err => {
            console.log(err)
            res.status(404).json(err)
          })
      
      }
    })
  });


module.exports = router;
