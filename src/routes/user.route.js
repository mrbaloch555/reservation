const express = require("express");
// const auth = require("../middlewares/auth");
const validate = require("../middlewares/validate");
const userValidation = require("../validations/user.validation");
const { userController } = require("../controllers");
const { fileUpload } = require("../utils/fileUpload");
const router = express.Router();

router
  .route("/register")
  .post(
    [fileUpload.single("image"), validate(userValidation.register)],
    userController.register
  );
router
  .route("/login")
  .post(validate(userValidation.login), userController.login);
router.route("/latestTime/:userId").get(userController.addLatestTime);
router.route("/").get(userController.getAllUser);
router
  .route("/:userId")
  .patch(fileUpload.single("image"), userController.updateUser)
  .delete(fileUpload.single("image"), userController.deleteUser);
router
  .route("/chatConnection/createConnection")
  .post(userController.createChatConnection);

router
  .route("/chatConnection/checkConnection/:data")
  .get(userController.getChatConnection);

router.route("/forgetPassword").post(userController.forgetPassword);
module.exports = router;
