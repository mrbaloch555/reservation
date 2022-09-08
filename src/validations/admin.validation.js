// const Joi = require("joi").extend(require("@joi/date"));
// const { password, objectId } = require("./custom.validation");

// const registerAdmin = {
//   body: Joi.object()
//     .keys({
//       firstName: Joi.string().required(),
//       lastName: Joi.string().required(),
//       email: Joi.string().email().required(),
//       userName: Joi.string().required(),
//     })
//     .min(1),
// };

// const getAdmin = {
//   params: Joi.object().keys({
//     id: Joi.string().custom(objectId),
//   }),
// };

// const updateAdmin = {
//   params: Joi.object().keys({
//     id: Joi.required().custom(objectId),
//   }),
//   body: Joi.object()
//     .keys({
//       firstName: Joi.string().required(),
//       lastName: Joi.string().required(),
//       role: Joi.string().allow().optional(),
//     })
//     .min(1),
// };

// const deleteAdmin = {
//   params: Joi.object().keys({
//     id: Joi.string().custom(objectId),
//   }),
// };
// module.exports = {
//   createAdmin,
//   getAdmin,
//   updateAdmin,
//   deleteAdmin,
//   login,
//   logout,
// };
