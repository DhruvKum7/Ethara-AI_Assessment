const projectService = require("../services/projectService");

class ProjectController {
  async createProject(req, res, next) {
    try {
      const project = await projectService.createProject(req.body, req.user);
      res.status(201).json({
        message: "Project created successfully",
        project
      });
    } catch (error) {
      next(error);
    }
  }

  async getProjects(req, res, next) {
    try {
      const projects = await projectService.getProjects(req.user);
      res.status(200).json(projects);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new ProjectController();