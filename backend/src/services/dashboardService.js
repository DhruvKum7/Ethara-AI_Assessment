const taskRepository = require("../repositories/taskRepository");

class DashboardService {
  async getDashboard(user) {
    const filter =
      user.role === "admin"
        ? { createdBy: user.id }
        : { assignedTo: user.id };

    const tasks = await taskRepository.getTasksByFilter(filter);

    const total = tasks.length;
    const pending = tasks.filter((task) => task.status === "pending").length;
    const inProgress = tasks.filter((task) => task.status === "in-progress").length;
    const completed = tasks.filter((task) => task.status === "completed").length;

    const overdue = tasks.filter(
      (task) =>
        new Date(task.dueDate) < new Date() &&
        task.status !== "completed"
    ).length;

    return {
      total,
      pending,
      inProgress,
      completed,
      overdue
    };
  }
}

module.exports = new DashboardService();