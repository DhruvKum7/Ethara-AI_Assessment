const Task = require("../models/Task");

class TaskRepository {
  async createTask(taskData) {
    return await Task.create(taskData);
  }

  async findAdminTasks(adminId) {
    return await Task.find({ createdBy: adminId })
      .populate("project", "title")
      .populate("assignedTo", "name email role")
      .sort({ createdAt: -1 });
  }

  async findMemberTasks(memberId) {
    return await Task.find({ assignedTo: memberId })
      .populate("project", "title")
      .populate("assignedTo", "name email role")
      .sort({ createdAt: -1 });
  }

  async findById(taskId) {
    return await Task.findById(taskId);
  }

  async updateTask(task) {
    return await task.save();
  }

  async getTasksByFilter(filter) {
    return await Task.find(filter);
  }
}

module.exports = new TaskRepository();