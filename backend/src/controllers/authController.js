const authService = require("../services/authService");

class AuthController {
  async signup(req, res, next) {
    try {
    //  console.log("SIGNUP BODY:", req.body);

      const result = await authService.signup(req.body);

      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  }

  async login(req, res, next) {
    try {
      const result = await authService.login(req.body);

      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new AuthController();