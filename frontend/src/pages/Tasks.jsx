import { useEffect, useState } from "react";
import API from "../api";
import { Plus, CheckSquare, Clock, AlertTriangle, CheckCircle, Calendar } from "lucide-react";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    project: "",
    dueDate: ""
  });
  const [showForm, setShowForm] = useState(false);

  const loadData = async () => {
    const t = await API.get("/tasks");
    const p = await API.get("/projects");

    setTasks(t.data);
    setProjects(p.data);
  };

  const createTask = async () => {
    if (!form.title.trim() || !form.description.trim() || !form.project || !form.dueDate) {
      alert("Please fill in all fields");
      return;
    }

    const user = JSON.parse(atob(localStorage.getItem("token").split(".")[1]));

    await API.post("/tasks", {
      ...form,
      assignedTo: user.id,
      priority: "medium"
    });

    setForm({ title: "", description: "", project: "", dueDate: "" });
    setShowForm(false);
    loadData();
  };

  const updateStatus = async (id, status) => {
    await API.patch(`/tasks/${id}/status`, { status });
    loadData();
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "pending":
        return <Clock className="w-5 h-5 text-yellow-600" />;
      case "in-progress":
        return <AlertTriangle className="w-5 h-5 text-orange-600" />;
      case "completed":
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      default:
        return <Clock className="w-5 h-5 text-gray-600" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "in-progress":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "completed":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            Tasks
          </h1>
          <p className="text-gray-600 mt-2">Track and manage your tasks</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center space-x-2 bg-gradient-to-r from-green-600 to-teal-600 text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
        >
          <Plus className="w-5 h-5" />
          <span className="font-medium">New Task</span>
        </button>
      </div>

      {/* Create Task Form */}
      {showForm && (
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Create New Task</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Task Title
              </label>
              <input
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                placeholder="Enter task title"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 h-32 resize-none"
                placeholder="Describe the task"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Project
              </label>
              <select
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                value={form.project}
                onChange={(e) => setForm({ ...form, project: e.target.value })}
              >
                <option value="">Select Project</option>
                {projects.map((p) => (
                  <option key={p._id} value={p._id}>
                    {p.title}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Due Date
              </label>
              <input
                type="date"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                value={form.dueDate}
                onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
              />
            </div>
            <div className="md:col-span-2 flex space-x-4">
              <button
                onClick={createTask}
                className="bg-gradient-to-r from-green-600 to-teal-600 text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all duration-300 hover:-translate-y-1 font-medium"
              >
                Create Task
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

      {/* Tasks Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tasks.map((task) => (
          <div
            key={task._id}
            className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 bg-gradient-to-r from-green-100 to-teal-100 rounded-xl">
                <CheckSquare className="w-8 h-8 text-green-600" />
              </div>
              <div className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(task.status)}`}>
                <div className="flex items-center space-x-1">
                  {getStatusIcon(task.status)}
                  <span className="capitalize">{task.status.replace("-", " ")}</span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{task.title}</h3>
              <p className="text-gray-600 mb-4 line-clamp-3">{task.description}</p>
              <div className="space-y-2 text-sm text-gray-500">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4" />
                  <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>
                </div>
                {task.project && (
                  <div className="flex items-center space-x-2">
                    <CheckSquare className="w-4 h-4" />
                    <span>Project: {projects.find(p => p._id === task.project)?.title || 'Unknown'}</span>
                  </div>
                )}
              </div>
            </div>
            <div className="flex space-x-2 mt-6">
              <button
                onClick={() => updateStatus(task._id, "pending")}
                className="flex-1 bg-yellow-100 text-yellow-700 px-3 py-2 rounded-lg hover:bg-yellow-200 transition-all duration-200 text-sm font-medium"
              >
                Pending
              </button>
              <button
                onClick={() => updateStatus(task._id, "in-progress")}
                className="flex-1 bg-orange-100 text-orange-700 px-3 py-2 rounded-lg hover:bg-orange-200 transition-all duration-200 text-sm font-medium"
              >
                In Progress
              </button>
              <button
                onClick={() => updateStatus(task._id, "completed")}
                className="flex-1 bg-green-100 text-green-700 px-3 py-2 rounded-lg hover:bg-green-200 transition-all duration-200 text-sm font-medium"
              >
                Completed
              </button>
            </div>
          </div>
        ))}
      </div>

      {tasks.length === 0 && (
        <div className="text-center py-16">
          <CheckSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-gray-500 mb-2">No tasks yet</h3>
          <p className="text-gray-400">Create your first task to get started</p>
        </div>
      )}
    </div>
  );
}