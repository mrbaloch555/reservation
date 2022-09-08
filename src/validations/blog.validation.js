const Joi = require("joi");


const createBlog = {
  body: Joi.object().keys({
      name:Joi.string(),
      desc:Joi.string(),
      blogPicture:Joi.string(),
  }),
};


module.exports = {
    createBlog
};
