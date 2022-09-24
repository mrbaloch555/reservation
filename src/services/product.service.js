const httpStatus = require("http-status");
const config = require("../config/config");
const { Product } = require("../models");
const ApiError = require("../utils/ApiError");
const catchAsync = require("../utils/catchAsync");
const ApiFeatures = require("./../utils/apiFeature");
/**
 * Create a product
 * @param {Object} product
 * @returns {Promise<User>}
 */
const createProduct = async (product) => {
  try {
    const result = await Product.create(product);
    if (!result) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Failed To Create Product");
    }
    return result;
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, error);
  }
};

const getAllProduct = async (queryData) => {
  const resultPerPage = 8;
  const productCount = await Product.countDocuments();
  const apiFeature = new ApiFeatures(Product.find(), queryData)
    .search()
    .filter()
    .pagination(resultPerPage);
  const product = await apiFeature.query;
  if (!product.length > 0) {
    throw new ApiError(httpStatus.BAD_REQUEST, "No Product Found");
  }
  let productPicture = [];
  product.map((data) => {
    productPicture = data.productPicture.map((item) => {
      return { img: item.img };
    });
  });
  product.productPicture = productPicture;
  return { product, productCount };
};

const updateProduct = async (id, body) => {
  const result = await Product.findByIdAndUpdate(id, body, { new: true });
  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, "No Product Found");
  }
  return result;
};

const deleteProduct = async (id) => {
  const result = await Product.findByIdAndRemove(id);
  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, "No Product Found");
  }
  return "Product Deleted Successfully";
};

module.exports = {
  createProduct,
  getAllProduct,
  updateProduct,
  deleteProduct,
};
