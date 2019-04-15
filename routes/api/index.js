const router = require("express").Router();
const usersRoutes = require("./usersRouter");
const systemRoutes = require("./systemRouter");
const encountersRoutes = require("./encountersRouter");
const tagsRoutes = require("./allStateRecordsRouter");

//  routes
router.use("/users", usersRoutes);

router.use("/system", systemRoutes);

router.use("/encounters", encountersRoutes);

router.use("/tags", tagsRoutes);

module.exports = router;
