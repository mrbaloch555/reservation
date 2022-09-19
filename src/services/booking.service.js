const httpStatus = require("http-status");
const { Booking, BookingSlots } = require("../models");
const ApiError = require("../utils/ApiError");
const ApiFeatures = require("./../utils/apiFeature");
const TIMESLOTS_PATH = require("../utils/timeSlots.json");
const { default: mongoose } = require("mongoose");
const moment = require("moment");
const config = require("../config/config");
const bookingSlotService = require("./booking.slots.service");
const slotService = require("./slot.service");
/**
 * Books an appointment using the given date and time information.
 * @param {object} auth  The oAuth2Client used for authentication for the Google Calendar API.
 * @param {number} year  Year of the timeslot to book.
 * @param {number} month  Month of the timeslot to book.
 * @param {number} day  Day of the timeslot to book.
 * @param {number} hour  Hour of the timeslot to book.
 * @param {number} minute  Minute of the timeslot to book.
 * @returns {promise}  A promise representing the eventual completion of the bookAppointment() function.
 */

const createBooking = async (userId, bookingBody) => {
  const date = new Date(bookingBody.date);
  const gte = new Date(date.setHours(0, 0, 0, 0));
  const lte = new Date(date.setHours(24, 0, 0, 0));
  const bookingSlot = await BookingSlots.findOne({
    date: { $gte: gte, $lte: lte },
    slot: mongoose.Types.ObjectId(bookingBody.slot),
  }).populate("slot");
  if (!bookingSlot) {
    const newBookingSlot = {
      slot: bookingBody.slot,
      reservedTables: 0,
      unReservedTable: config.maxReserverSlotsPerDay,
      date: date,
    };
    const bookingSlot = await bookingSlotService.createBookingSlot(
      newBookingSlot
    );
    const valid = await validateSlotTime(
      bookingBody.startTime,
      bookingBody.endTime,
      bookingSlot.slot
    );
    if (valid) {
      const now = new Date();
      const diffTime = Math.abs(date - now);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      if (diffDays > 30)
        throw new ApiError(
          httpStatus.BAD_REQUEST,
          "You can book reservation within 30 days!"
        );
      if (bookingBody.seats > 8)
        throw new ApiError(
          httpStatus.BAD_REQUEST,
          "You can not book more than 8 seats!"
        );

      const newBooking = {
        user: userId,
        bookingSlot: bookingSlot._id,
        slot: bookingBody.slot,
        reservedSeats: bookingBody.seats,
        date: bookingBody.date,
        startTime: bookingBody.startTime,
        endTime: bookingBody.endTime,
        approved: false,
      };
      const booking = await Booking.create(newBooking);
      // await bookingSlotService.updateSeats(bookingSlot.id, bookingBody.seats);
      return booking;
    } else {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        "select time within range of slot time range"
      );
    }
  } else {
    const slot = await slotService.getSingleSlot(bookingBody.slot);
    if (!slot) throw new ApiError(httpStatus.NOT_FOUND, "No slot found!");
    const valid = await validateSlotTime(
      bookingBody.startTime,
      bookingBody.endTime,
      slot
    );
    if (valid) {
      const now = new Date();
      const diffTime = Math.abs(date - now);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      if (diffDays > 30)
        throw new ApiError(
          httpStatus.BAD_REQUEST,
          "You can book reservation within 30 days!"
        );
      if (bookingBody.seats > 8)
        throw new ApiError(
          httpStatus.BAD_REQUEST,
          "You can not book more than 8 seats!"
        );
      const booking = await Booking.findOne({
        user: userId,
        slot: mongoose.Types.ObjectId(bookingBody.slot),
        date: { $gte: gte, $lte: lte },
      });
      if (booking)
        throw new ApiError(
          httpStatus.BAD_REQUEST,
          "You already booked a slot!"
        );
      else {
        if (bookingSlot.unReservedTable == 0)
          throw new ApiError(httpStatus.BAD_REQUEST, "Sorry this slot is full");
        else if (bookingBody.seats > bookingSlot.unReservedTable)
          throw new ApiError(
            httpStatus.BAD_REQUEST,
            "Not enough seats avalaible for this slot"
          );
        const newBooking = {
          user: userId,
          bookingSlot: bookingSlot._id,
          slot: bookingBody.slot,
          reservedSeats: bookingBody.seats,
          date: bookingBody.date,
          startTime: bookingBody.startTime,
          endTime: bookingBody.endTime,
          approved: false,
        };
        const booking = await Booking.create(newBooking);
        // await bookingSlotService.updateSeats(bookingSlot.id, bookingBody.seats);
        return booking;
      }
    } else {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        "select time within range of slot time range"
      );
    }
  }
};

const approveReservation = async (id) => {
  const booking = await Booking.findById(id);
  if (booking.approved)
    throw new ApiError(httpStatus.BAD_REQUEST, "Reservation already approved!");
  const bookingSlotId = booking.bookingSlot;
  await bookingSlotService.updateSeats(bookingSlotId, booking.reservedSeats);
  const updatedBooking = {
    approved: true,
  };
  Object.assign(booking, updatedBooking);
  await booking.save();
  return booking;
};
const getAllBooking = async (filter, options) => {
  return await Booking.paginate(filter, options);
};

const getSingleBooking = async (id) => {
  return await Booking.findById(id)
    .populate("user")
    .populate("bookingSlot")
    .populate("slot");
};

const getBookingsOfLoggedUser = async (userId) => {
  return await Booking.find({ user: mongoose.Types.ObjectId(userId) })
    .populate("user")
    .populate("bookingSlot")
    .populate("slot")
    .sort({ createdAt: -1 });
};

const validateSlotTime = async (startTime, endTime, slot) => {
  const startHours = startTime.slice(0, 2);
  const endHours = endTime.slice(0, 2);
  if (endHours < startHours) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "start time cannot be greater than end time"
    );
  }
  if (
    Number(startHours) < slot.startTime.hour ||
    Number(startHours) > slot.endTime.hour ||
    Number(endHours) > slot.endTime.hour ||
    Number(endHours) < slot.startTime.hour
  )
    return false;
  return true;
};

const cancelBooking = async (id, user) => {
  const booking = await Booking.findById(id)
    .populate("slot")
    .populate("bookingSlot");
  if (!booking) throw new ApiError(httpStatus.BAD_REQUEST, "No booking found!");
  const now = new Date();
  let bookingDate = new Date(booking.date);
  bookingDate = new Date(bookingDate.setHours(booking.slot.endTime.hour));
  if (bookingDate < now)
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "Reservation has expired, you cannot cancel it!"
    );
  if (booking.cancelled)
    throw new ApiError(httpStatus.BAD_REQUEST, "Booking is already cancelled!");
  const updatedBooking = booking;
  booking.cancelled = true;
  Object.assign(booking, updatedBooking);
  await booking.save();
  if (booking.approved)
    await BookingSlots.updateOne(
      { _id: booking.bookingSlot.id },
      {
        $inc: {
          reservedTables: -booking.reservedSeats,
          unReservedTable: booking.reservedSeats,
        },
      }
    );
  return booking;
};
module.exports = {
  createBooking,
  approveReservation,
  getAllBooking,
  getSingleBooking,
  getBookingsOfLoggedUser,
  cancelBooking,
};
