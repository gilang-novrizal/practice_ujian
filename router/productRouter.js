const router = require("express").Router();

const { productController } = require("../controller");

router.get("/product", productController.getProduct);
router.post("/product", productController.addProduct);
router.patch("/product/:id", productController.editProduct);

module.exports = router;
