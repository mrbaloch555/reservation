const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");
const { tableService } = require("../services");

const createTable = catchAsync(async (req, res) => {

  let table = req.body;
  const tableResult = await tableService.createTable(table);
  res.status(httpStatus.CREATED).send(tableResult);
});

const getAlltables = catchAsync(async (req, res) => {
  const table = await tableService.getAllTables(req.query);
  res.status(httpStatus.CREATED).send(table);
});

module.exports = {
    createTable,
    getAlltables
};
