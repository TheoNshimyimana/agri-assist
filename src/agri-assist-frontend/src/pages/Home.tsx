import { Link, Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";
import { AuthClient } from "@dfinity/auth-client";
import { Button } from "../components/ui/button";
import Navbar from "./Navbar";

const Home = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [principal, setPrincipal] = useState("");
  const navigate = useNavigate();

  const handleLogout = async () => {
    const authClient = await AuthClient.create();
    await authClient.logout();
    setIsAuthenticated(false);
    setPrincipal("");
    navigate("/");
  };

  return (
    <div className="flex h-screen flex-col">
      {/* Navbar */}
      <Navbar />

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar (Scrollable Independently) */}
        <aside className="w-64 bg-gray-800 text-white p-4 h-full overflow-y-auto">
          <h2 className="text-base text-green-500 font-bold">Ai-Powered AGRI-Assist</h2>
          <ul className="mt-4">
            <Link to="/home/overview">
              <li className="py-4 px-4 hover:bg-gray-700 text-base rounded cursor-pointer">
                Overview
              </li>
            </Link>
            <Link to="/home/ai-chatbot">
              <li className="py-4 px-4 hover:bg-gray-700 text-base rounded cursor-pointer">
                AI Chatbot
              </li>
            </Link>
            <Link to="/home/crop-monitoring">
              <li className="py-4 px-4 hover:bg-gray-700 text-base rounded cursor-pointer">
                Crop Monitoring
              </li>
            </Link>
            <Link to="/home/weather-forecast">
              <li className="py-4 px-4 hover:bg-gray-700 text-base rounded cursor-pointer">
                Weather Forecast
              </li>
            </Link>
            <Link to="/home/pest-disease-alerts">
              <li className="py-4 px-4 hover:bg-gray-700 text-base rounded cursor-pointer">
                Pest and Disease Alerts
              </li>
            </Link>
            <Link to="/home/soil-health-analysis">
              <li className="py-4 px-4 hover:bg-gray-700 text-base rounded cursor-pointer">
                Soil Health Analysis
              </li>
            </Link>
            <Link to="/home/market-prices">
              <li className="py-4 px-4 hover:bg-gray-700 text-base rounded cursor-pointer">
                Market Prices
              </li>
            </Link>
            <Link to="/home/reports-analytics">
              <li className="py-4 px-4 hover:bg-gray-700 text-base rounded cursor-pointer">
                Reports & Analytics
              </li>
            </Link>
          </ul>
          <Button
            className="mt-6 w-full bg-red-500 hover:bg-red-700"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </aside>

        {/* Main Content (Scrollable Independently) */}
        <main className="flex-1 p-6 bg-gray-100 overflow-y-auto h-full">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Home;