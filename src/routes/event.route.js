const express = require("express");
const validate = require("../middlewares/validate");
const eventValidation = require("./../validations/event.validation");
const {eventController} = require("../controllers");
const { fileUpload} = require("./../utils/fileUpload");
const {requireSignin,adminMiddleware,userMiddleware} = require('./../middlewares/auth')
const router = express.Router();


router
  .route("/")
  .post(requireSignin,adminMiddleware,fileUpload.array('eventPicture'),eventController.createEvent)
  .get(requireSignin,eventController.getAllEvent)


  router
  .route("/:eventId")
  .patch(requireSignin,adminMiddleware,fileUpload.array('eventPicture'),eventController.updateEvent)
  .delete(requireSignin,adminMiddleware,eventController.deleteEvent)
module.exports = router;
