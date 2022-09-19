const Joi = require("joi");
// const { password, objectId } = require("./custom.validation");

const createUser = {
  body: Joi.object()
    .keys({
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(8).max(32).required(),
      confirmPassword: Joi.string().min(8).max(32).required(),
      image: Joi.string(),
      role: String,
    })
    .min(1),
};

const register = {
  body: Joi.object().keys({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
    password: Joi.string().min(8).max(32).required(),
    image: Joi.string(),
  }),
};

const login = {
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(32).required(),
  }),
};

module.exports = {
  createUser,
  login,
  register,
};
