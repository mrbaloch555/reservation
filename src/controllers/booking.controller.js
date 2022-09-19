const httpStatus = require("http-status");
const { bookingService, bookingSlotsService } = require("../services");
const ApiError = require("../utils/ApiError");
const catchAsync = require("../utils/catchAsync");
const pick = require("../utils/pick");
// const { blogService } = require("../services");

const createBooking = catchAsync(async (req, res) => {
  let booking = req.body;
  const bookingResult = await bookingService.createBooking(
    req.user._id,
    booking
  );
  res.status(httpStatus.CREATED).send(bookingResult);
});

const approveReservation = catchAsync(async (req, res) => {
  const { id } = req.params;
  const booking = await bookingService.approveReservation(id);
  res.send(booking);
});
const getAllBookings = catchAsync(async (req, res) => {
  const filter = {};
  const options = pick(req.query, ["sortBy", "limit", "page"]);
  options.populate = "user,bookingSlot,slot";
  const bookings = await bookingService.getAllBooking(filter, options);
  bookings.results.forEach((res) => {
    const now = new Date();
    let bookingDate = new Date(res.date);
    if (res.slot) {
      bookingDate = new Date(bookingDate.setHours(res.slot.endTime.hour));
      if (bookingDate < now) res.expired = true;
    }
  });
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
  bookings.forEach((res) => {
    const now = new Date();
    let bookingDate = new Date(res.date);
    if (res.slot) {
      bookingDate = new Date(bookingDate.setHours(res.slot.endTime.hour));
      if (bookingDate < now) res.expired = true;
    }
  });
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
  approveReservation,
};
