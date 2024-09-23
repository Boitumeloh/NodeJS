const router = require("express").Router();
const userRoutes = require("./userRoutes");
const subscriberRoutes = require("./subscriberRoutes");
const courseRoutes = require("./courseRoutes");
const apiRoutes = require("./apiRoutes");
// const errorRoutes = require("./errorRoutes");
// const homeRoutes = require("./homeRoutes");


router.use("/api", apiRoutes);
router.use("/users", userRoutes);
router.use("/subscribers", subscriberRoutes);
router.use("/courses", courseRoutes);

// router.use("/", homeRoutes);
// router.use("/", errorRoutes);

module.exports = router;
