const express = require("express");
// const auth = require("../middlewares/auth");

const { userController } = require("../controllers");

const router = express.Router();


router
  .route("/createConnection")
  .post(userController.createChatConnection);

router
  .route("/checkConnection/:data")
  .get(userController.getChatConnection);

module.exports = router;
