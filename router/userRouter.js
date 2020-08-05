const router = require("express").Router();

const { userController } = require("../controller");

router.get("/users", userController.getUserData);

module.exports = router;
