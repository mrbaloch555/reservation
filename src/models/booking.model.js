const mongoose = require("mongoose");
const { toJSON, paginate } = require("./plugins");
const bookingSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    bookingSlot: {
      type: mongoose.Types.ObjectId,
      ref: "BookingSlots",
      required: true,
    },
    slot: {
      type: mongoose.Types.ObjectId,
      ref: "Slot",
      required: true,
    },
    reservedSeats: {
      type: Number,
      required: true,
    },
    event: {
      type: mongoose.Types.ObjectId,
      ref: "Event",
      default: null,
    },
    date: {
      type: Date,
      required: true,
    },
    startTime: {
      type: String,
      required: true,
    },
    endTime: {
      type: String,
      required: true,
    },
    cancelled: {
      type: Boolean,
      default: false,
    },
    approved: {
      type: Boolean,
      required: true,
    },
    expired: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
bookingSchema.plugin(toJSON);
bookingSchema.plugin(paginate);

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;
