const express = require("express");
const validate = require("../middlewares/validate");
const { slotValidation } = require("./../validations");
const { slotController } = require("../controllers");
const {
  requireSignin,
  adminMiddleware,
  userMiddleware,
} = require("./../middlewares/auth");
const router = express.Router();

router
  .route("/")
  .post(
    requireSignin,
    adminMiddleware,
    validate(slotValidation.createSlot),
    slotController.createSlot
  )
  .get(requireSignin, slotController.querySlots);

router
  .route("/:slotId")
  .get(
    requireSignin,
    validate(slotValidation.getSingleSlot),
    slotController.getSinglelot
  )
  // .patch(
  //   requireSignin,
  //   adminMiddleware,
  //   validate(slotValidation.updateSlot),
  //   slotController.updateSlot
  // )
  .delete(
    requireSignin,
    adminMiddleware,
    validate(slotValidation.deleteSlot),
    slotController.deleteSlot
  );
module.exports = router;
