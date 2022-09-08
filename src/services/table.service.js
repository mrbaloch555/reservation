const httpStatus = require("http-status");
const { Table } = require("../models");
const ApiError = require("../utils/ApiError");
const ApiFeatures = require("./../utils/apiFeature");
/**
 * Create a event
 * @param {Object} event
 * @returns {Promise<User>}
 */
const createTable = async (table) => {
  const result = await Table.create(table);
  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Failed To Create table");
  }
  return result;
};

const getAllTable = async (queryData) => {
  const table = await Model.find();
  if (!table.length > 0) {
    throw new ApiError(httpStatus.BAD_REQUEST, "No table Found");
  }
  return table;
};
module.exports = {
  createTable,
  getAllTable,
};
