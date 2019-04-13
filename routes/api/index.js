const router = require("express").Router();
const usersRoutes = require("./usersRouter");
const systemRoutes = require("./systemRouter");
const recordsRoutes = require("./recordsRouter");

//  routes
router.use("/users", usersRoutes);

router.use("/system", systemRoutes);

router.use("/records", recordsRoutes);

module.exports = router;
