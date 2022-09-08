const express = require("express");
const validate = require("../middlewares/validate");
const {categoryValidation} = require("./../validations");
const {categoryController} = require("../controllers");
const {requireSignin,adminMiddleware} = require('./../middlewares/auth')
const router = express.Router();


router
  .route("/")
  .post(requireSignin,adminMiddleware,categoryController.createCategory)
  .get(requireSignin,categoryController.getAllCategory)

  router
  .route("/:categoryId")
  .delete(requireSignin,adminMiddleware,categoryController.deleteCategory)
  
module.exports = router;