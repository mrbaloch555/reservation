const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");
const { eventService } = require("../services");
const config = require("../config/config");

const createEvent = catchAsync(async (req, res) => {
  let eventPicture = [];
  if (req.files.length > 0) {
    eventPicture = req.files.map((file) => {
      return { img: file.filename };
    });
  }
  let event = req.body;
  event.eventPicture = eventPicture;
  const eventResult = await eventService.createEvent(event);
  res.status(httpStatus.CREATED).send(eventResult);
});

const getAllEvent = catchAsync(async (req, res) => {
  const event = await eventService.getAllEvent(req.query);
  event.event = event.event.map((element) => {
    element.eventPicture.map((el) => {
      el.img = config.rootPath + el.img;
    });
    return element;
  });
  res.status(httpStatus.CREATED).send(event);
});

const updateEvent = catchAsync(async (req, res) => {
  let eventId = req.params.eventId;
  let eventPicture = [];
  if (req.files) {
    if (req.files.length > 0) {
      eventPicture = req.files.map((file) => {
        return { img: file.filename };
      });
    }
  }

  let body = req.body;
  if (eventPicture.length > 0) {
    body.eventPicture = eventPicture;
  }
  const event = await eventService.updateEvent(eventId, body);
  if (event.eventPicture.length > 0)
    event.eventPicture.forEach((element) => {
      element.img = config.rootPath + element.img;
    });
  res.status(httpStatus.CREATED).send(event);
});

const deleteEvent = catchAsync(async (req, res) => {
  let eventId = req.params.eventId;
  const product = await eventService.deleteEvent(eventId);
  res.status(httpStatus.CREATED).send(product);
});

module.exports = {
  createEvent,
  getAllEvent,
  updateEvent,
  deleteEvent,
};
