import { useNavigate, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  FolderKanban,
  CheckSquare,
  LogOut,
  User,
  Home,
  Shield,
  Users
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Layout({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();

  const menuItems = [
    { path: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { path: "/projects", label: "Projects", icon: FolderKanban, adminOnly: true },
    { path: "/tasks", label: "Tasks", icon: CheckSquare },
  ];

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const visibleMenuItems = menuItems.filter(item => {
    if (item.adminOnly && user?.role !== "admin") return false;
    return true;
  });

  const getRoleBadgeColor = (role) => {
    return role === "admin"
      ? "bg-purple-100 text-purple-700 border-purple-200"
      : "bg-blue-100 text-blue-700 border-blue-200";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-full w-64 bg-white shadow-xl border-r border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
              <Home className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                EtharaFlow
              </h1>
              <p className="text-xs text-gray-500">Project Management</p>
            </div>
          </div>
        </div>

        <nav className="p-4 space-y-2">
          {visibleMenuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                  isActive
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                    : "text-gray-700 hover:bg-gray-100 hover:text-blue-600"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
          {/* User Info */}
          <div className="mb-4 p-4 bg-gradient-to-br from-slate-50 to-blue-50 rounded-xl border border-gray-200">
            <div className="flex items-center space-x-2 mb-2">
              <User className="w-4 h-4 text-gray-600" />
              <p className="text-xs font-medium text-gray-600">Logged in as</p>
            </div>
            <p className="text-sm font-semibold text-gray-900 truncate">{user?.name}</p>
            <p className="text-xs text-gray-500 truncate">{user?.email}</p>
            <div className={`inline-block px-2 py-1 rounded-full text-xs font-medium border mt-2 ${getRoleBadgeColor(user?.role)}`}>
              <div className="flex items-center space-x-1">
                <Shield className="w-3 h-3" />
                <span className="capitalize">{user?.role}</span>
              </div>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 transition-all duration-200"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-64">
        <main className="p-8">
          {children}
        </main>
      </div>
    </div>
  );
}