const httpStatus = require("http-status");
const { bookingService, bookingSlotsService } = require("../services");
const ApiError = require("../utils/ApiError");
const catchAsync = require("../utils/catchAsync");
// const { blogService } = require("../services");

const createBooking = catchAsync(async (req, res) => {
  let booking = req.body;
  const bookingResult = await bookingService.createBooking(
    req.user._id,
    booking
  );
  res.status(httpStatus.CREATED).send(bookingResult);
});

const getAllBookings = catchAsync(async (req, res) => {
  const filter = {};
  const options = {};
  options.populate = "user,bookingSlot";
  const bookings = await bookingService.getAllBooking(filter, options);
  res.status(httpStatus.OK).send(bookings);
});

const getSingleBooking = catchAsync(async (req, res) => {
  const booking = await bookingService.getSingleBooking(req.params.id);
  if (!booking) {
    throw new ApiError(httpStatus.NOT_FOUND, "No booking found!");
  }
  res.status(httpStatus.OK).send(booking);
});

const getBookingsOfLoggedUser = catchAsync(async (req, res) => {
  const bookings = await bookingService.getBookingsOfLoggedUser(req.user._id);
  res.status(httpStatus.OK).send(bookings);
});

const cancelBooking = catchAsync(async (req, res) => {
  const { bookingId } = req.body;
  const booking = await bookingService.cancelBooking(bookingId, req.user._id);
  res.status(httpStatus.OK).send(booking);
});

const getBookingSlot = catchAsync(async (req, res) => {
  const { date, slotId } = req.body;
  const bookingSlots = await bookingSlotsService.getBookingSlot(date, slotId);
  if (!bookingSlots)
    return res.status(httpStatus.NOT_FOUND).json({ msg: "No booking found!" });
  res.status(httpStatus.OK).send(bookingSlots);
});
module.exports = {
  createBooking,
  getAllBookings,
  getSingleBooking,
  getBookingsOfLoggedUser,
  cancelBooking,
  getBookingSlot,
};
