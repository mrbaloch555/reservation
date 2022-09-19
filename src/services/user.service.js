const httpStatus = require("http-status");
const { User, Connection } = require("../models");
const ApiError = require("../utils/ApiError");
const generateJwtToken = require("./../config/generateToken");
const bcrypt = require("bcryptjs");

/**
 * Create a user
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
const register = async (userBody) => {
  const existEmail = await User.findOne({
    $and: [{ email: userBody.email }, { role: "user" }],
  });
  if (existEmail) {
    throw new ApiError(httpStatus.BAD_REQUEST, "User Already Exist");
  }
  const saveUser = await User.create(userBody);
  return saveUser;
};

const login = async (userBody) => {
  const user = await User.findOne({
    $and: [{ email: userBody.email }, { role: "user" }],
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

const createChatConnection = async (userBody) => {
  const doc = await Connection.create({
    members: [userBody.split(",")[0], userBody.split(",")[1]],
  });
  return doc;
};

const getChatConnection = async (data) => {
  if (data.split(",")[0] === data.split(",")[1]) {
    const doc = await Connection.findOne({
      "members.0": data.split(",")[0],
      "members.1": data.split(",")[1],
    });
    return doc;
  } else {
    const doc = await Connection.findOne({
      members: { $all: [data.split(",")[0], data.split(",")[1]] },
    });
    if (doc) {
      return doc;
    } else {
      await createChatConnection(data);
    }
  }
};

const forgetPassword = async (body) => {
  const emailExist = await User.findOne({
    $and: [{ email: body.email }, { role: "user" }],
  });
  if (emailExist == null) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "Credentials Invalid No User Exist"
    );
  }

  const hashPassword = await bcrypt.hash(body.password, 10);
  const updateUser = User.findOneAndUpdate(
    { $and: [{ email: body.email }, { role: "user" }] },
    { $set: { password: hashPassword } },
    { new: true }
  );
  if (!updateUser) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Something Went Wrong");
  }
  return updateUser;
};

const updateUser = async (query, body) => {
  const updateUser = await User.findByIdAndUpdate(query, body, { new: true });
  if (!updateUser) {
    throw new ApiError(httpStatus.BAD_REQUEST, "No User Found");
  }
  return updateUser;
};

const getAllUser = async () => {
  const users = await User.find({ role: "user" }).sort({ latestTime: -1 });
  if (users.length < 0) {
    throw new ApiError(httpStatus.BAD_REQUEST, "No User Found");
  }
  return users;
};

const deleteUser = async (query, body) => {
  const updateUser = await User.findByIdAndRemove(query, body);
  if (!updateUser) {
    throw new ApiError(httpStatus.BAD_REQUEST, "No User Found");
  }
  return "User Deleted Successfully";
};

const addLatestTime = async (query) => {
  const updateUser = await User.findByIdAndUpdate(query, {
    latestTime: Date.now(),
  });
  if (!updateUser) {
    throw new ApiError(httpStatus.BAD_REQUEST, "No User Found");
  }
  return "Time Added Successfully";
};

module.exports = {
  register,
  login,
  createChatConnection,
  getChatConnection,
  getAllUser,
  forgetPassword,
  updateUser,
  deleteUser,
  addLatestTime,
};
