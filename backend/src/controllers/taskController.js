const taskService = require("../services/taskService");

class TaskController {
  async createTask(req, res, next) {
    try {
      const task = await taskService.createTask(req.body, req.user);
      res.status(201).json({
        message: "Task created successfully",
        task
      });
    } catch (error) {
      next(error);
    }
  }

  async getTasks(req, res, next) {
    try {
      const tasks = await taskService.getTasks(req.user);
      res.status(200).json(tasks);
    } catch (error) {
      next(error);
    }
  }

  async updateTaskStatus(req, res, next) {
    try {
      const task = await taskService.updateTaskStatus(
        req.params.id,
        req.body.status,
        req.user
      );

      res.status(200).json({
        message: "Task status updated successfully",
        task
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new TaskController();