const Joi = require("joi");


const createProduct = {
  body: Joi.object().keys({
     name:Joi.string(),
      desc:Joi.string(),
      productPicture:Joi.string(),
      category:Joi.string(),
      price:Joi.number()
  }),
};
module.exports = {
    createProduct
};
