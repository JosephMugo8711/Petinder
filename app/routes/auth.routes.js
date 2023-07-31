const express = require("express");
const router = express.Router();

const { verifySignUp } = require("../middlewares");
const controller = require("../controllers/auth.controller");

// Route for user signup
router.post("/api/auth/signup", [verifySignUp.checkDuplicateUsernameOrEmail], controller.signup);

// Route for user login
router.post("/api/auth/signin", controller.signin);

// Route for user logout
router.post("/api/auth/signout", controller.signout);

module.exports = router;
