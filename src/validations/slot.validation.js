const Joi = require("joi");
const { objectId } = require("./custom.validation");
const createSlot = {
  body: Joi.object()
    .keys({
      startTime: Joi.string().required(),
      endTime: Joi.string().required(),
    })
    .min(1),
};

const getSingleSlot = {
  query: Joi.object().keys({
    slotId: Joi.string().custom(objectId),
  }),
};

const updateSlot = {
  query: Joi.object().keys({
    slotId: Joi.string().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      startTime: Joi.string().allow().optional(),
      endTime: Joi.string().allow().optional(),
    })
    .min(1),
};

const deleteSlot = {
  query: Joi.object().keys({
    slotId: Joi.string().custom(objectId),
  }),
};
module.exports = {
  createSlot,
  getSingleSlot,
  updateSlot,
  deleteSlot,
};
