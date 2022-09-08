const mongoose = require("mongoose");
const { toJSON, paginate } = require("./plugins");

const eventSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required:true,
      trim: true,
    },
    desc: {
      type: String,
      trim: true,
    },
    eventPicture:[
      {
        _id: false,
        img:{
          type:String
        }
      }
    ],
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
eventSchema.plugin(toJSON);
eventSchema.plugin(paginate);


const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
