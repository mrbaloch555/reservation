const mongoose = require("mongoose");
const { toJSON, paginate } = require("./plugins");
const bookingSlotsSchema = mongoose.Schema(
  {
    slot: {
      type: mongoose.Types.ObjectId,
      ref: "Slot",
      required: true,
    },
    reservedTables: {
      type: Number,
      default: 0,
    },
    unReservedTable: {
      type: Number,
      default: 0,
    },
    date: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
bookingSlotsSchema.plugin(toJSON);
bookingSlotsSchema.plugin(paginate);
const Booking = mongoose.model("BookingSlots", bookingSlotsSchema);

module.exports = Booking;
