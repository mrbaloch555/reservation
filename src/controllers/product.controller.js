const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");
const { productService } = require("../services");
const config = require("../config/config");

const createProduct = catchAsync(async (req, res) => {
  let productPicture = [];
  if (req.files.length > 0) {
    productPicture = req.files.map((file) => {
      return { img: file.filename };
    });
  }
  let product = req.body;
  product.productPicture = productPicture;
  const productResult = await productService.createProduct(product);
  res.status(httpStatus.CREATED).send(productResult);
});

const getAllProduct = catchAsync(async (req, res) => {
  const product = await productService.getAllProduct(req.query);
  product.product = product.product.map((element) => {
    element.productPicture.map((el) => {
      el.img = config.rootPath + el.img;
    });
    return element;
  });
  res.status(httpStatus.CREATED).send(product);
});

const updateProduct = catchAsync(async (req, res) => {
  let productId = req.params.productId;
  let productPicture = [];
  if (req.files) {
    if (req.files.length > 0) {
      productPicture = req.files.map((file) => {
        return { img: file.filename };
      });
    }
  }

  let body = req.body;
  if (productPicture.length > 0) {
    body.productPicture = productPicture;
  }
  const product = await productService.updateProduct(productId, body);
  if (product.productPicture.length > 0)
    product.productPicture.forEach((element) => {
      element.img = config.rootPath + element.img;
    });
  res.status(httpStatus.CREATED).send(product);
});

const deleteProduct = catchAsync(async (req, res) => {
  let productId = req.params.productId;
  const product = await productService.deleteProduct(productId);
  res.status(httpStatus.CREATED).send(product);
});

module.exports = {
  createProduct,
  getAllProduct,
  updateProduct,
  deleteProduct,
};
