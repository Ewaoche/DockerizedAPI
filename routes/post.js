const express = require("express");

const router = express.Router();

const postController = require("../controllers/postController");
const protect = require("../middleware/authMeddleware");

router
.route("/")
.post(protect,postController.createPostController)
.get(postController.getAllPostsController)

router
.route("/:id")
.get(protect,postController.getPostController)
.put(protect,postController.updatePostController)
.delete(protect,postController.deletePostController)


module.exports = router;