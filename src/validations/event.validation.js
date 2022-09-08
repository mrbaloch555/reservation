const Joi = require("joi");


const createEvent = {
  body: Joi.object().keys({
      name:Joi.string(),
      desc:Joi.string(),
      eventPicture:Joi.string(),
  }).min(1),
};


module.exports = {
    createEvent
};
