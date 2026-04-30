const taskRepository = require("../repositories/taskRepository");
const projectRepository = require("../repositories/projectRepository");
const ApiError = require("../utils/ApiError");

class TaskService {
  async createTask(data, user) {
    const { title, description, project, assignedTo, priority, dueDate } = data;

    if (!title || !project || !assignedTo || !dueDate) {
      throw new ApiError(400, "Title, project, assigned user and due date are required");
    }

    const existingProject = await projectRepository.findById(project);

    if (!existingProject) {
      throw new ApiError(404, "Project not found");
    }

    if (existingProject.owner.toString() !== user.id) {
      throw new ApiError(403, "You can create tasks only for your own project");
    }

    const task = await taskRepository.createTask({
      title,
      description,
      project,
      assignedTo,
      createdBy: user.id,
      priority: priority || "medium",
      dueDate
    });

    return task;
  }

  async getTasks(user) {
    if (user.role === "admin") {
      return await taskRepository.findAdminTasks(user.id);
    }

    return await taskRepository.findMemberTasks(user.id);
  }

  async updateTaskStatus(taskId, status, user) {
    const allowedStatus = ["pending", "in-progress", "completed"];

    if (!allowedStatus.includes(status)) {
      throw new ApiError(400, "Invalid task status");
    }

    const task = await taskRepository.findById(taskId);

    if (!task) {
      throw new ApiError(404, "Task not found");
    }

    const isAdminOwner = user.role === "admin" && task.createdBy.toString() === user.id;
    const isAssignedMember = task.assignedTo.toString() === user.id;

    if (!isAdminOwner && !isAssignedMember) {
      throw new ApiError(403, "You can update only your own task");
    }

    task.status = status;

    return await taskRepository.updateTask(task);
  }
}

module.exports = new TaskService();