"use strict";
const AUthController = require("../../src/controllers/auth");
const express = require("express");
const router = express.Router();

router.post("/login", AUthController.login);
router.get("/logout", AUthController.checkLogin, AUthController.logout);
router.post("/register", AUthController.register);
router.post(
  "/changePassword",
  AUthController.checkLogin,
  AUthController.changePassword
);

module.exports = router;
