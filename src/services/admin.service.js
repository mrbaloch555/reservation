const httpStatus = require("http-status");
const { User } = require("../models");
const ApiError = require("../utils/ApiError");
const generateJwtToken = require("./../config/generateToken");
/**
 * Create a user
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
const register = async (userBody) => {
  return await User.create(userBody);
};

const login = async (userBody) => {
  const user = await User.findOne({
    $and: [{ email: userBody.email }, { role: "admin" }],
  });
  if (!user) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Credentials Invalid");
  }
  const checkPassword = await user.isPasswordMatch(userBody.password);
  if (!checkPassword) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Credentials Invalid");
  }
  const token = generateJwtToken(user._id, user.role);
  const result = { token, user };
  return result;
};

const updateAdmin = async (query, body) => {
  const updateAdmin = await User.findByIdAndUpdate(query, body, { new: true });
  if (!updateAdmin) {
    throw new ApiError(httpStatus.BAD_REQUEST, "No Admin Found");
  }
  return updateAdmin;
};

const deleteAdmin = async (query, body) => {
  const updateAdmin = await User.findByIdAndRemove(query, body);
  if (!updateAdmin) {
    throw new ApiError(httpStatus.BAD_REQUEST, "No User Found");
  }
  return "Admin Deleted Successfully";
};
module.exports = {
  register,
  login,
  updateAdmin,
  deleteAdmin,
};
