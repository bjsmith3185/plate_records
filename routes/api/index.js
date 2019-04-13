const router = require("express").Router();
const usersRoutes = require("./usersRouter");

//  routes
router.use("/users", usersRoutes);

module.exports = router;
