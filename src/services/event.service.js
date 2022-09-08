const httpStatus = require("http-status");
const { Event } = require("../models");
const ApiError = require("../utils/ApiError");
const ApiFeatures = require("./../utils/apiFeature");
/**
 * Create a event
 * @param {Object} event
 * @returns {Promise<User>}
 */
const createEvent = async (event) => {
  try {
    const result = await Event.create(event);
    if (!result) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Failed To Create Event");
    }
    return result;
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, error);
  }
};

const getAllEvent = async (queryData) => {
  const resultPerPage = 8;
  const eventCount = await Event.countDocuments();
  const apiFeature = new ApiFeatures(Event.find(), queryData)
    .search()
    .filter()
    .pagination(resultPerPage);
  const event = await apiFeature.query;
  if (!event.length > 0) {
    throw new ApiError(httpStatus.BAD_REQUEST, "No Event Found");
  }
  let changeImg = [];
  event.map((data) => {
    changeImg = data.eventPicture.map((item) => {
      return { img: item.img };
    });
  });
  event.eventPicture = changeImg;
  return { event, eventCount };
};

const updateEvent = async (id, body) => {
  const result = await Event.findByIdAndUpdate(id, body, { new: true });
  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, "No Event Found");
  }
  return result;
};

const deleteEvent = async (id) => {
  const result = await Event.findByIdAndRemove(id);
  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, "No Event Found");
  }
  return "Event Deleted Successfully";
};
module.exports = {
  createEvent,
  getAllEvent,
  updateEvent,
  deleteEvent,
};
