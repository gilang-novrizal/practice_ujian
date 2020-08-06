const router = require("express").Router();
const { registValidator } = require("../helper/validator");
const { userController } = require("../controller");

router.get("/users", userController.getUserData);
router.post("/login", userController.login);
router.post("/register", registValidator, userController.register);
router.delete("/users/:id", userController.deleteUser);
router.patch("/users/:id", userController.edit);

module.exports = router;
