import { Link, Outlet, useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import Navbar from "./Navbar";


const Home = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    return (
        <div className="flex h-screen flex-col">
            {/* Navbar */}
            <Navbar />

            <div className="flex flex-1">
                {/* Sidebar */}
                <aside className="w-64 bg-gray-800 text-white p-4">
                    <h2 className="text-xl font-bold">Welcome Theophile</h2>
                    <ul className="mt-4">
                        <li className="py-4 px-4 hover:bg-gray-700 text-base rounded cursor-pointer">
                            <Link to="/home/overview">Overview</Link>
                        </li>
                        <li className="py-4 px-4 hover:bg-gray-700 text-base rounded cursor-pointer">
                            <Link to="/home/ai-chatbot">AI Chatbot</Link>
                        </li>
                        <li className="py-4 px-4 hover:bg-gray-700 text-base rounded cursor-pointer">
                            <Link to="/home/crop-monitoring">Crop Monitoring</Link>
                        </li>
                        <li className="py-4 px-4 hover:bg-gray-700 text-base rounded cursor-pointer">
                            <Link to="/home/weather-forecast">Weather Forecast</Link>
                        </li>
                        <li className="py-4 px-4 hover:bg-gray-700 text-base rounded cursor-pointer">
                            <Link to="/home/pest-disease-alerts">Pest and Disease Alerts</Link>
                        </li>
                        <li className="py-4 px-4 hover:bg-gray-700 text-base rounded cursor-pointer">
                            <Link to="/home/soil-health-analysis">Soil Health Analysis</Link>
                        </li>
                        <li className="py-4 px-4 hover:bg-gray-700 text-base rounded cursor-pointer">
                            <Link to="/home/market-prices">Market Prices</Link>
                        </li>
                        <li className="py-4 px-4 hover:bg-gray-700 text-base rounded cursor-pointer">
                            <Link to="/home/reports-analytics">Reports & Analytics</Link>
                        </li>
                    </ul>
                    <Button className="mt-6 w-full bg-red-500 hover:bg-red-700" onClick={handleLogout}>
                        Logout
                    </Button>
                </aside>

                {/* Main Content (Dynamic Content Changes Here) */}
                <main className="flex-1 p-6 bg-gray-100">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default Home;
