const Project = require("../models/Project");

class ProjectRepository {
  async createProject(projectData) {
    return await Project.create(projectData);
  }

  async findAdminProjects(adminId) {
    return await Project.find({ owner: adminId })
      .populate("owner", "name email role")
      .populate("members", "name email role");
  }

  async findMemberProjects(memberId) {
    return await Project.find({ members: memberId })
      .populate("owner", "name email role")
      .populate("members", "name email role");
  }

  async findById(projectId) {
    return await Project.findById(projectId);
  }
}

module.exports = new ProjectRepository();