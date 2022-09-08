const express = require("express");
// const auth = require("../middlewares/auth");
const validate = require("../middlewares/validate");
const userValidation = require("../validations/user.validation");
const { adminController } = require("../controllers");
const { fileUpload } = require("../utils/fileUpload");
const router = express.Router();

router
  .route("/register")
  .post(validate(userValidation.register), adminController.register);
router
  .route("/login")
  .post(validate(userValidation.login), adminController.login);

module.exports = router;
