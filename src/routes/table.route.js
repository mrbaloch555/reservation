const express = require("express");
const validate = require("../middlewares/validate");
const {blogValidation} = require("./../validations");
const {blogController} = require("../controllers");
const { fileUpload} = require("./../utils/fileUpload");
const {requireSignin,adminMiddleware,userMiddleware} = require('./../middlewares/auth')
const router = express.Router();


router
  .route("/")
 

module.exports = router;
