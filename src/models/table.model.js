const mongoose = require("mongoose");

const tableSchema = mongoose.Schema(
  {
    tableNo: {
      type: String,
    },
    seats: {
      type: String,
      default: 2,
    },
    timeSlot: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const Table = mongoose.model("Table", tableSchema);

module.exports = Table;
