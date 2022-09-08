const express = require("express");
const validate = require("../middlewares/validate");
const { blogValidation } = require("./../validations");
const { blogController } = require("../controllers");
const { fileUpload } = require("./../utils/fileUpload");
const {
  requireSignin,
  adminMiddleware,
  userMiddleware,
} = require("./../middlewares/auth");
const router = express.Router();

router
  .route("/")
  .post(
    requireSignin,
    adminMiddleware,
    fileUpload.array("blogPicture"),
    blogController.createBlog
  )
  .get(requireSignin, blogController.getAllBlogs);
router
  .route("/:blogId")
  .patch(
    requireSignin,
    adminMiddleware,
    fileUpload.array("blogPicture"),
    blogController.updateBlog
  )
  .delete(requireSignin, adminMiddleware, blogController.deletBlog);

module.exports = router;
