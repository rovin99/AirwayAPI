const express = require("express");
const router = express.Router();

const { UserControllers } = require("../../controllers");
const { AuthMiddlewares } = require("../../middlewares");

router.post(
  "/signup",
  AuthMiddlewares.validateAuthRequest,
  UserControllers.signup
);


module.exports = router;
