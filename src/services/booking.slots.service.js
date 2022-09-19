const httpStatus = require("http-status");
const { default: mongoose } = require("mongoose");
const { BookingSlots } = require("../models");
const ApiError = require("../utils/ApiError");
const ApiFeatures = require("./../utils/apiFeature");
/**
 * Create a product
 * @param {Object} category
 * @returns {Promise<User>}
 */

const createBookingSlot = async (body) => {
  return (await BookingSlots.create(body)).populate("slot");
};

const updateSeats = async (id, inc) => {
  await BookingSlots.updateOne(
    { _id: mongoose.Types.ObjectId(id) },
    { $inc: { reservedTables: inc, unReservedTable: -inc } }
  );
};
const getBookingSlot = async (date, id) => {
  date = new Date(date);
  const gte = new Date(date.setHours(0, 0, 0, 0));
  const lte = new Date(date.setHours(24, 0, 0, 0));
  const bookingSlot = await BookingSlots.findOne({
    date: { $gte: gte, $lte: lte },
    slot: mongoose.Types.ObjectId(id),
  }).populate("slot");
  return bookingSlot;
};
module.exports = {
  createBookingSlot,
  updateSeats,
  getBookingSlot,
};
