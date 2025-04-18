


// Navbar.tsx
import { useState } from "react";
import { Bell } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "../components/ui/button";

const Navbar = () => {
  const location = useLocation();
   const [notifications, setNotifications] = useState(3);

  return (
    <div className="bg-white dark:bg-gray-900 shadow-md p-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
        Ai-Powered AGRI-Assist (AI for Sustainable Farming) 🌱
      </h1>

      <div className="flex items-center mr-6 gap-5">
        <Link to="/home/documentation">
          <Button
            variant="ghost"
            className="rounded-full text-lg p-2 flex items-center text-white gap-2"
          >
            Docs
          </Button>
        </Link>
        <Link to="/home/my-wallet">
          <Button
            variant="ghost"
            className="rounded-full text-lg p-2 flex items-center text-white gap-2"
          >
            Wallet
          </Button>
        </Link>
        <Link to="/home/stock">
          <Button
            variant="ghost"
            className="rounded-full text-lg p-2 flex items-center text-white gap-2"
          >
            Stock
          </Button>
        </Link>
        <div className="relative cursor-pointer">
          <Bell className="w-6 h-6 text-gray-700 dark:text-gray-300" />
          {notifications > 0 && (
            <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs rounded-full px-1">
              {notifications}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;

