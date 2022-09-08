const mongoose = require("mongoose");
const { toJSON, paginate } = require("./plugins");

const slotSchema = mongoose.Schema(
  {
    startTime: {
      hour: {
        type: Number,
        max: 23,
        required: true,
      },
      minutes: {
        type: Number,
        max: 59,
        required: true,
      },
    },
    endTime: {
      hour: {
        type: Number,
        max: 23,
        required: true,
      },
      minutes: {
        type: Number,
        max: 59,
        required: true,
      },
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
slotSchema.plugin(toJSON);
slotSchema.plugin(paginate);

const Slot = mongoose.model("Slot", slotSchema);

module.exports = Slot;
