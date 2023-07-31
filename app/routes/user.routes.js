const express = require("express");
const router = express.Router();

const { authJwt } = require("../middlewares");
const controller = require("../controllers/user.controller");

// Route for public access
router.get("/api/test/all", controller.publicAccess);

// Route for logged-in users (any role)
router.get("/api/test/user", [authJwt.verifyToken], controller.loggedIn);

// Route for service provider users
router.get("/api/test/provider", [authJwt.verifyToken, authJwt.isServiceProvider], controller.serviceProvider);

// Route for admin users
router.get("/api/test/admin", [authJwt.verifyToken, authJwt.isAdmin], controller.admin);

// Route for pet owner users
router.get("/api/test/petowner", [authJwt.verifyToken, authJwt.isPetOwner], controller.petOwner);

module.exports = router;
