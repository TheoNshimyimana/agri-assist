import { useState } from "react";
import { AuthClient } from "@dfinity/auth-client";
import { Button } from "../components/ui/button";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import Navbar from "./Navbar";

const Home = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [principal, setPrincipal] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    const authClient = await AuthClient.create();
    await authClient.logout();
    setIsAuthenticated(false);
    setPrincipal("");
    navigate("/");
  };

  const menuItems = [
    { path: "/home/overview", label: "Overview" },
    { path: "/home/ai-chatbot", label: "AI Chatbot" },
    { path: "/home/crop-monitoring", label: "Crop Monitoring" },
    { path: "/home/weather-forecast", label: "Weather Forecast" },
    { path: "/home/pest-disease-alerts", label: "Pest and Disease Alerts" },
    { path: "/home/soil-health-analysis", label: "Soil Health Analysis" },
    { path: "/home/market-prices", label: "Market Prices" },
    { path: "/home/reports-analytics", label: "Reports & Analytics" },
  ];

  return (
    <div className="flex h-screen flex-col">
      {/* Navbar Fixed at the top */}
      <Navbar />

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar starts below the navbar and scrolls independently */}
        <aside className="w-64 bg-gray-900 text-white pl-4 h-full fixed top-[64px] left-0 bottom-0 overflow-y-auto">
          <h2 className="text-lg text-green-500 font-bold mt-4">
            AI-Powered AGRI-Assist
          </h2>
          <ul className="mt-4 space-y-1">
            {menuItems.map((item) => (
              <li key={item.path}>
                <Link to={item.path}>
                  <div
                    className={`py-3 px-4 text-base cursor-pointer transition-all duration-300 flex items-center ${
                      location.pathname === item.path
                        ? "bg-green-600 text-white font-semibold shadow-lg"
                        : "hover:bg-gray-500"
                    }`}
                  >
                    {item.label}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
          <Button
            className="mt-6 w-full bg-red-500 hover:bg-red-700 transition-all my-4 duration-300 shadow-md"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </aside>

        {/* Main Content Area (Scrollable) */}
        <main className="flex-1 ml-64 p-6 bg-white overflow-y-auto h-screen">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Home;
