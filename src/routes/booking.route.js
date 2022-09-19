const express = require("express");
const validate = require("../middlewares/validate");
const { bookingValidation } = require("./../validations");
const { bookingController } = require("../controllers");
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
    validate(bookingValidation.createBooking),
    bookingController.createBooking
  )
  .get(bookingController.getAllBookings);

router.patch(
  "/approve/:id",
  requireSignin,
  adminMiddleware,
  validate(bookingValidation.approveReservation),
  bookingController.approveReservation
);
router
  .route("/:id")
  .get(
    validate(bookingValidation.getSingleBooking),
    bookingController.getSingleBooking
  );

router.get(
  "/user/booking",
  requireSignin,
  bookingController.getBookingsOfLoggedUser
);

router.post(
  "/user/cancel",
  requireSignin,
  validate(bookingValidation.cancelBooking),
  bookingController.cancelBooking
);
router.post(
  "/booking/bookingslots/fetch",
  requireSignin,
  validate(bookingValidation.getBookingSlot),
  bookingController.getBookingSlot
);
module.exports = router;
