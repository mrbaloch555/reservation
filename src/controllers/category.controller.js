const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");
const { categoryService } = require("../services");

const createCategory = catchAsync(async (req, res) => {
  const category = await categoryService.createCategory(req.body);
  res.status(httpStatus.CREATED).send(category);
});

const getAllCategory = catchAsync(async (req, res) => {
  const categories = await categoryService.getAllCategory();
  res.status(httpStatus.CREATED).send(categories);
});



const deleteCategory = catchAsync(async (req, res) => {
  const result= await categoryService.deleteCategory(req.params.categoryId);
  res.status(httpStatus.CREATED).send(result);
});


module.exports = {
    createCategory,
    getAllCategory,
    deleteCategory
};
