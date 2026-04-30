const dashboardService = require("../services/dashboardService");

class DashboardController {
  async getDashboard(req, res, next) {
    try {
      const dashboard = await dashboardService.getDashboard(req.user);
      res.status(200).json(dashboard);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new DashboardController();