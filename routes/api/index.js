const router = require("express").Router();
const usersRoutes = require("./usersRouter");
const systemRoutes = require("./systemRouter");
const recordsRoutes = require("./recordsRouter");
const encountersRoutes = require("./encountersRouter");

//  routes
router.use("/users", usersRoutes);

router.use("/system", systemRoutes);

router.use("/records", recordsRoutes);

router.use("/encounters", encountersRoutes);

module.exports = router;
