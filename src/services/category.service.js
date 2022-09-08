const httpStatus = require("http-status");
const { Category } = require("../models");
const ApiError = require("../utils/ApiError");
const ApiFeatures = require("./../utils/apiFeature");
/**
 * Create a product
 * @param {Object} category
 * @returns {Promise<User>}
 */
const createCategory = async (category) => {
  try {
    const result = await Category.findOne(category);
    if (result) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Category Already Exists");
    }
    const categories = await Category.create(category);
    if (!categories) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Error In Saving Category");
    }
    return categories;
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, error);
  }
};

const getAllCategory = async () => {
  const categories = await Category.find();
  if (!categories.length > 0) {
    throw new ApiError(httpStatus.BAD_REQUEST, "No Category Found");
  }
  return categories;
};

const deleteCategory = async (id) => {
  const categories = await Category.findByIdAndDelete(id);
  if (!categories) {
    throw new ApiError(httpStatus.BAD_REQUEST, "No Category Found");
  }
  return "Category Deleted Successfully";
};

module.exports = {
  createCategory,
  getAllCategory,
  deleteCategory,
};
