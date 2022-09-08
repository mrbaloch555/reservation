const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");
const { slotService } = require("../services");
const ApiError = require("../utils/ApiError");

const createSlot = catchAsync(async (req, res) => {
  const slot = await slotService.createSlot(req.body);
  res.status(httpStatus.CREATED).send(slot);
});

const querySlots = catchAsync(async (req, res) => {
  const filter = {};
  const options = {};
  const slots = await slotService.querySlots(filter, options);
  res.status(httpStatus.CREATED).send(slots);
});

const getSinglelot = catchAsync(async (req, res) => {
  const slot = await slotService.getSingleSlot(req.params.slotId);
  if (!slot) {
    throw new ApiError(httpStatus.NOT_FOUND, "No slot found!");
  }
  return res.status(httpStatus.OK).send(slot);
});
// const updateSlot = catchAsync(async (req, res) => {
//   let slotId = req.params.slotId;
//   let updateBody = req.body;
//   const slot = await slotService.updateSlot(updateBody);
//   res.status(httpStatus.CREATED).send(slot);
// });

const deleteSlot = catchAsync(async (req, res) => {
  const msg = await slotService.deleteSlot(req.params.slotId);
  res.status(httpStatus.CREATED).send(msg);
});

module.exports = {
  createSlot,
  querySlots,
  getSinglelot,
  // updateSlot,
  deleteSlot,
};
