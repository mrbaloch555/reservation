const mongoose = require("mongoose");
const { toJSON, paginate } = require("./plugins");

const blogSchema = mongoose.Schema(
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
    blogPicture:[
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
blogSchema.plugin(toJSON);
blogSchema.plugin(paginate);


const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
