const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");
const { adminService} = require("../services");

const register = catchAsync(async (req, res) => {
  let body = req.body;
  body.role = 'admin'
  const user = await adminService.register(body);
  res.status(httpStatus.CREATED).send(user);
});


const login = catchAsync(async (req, res) => {
  let body = req.body;
  const user = await adminService.login(body);
  res.status(httpStatus.CREATED).send(user);
});

const updateAdmin = catchAsync(async (req, res) => {
  let body = req.body;
  if(body.password){
   body.password = bcrypt.hashSync(body.password,10)
  }

  if(body.confrimPassword){
    body.confrimPassword = bcrypt.hashSync(body.confrimPassword,10)
   }
  let query = req.params.userId
  const user = await adminService.updateAdmin(query,body);
  res.status(httpStatus.CREATED).send(user);
});

const deleteAdmin = catchAsync(async (req, res) => {
  let query = req.params.userId
  const user = await adminService.deleteAdmin(query);
  res.status(httpStatus.CREATED).send(user);
});
module.exports = {
  register,
  login,
  updateAdmin,
  deleteAdmin
};
