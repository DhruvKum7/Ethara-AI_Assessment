import { useEffect, useState } from "react";
import API from "../api";
import {
  BarChart3,
  Clock,
  CheckCircle,
  AlertTriangle,
  FolderKanban,
  CheckSquare
} from "lucide-react";

export default function Dashboard() {
  const [data, setData] = useState({});

  useEffect(() => {
    API.get("/dashboard")
      .then((res) => setData(res.data))
      .catch(() => alert("Dashboard loading failed"));
  }, []);

  const stats = [
    {
      title: "Total Tasks",
      value: data.total || 0,
      icon: BarChart3,
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      title: "Pending",
      value: data.pending || 0,
      icon: Clock,
      color: "from-yellow-500 to-yellow-600",
      bgColor: "bg-yellow-50"
    },
    {
      title: "In Progress",
      value: data.inProgress || 0,
      icon: AlertTriangle,
      color: "from-orange-500 to-orange-600",
      bgColor: "bg-orange-50"
    },
    {
      title: "Completed",
      value: data.completed || 0,
      icon: CheckCircle,
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50"
    },
    {
      title: "Overdue",
      value: data.overdue || 0,
      icon: AlertTriangle,
      color: "from-red-500 to-red-600",
      bgColor: "bg-red-50"
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            Dashboard
          </h1>
          <p className="text-gray-600 mt-2">Welcome back! Here's your project overview.</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.title}
              className={`${stat.bgColor} p-6 rounded-2xl border border-gray-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl bg-gradient-to-r ${stat.color}`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button className="flex items-center space-x-4 p-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <FolderKanban className="w-8 h-8" />
            <div className="text-left">
              <p className="font-semibold text-lg">Manage Projects</p>
              <p className="text-blue-100 text-sm">Create and organize your projects</p>
            </div>
          </button>
          <button className="flex items-center space-x-4 p-6 bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-xl hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <CheckSquare className="w-8 h-8" />
            <div className="text-left">
              <p className="font-semibold text-lg">Manage Tasks</p>
              <p className="text-green-100 text-sm">Track and update your tasks</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}