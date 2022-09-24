const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");
const { blogService } = require("../services");
const config = require("../config/config");

const createBlog = catchAsync(async (req, res) => {
  let blogPicture = [];
  if (req.files.length > 0) {
    blogPicture = req.files.map((file) => {
      return { img: file.filename };
    });
  }
  let blog = req.body;
  blog.blogPicture = blogPicture;
  const blogResult = await blogService.createBlog(blog);
  res.status(httpStatus.CREATED).send(blogResult);
});

const getAllBlogs = catchAsync(async (req, res) => {
  const blog = await blogService.getAllBlogs(req.query);
  blog.blog = blog.blog.map((element) => {
    element.blogPicture.map((el) => {
      el.img = config.rootPath + el.img;
    });
    return element;
  });
  res.status(httpStatus.CREATED).send(blog);
});

const updateBlog = catchAsync(async (req, res) => {
  let blogId = req.params.blogId;
  let blogPicture = [];
  if (req.files.length > 0) {
    blogPicture = req.files.map((file) => {
      return { img: file.filename };
    });
  }
  let body = req.body;
  if (blogPicture.length > 0) {
    body.blogPicture = blogPicture;
  }
  const blog = await blogService.updateBlog(blogId, body);
  if (blog.blogPicture.length > 0)
    blog.blogPicture.forEach((element) => {
      element.img = config.rootPath + element.img;
    });
  res.status(httpStatus.CREATED).send(blog);
});

const deletBlog = catchAsync(async (req, res) => {
  let blogId = req.params.blogId;
  const blog = await blogService.deletBlog(blogId);
  res.status(httpStatus.CREATED).send(blog);
});

module.exports = {
  createBlog,
  getAllBlogs,
  updateBlog,
  deletBlog,
};
