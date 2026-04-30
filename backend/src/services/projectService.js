const projectRepository = require("../repositories/projectRepository");
const userRepository = require("../repositories/userRepository");
const ApiError = require("../utils/ApiError");

class ProjectService {
  async createProject(data, user) {
    const { title, description, memberEmails } = data;

    if (!title) {
      throw new ApiError(400, "Project title is required");
    }

    const members = await userRepository.findByEmails(memberEmails || []);

    const project = await projectRepository.createProject({
      title,
      description,
      owner: user.id,
      members: members.map((member) => member._id)
    });

    return project;
  }

  async getProjects(user) {
    if (user.role === "admin") {
      return await projectRepository.findAdminProjects(user.id);
    }

    return await projectRepository.findMemberProjects(user.id);
  }
}

module.exports = new ProjectService();