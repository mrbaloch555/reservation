const express = require("express");
const validate = require("../middlewares/validate");
const productValidation = require("../validations/product.validation");
const { productController } = require("../controllers");
const { fileUpload } = require("./../utils/fileUpload");
const { requireSignin, adminMiddleware } = require("./../middlewares/auth");
const router = express.Router();

router
  .route("/")
  .post(
    requireSignin,
    adminMiddleware,
    fileUpload.array("productPicture"),
    productController.createProduct
  )
  .get(requireSignin, productController.getAllProduct);

router
  .route("/:productId")
  .patch(
    requireSignin,
    adminMiddleware,
    fileUpload.array("productPicture"),
    productController.updateProduct
  )
  .delete(requireSignin, adminMiddleware, productController.deleteProduct);

module.exports = router;
