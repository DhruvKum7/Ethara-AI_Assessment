import { useEffect, useState } from "react";
import API from "../api";
import { Plus, FolderKanban, Calendar, Users, AlertCircle } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState({ title: "", description: "" });
  const [showForm, setShowForm] = useState(false);
  const { user } = useAuth();

  const loadProjects = async () => {
    const res = await API.get("/projects");
    setProjects(res.data);
  };

  const createProject = async () => {
    if (!form.title.trim() || !form.description.trim()) {
      alert("Please fill in all fields");
      return;
    }

    try {
      await API.post("/projects", {
        title: form.title,
        description: form.description,
        memberEmails: []
      });

      setForm({ title: "", description: "" });
      setShowForm(false);
      loadProjects();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to create project");
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const canCreateProject = user?.role === "admin";

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            Projects
          </h1>
          <p className="text-gray-600 mt-2">Manage and organize your projects</p>
        </div>
        {canCreateProject && (
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
          >
            <Plus className="w-5 h-5" />
            <span className="font-medium">New Project</span>
          </button>
        )}
      </div>

      {/* Role-based Message */}
      {!canCreateProject && (
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-start space-x-3">
          <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-medium text-blue-900">Member Access</p>
            <p className="text-sm text-blue-700">Only administrators can create projects. Contact an admin to create a new project.</p>
          </div>
        </div>
      )}

      {/* Create Project Form */}
      {showForm && canCreateProject && (
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Create New Project</h2>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Project Title
              </label>
              <input
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="Enter project title"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 h-32 resize-none"
                placeholder="Describe your project"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
              />
            </div>
            <div className="flex space-x-4">
              <button
                onClick={createProject}
                className="bg-gradient-to-r from-green-600 to-teal-600 text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all duration-300 hover:-translate-y-1 font-medium"
              >
                Create Project
              </button>
              <button
                onClick={() => setShowForm(false)}
                className="bg-gray-200 text-gray-700 px-6 py-3 rounded-xl hover:bg-gray-300 transition-all duration-200 font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div
            key={project._id}
            className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl">
                <FolderKanban className="w-8 h-8 text-blue-600" />
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{project.title}</h3>
              <p className="text-gray-600 mb-4 line-clamp-3">{project.description}</p>
              <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center space-x-1">
                  <Calendar className="w-4 h-4" />
                  <span>Created {new Date(project.createdAt || Date.now()).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Users className="w-4 h-4" />
                  <span>{project.memberEmails?.length || 0} members</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {projects.length === 0 && (
        <div className="text-center py-16">
          <FolderKanban className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-gray-500 mb-2">No projects yet</h3>
          <p className="text-gray-400">Create your first project to get started</p>
        </div>
      )}
    </div>
  );
}