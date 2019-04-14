const router = require("express").Router();
const logic = require("../../middleware/logic");
const login = require("../../middleware/login");
const hash = require("../../middleware/bcrypt");
const Users = require("../../controllers/usersController");
const validateLogin = require("../../validate/validateLogin");



// Matches with "/api/users"

router.route("/")
  .get((req, res) => {
    console.log("in the find all route")
  Users.findAll()
      .then(dbresults => {
        res.json(dbresults)})
      .catch(err => res.status(422).json(err))
  });

  router.route("/new")
  .post((req, res) => {
    console.log("in the create user route")
    // check input thru validator
    let { errors, isValid } = validateLogin(req.body);

    if (!isValid) {
      
      return res.status(400).json(errors)
    }
    // Users.create(req.body)
    hash.hashPasswordThenSave(req.body)
      .then(dbresults => res.json(dbresults))
      .catch(err => res.status(422).json(err))
  });

  router.route("/login")
  .post((req, res) => {
    console.log("in login route")
    login.login(req.body)
    .then(dbresults => {
      res.json(dbresults)})
      .catch(err => res.status(422).json(err))
  });

  // router.route("/")
  // .get((req, res) => {
  //   model.findByCompany(req.params.company)
  //   .then(dbresults => {
  //     res.json(dbresults)})
  //     .catch(err => res.status(422).json(err))
  // });

  // router.route("/:company")
  // .put((req, res) => {
  //   model.update(req.params.company, req.body)
  //     .then(dbresults => res.json(dbresults))
  //     .catch(err => res.status(422).json(err))
  // });

  // router.route("/:company")
  // .delete((req, res) => {
  //   model.remove(req.params.company)
  //     .then(dbresults => res.json(dbresults))
  //     .catch(err => res.status(422).json(err))
  // });

  // router.route("/keywords")
  // .get((req, res) => {
  //   model.findAll()
  //     .then(dbresults => {
  //       res.json(dbresults)})
  //     .catch(err => res.status(422).json(err))
  // });


module.exports = router;





