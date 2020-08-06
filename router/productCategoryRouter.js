const router = require("express").Router();

const { productCategoryController } = require("../controller");

router.get("/prodcat", productCategoryController.getProdCat);
router.post("/prodcat", productCategoryController.addProdCat);

module.exports = router;
