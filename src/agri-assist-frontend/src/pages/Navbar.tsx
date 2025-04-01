import { useState, useEffect } from "react";
import { Bell, Moon, Sun, User } from "lucide-react";
import { Button } from "../components/ui/button";

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );
  const [showDropdown, setShowDropdown] = useState(false);
  const [notifications, setNotifications] = useState(3); // Example notification count

  // Handle dark mode toggle
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md p-4 flex justify-between items-center">
      {/* Logo */}
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Ai-Powered AGRI-Assist (AI for Sustainable Farming) 🌱</h1>

      {/* Icons */}
      <div className="flex items-center gap-4">
        {/* Notification Icon */}
        <div className="relative cursor-pointer">
          <Bell className="w-6 h-6 text-gray-700 dark:text-gray-300" />
          {notifications > 0 && (
            <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs rounded-full px-1">
              {notifications}
            </span>
          )}
        </div>

        {/* Dark Mode Toggle */}
        <Button
          variant="ghost"
          onClick={() => setDarkMode(!darkMode)}
          className="rounded-full p-2"
        >
          {darkMode ? <Sun className="w-6 h-6 text-yellow-400" /> : <Moon className="w-6 h-6 text-white" />}
        </Button>

        {/* User Dropdown */}
        <div className="relative">
          <button onClick={() => setShowDropdown(!showDropdown)} className="focus:outline-none">
            <User className="w-8 h-8 text-white dark:text-gray-300 rounded-full border p-1" />
          </button>

          {showDropdown && (
            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
              <ul className="py-2">
                <li className="px-4 py-2 text-white hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer">
                  Profile
                </li>
                <li
                  className="px-4 py-2 text-white hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer"
                  onClick={() => console.log("Logging out")}
                >
                  Logout
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
