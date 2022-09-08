const httpStatus = require("http-status");
const { Slots } = require("../models");
const ApiError = require("../utils/ApiError");
const ApiFeatures = require("./../utils/apiFeature");
const moment = require("moment");
/**
 * Create a event
 * @param {Object} event
 * @returns {Promise<Slot>}
 */
const createSlot = async (createBody) => {
  const startHours = createBody.startTime.slice(0, 2);
  const startMinutes = createBody.startTime.slice(3);
  const endHours = createBody.endTime.slice(0, 2);
  const endMinutes = createBody.endTime.slice(3);
  const slots = await Slots.find({
    "startTime.hour": { $gte: Number(startHours), $lt: Number(endHours) },
  });
  if (slots.length > 0) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Slot already exists");
  }
  const newBody = {
    startTime: {
      hour: startHours,
      minutes: startMinutes,
    },
    endTime: {
      hour: endHours,
      minutes: endMinutes,
    },
  };
  return await Slots.create(newBody);
};

/**
 *
 * @param {*} filter
 * @param {*} options
 * @returns {<Results>}
 */
const querySlots = async (filter, options) => {
  return await Slots.paginate(filter, options);
};

/**
 *
 * @param {*} id
 * @returns {<Slot>}
 */
const getSingleSlot = async (id) => {
  console.log(id);
  return await Slots.findById(id);
};

// /**
//  *
//  * @param {*} id
//  * @param {*} updateBody
//  * @returns {<Slot>}
//  */
// const updateSlot = async (id, updateBody) => {
//   const slot = await Slots.findById(id);
//   if (!slot) throw new ApiError(httpStatus.NOT_FOUND, "No slot found");
//   Object.assign(slot, updateBody);
//   await slot.save();
//   return slot;
// };

const deleteSlot = async (id) => {
  const slot = await Slots.findById(id);
  if (!slot) throw new ApiError(httpStatus.NOT_FOUND, "No slot found");
  await slot.remove();
  return { msg: "slot deleted!" };
};
module.exports = {
  createSlot,
  querySlots,
  // updateSlot,
  getSingleSlot,
  deleteSlot,
};
