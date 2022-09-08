const httpStatus = require("http-status");
const { Blog } = require("../models");
const ApiError = require("../utils/ApiError");
const ApiFeatures = require("./../utils/apiFeature");
/**
 * Create a product
 * @param {Object} blog
 * @returns {Promise<User>}
 */
const createBlog = async (blog) => {
  try {
    const result = await Blog.create(blog);
    if (!result) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Failed To Create Blog");
    }
    return result;
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, error);
  }
};

const getAllBlogs = async (queryData) => {
  const resultPerPage = 8;
  const BlogCount = await Blog.countDocuments();
  const apiFeature = new ApiFeatures(Blog.find(), queryData)
    .search()
    .filter()
    .pagination(resultPerPage);
  const blog = await apiFeature.query;
  if (!blog.length > 0) {
    throw new ApiError(httpStatus.BAD_REQUEST, "No Blog Found");
  }
  let changeImg = [];
  blog.map((data) => {
    changeImg = data.blogPicture.map((item) => {
      return { img: item.img };
    });
  });
  blog.blogPicture = changeImg;
  return { blog, BlogCount };
};

const updateBlog = async (id, body) => {
  const result = await Blog.findByIdAndUpdate(id, body, { new: true });
  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, "No Blog Found");
  }
  return result;
};

const deletBlog = async (id) => {
  const result = await Blog.findByIdAndRemove(id);
  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, "No Blog Found");
  }
  return "Blog Deleted Successfully";
};

module.exports = {
  createBlog,
  getAllBlogs,
  updateBlog,
  deletBlog,
};
