const router = require("express").Router();
const homeController = require("../controllers/homeController");

router.use(homeController.logRequestPaths);

router.get("/", homeController.index);
router.get("/contact", homeController.getSubscriptionPage);

module.exports = router;