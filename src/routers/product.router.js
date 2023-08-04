const { Router } = require("express");
const productRouter = Router();
const productController = require("../controller/product.controller");
const memoryUpload = require("../middleware/memoryUpload");
const middleware = require("../middleware/cloudUpload");

productRouter.get("/", productController.viewProducts);
productRouter.post(
  "/",
  memoryUpload.single("image"),
  middleware.cloudUpload,
  productController.addProduct
);
productRouter.get("/:id", productController.viewProductDetail);

module.exports = productRouter;
