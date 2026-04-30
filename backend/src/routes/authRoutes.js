const express = require("express");
const authService = require("../services/authService");

const router = express.Router();

router.post("/signup", async (req, res, next) => {
  try {
    console.log("DIRECT SIGNUP BODY:", req.body);
    const result = await authService.signup(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const result = await authService.login(req.body);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

module.exports = router;