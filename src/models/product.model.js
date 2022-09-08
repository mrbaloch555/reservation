const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required:true,
      trim: true
    },
    desc: {
      type: String,
      trim:true,
    },
    category:{
      type:String
    },
    productPicture:[
      {
        _id: false,
        img:{
          type:String
        }
      }
    ],
    price:{
      type:Number
    }
  },
  {
    timestamps: true,
  }
);


const Product = mongoose.model("Product", productSchema);

module.exports = Product;
