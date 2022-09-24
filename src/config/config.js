const dotenv = require("dotenv");
const path = require("path");
const Joi = require("joi");
dotenv.config({ path: path.join(__dirname, "../../.env") });

const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string()
      .valid("production", "development", "test")
      .required(),
    ROOT_PATH: Joi.string().required(),
    MONGODB_URL: Joi.string().required().description("Mongo DB url"),
    PORT: Joi.number(),
    JWT_SECRET: Joi.string(),
    MAX_SLOTS_PER_DAY: Joi.number()
      .required()
      .description("Please add max serseve slots of single time period"),
  })
  .unknown();

const { value: envVars, error } = envVarsSchema
  .prefs({ errors: { label: "key" } })
  .validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

module.exports = {
  env: envVars.NODE_ENV,
  rootPath: envVars.ROOT_PATH,
  port: envVars.PORT,
  mongoose: {
    url: envVars.MONGODB_URL + (envVars.NODE_ENV === "test" ? "-test" : ""),
    options: {
      // useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  },
  JWT_SECRET: envVars.JWT_SECRET,
  maxReserverSlotsPerDay: envVars.MAX_SLOTS_PER_DAY,
};
