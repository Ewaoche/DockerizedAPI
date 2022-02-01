const express = require("express");

const router = express.Router();

const UserController = require("../controllers/authController");




router.post("/register", UserController.signUp)
router.post("/login", UserController.signIn)


module.exports = router;