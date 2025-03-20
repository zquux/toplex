import React from "react";
import { Link } from "react-router-dom";
import { MessageSquare, Settings, LogOut, LogIn } from "lucide-react";
import { useAuthStore } from "../store/authStore";

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuthStore();
  const handleLogout = () => {
    logout();
  };
  return (
    <header className="fixed w-full top-0 z-1">
      <div className="container mx-auto px-4 h-16">
        <div className="flex items-center justify-between h-full">
          <div className="flex items-center gap-8">
            <Link
              to="/"
              className="flex items-center gap-2.5 hover:opacity-80 transition-all"
            >
              <div className="size-9 rounded-lg br-primary/10 flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-primary text-white" />
              </div>
              <h1 className="text-lg font-bold text-green-400">Toplex</h1>
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <Link to={"/settings"} className={`flex items-center gap-2 m-3`}>
              <Settings className="size-4 text-green-400" />
              <span className="hidden sm:inline text-white">Settings</span>
            </Link>
            {isAuthenticated ? (
              <button
                className="flex gap-2 items-center cursor-pointer border p-2 border-white rounded-lg bg-transparent"
                onClick={handleLogout}
              >
                <LogOut className="size-5 text-green-400" />
                <span className="hidden sm:inline text-white">Logout</span>
              </button>
            ) : (
              <button
                className="flex gap-2 items-center cursor-pointer border p-2 border-white rounded-lg bg-transparent"
                onClick={handleLogout}
              >
                <LogIn className="size-5 text-green-400" />
                <span className="hidden sm:inline text-white">Login</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
