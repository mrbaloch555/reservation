const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");
const { userService } = require("../services");
const bcrypt = require("bcryptjs");

const register = catchAsync(async (req, res) => {
  let body = req.body;
  if (req.file) {
    body.image = req.file.filename;
  }
  const user = await userService.register(body);
  res.status(httpStatus.CREATED).send(user);
});

const login = catchAsync(async (req, res) => {
  let body = req.body;
  const user = await userService.login(body);
  res.status(httpStatus.CREATED).send(user);
});

const createChatConnection = catchAsync(async (req, res) => {
  let body = req.body;
  const user = await userService.createChatConnection(body);
  res.status(httpStatus.CREATED).send(user);
});

const getChatConnection = catchAsync(async (req, res) => {
  let body = req.params.data;
  const user = await userService.getChatConnection(body);
  res.status(httpStatus.CREATED).send(user);
});

const forgetPassword = catchAsync(async (req, res) => {
  let body = req.body;
  const user = await userService.forgetPassword(body);
  res.status(httpStatus.CREATED).send(user);
});

const getAllUser = catchAsync(async (req, res) => {
  const user = await userService.getAllUser();
  res.status(httpStatus.CREATED).send(user);
});

const updateUser = catchAsync(async (req, res) => {
  let body = req.body;
  if (req.file) {
    body.image = req.file.filename;
  }
  if (body.password) {
    body.password = bcrypt.hashSync(body.password, 10);
  }

  if (body.confrimPassword) {
    body.confrimPassword = bcrypt.hashSync(body.confrimPassword, 10);
  }
  let query = req.params.userId;
  const user = await userService.updateUser(query, body);
  res.status(httpStatus.CREATED).send(user);
});

const deleteUser = catchAsync(async (req, res) => {
  let query = req.params.userId;
  const user = await userService.deleteUser(query);
  res.status(httpStatus.CREATED).send(user);
});

const addLatestTime = catchAsync(async (req, res) => {
  let query = req.params.userId;
  const user = await userService.addLatestTime(query);
  res.status(httpStatus.CREATED).send(user);
});
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
