const router = require("express").Router();
const usersRoutes = require("./usersRouter");
const systemRoutes = require("./systemRouter");
const encountersRoutes = require("./encountersRouter");
const searchRoutes = require("./searchRouter");
const tagRoutes = require("./tagRouter");

//  routes
router.use("/users", usersRoutes);

router.use("/system", systemRoutes);

router.use("/encounter", encountersRoutes);

router.use("/search", searchRoutes);

router.use("/tag", tagRoutes);

module.exports = router;
