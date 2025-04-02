import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import {
  FaSeedling,
  FaChartLine,
  FaRobot,
  FaGlobe,
  FaUsers,
  FaCloudSun,
  FaLeaf,
  FaDatabase,
  FaTractor,
} from "react-icons/fa";


ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale
);

const Overview: React.FC = () => {
  const [climateData, setClimateData] = useState<number[]>([]);
  const [cropGrowthData, setCropGrowthData] = useState<number[]>([]);

  
  useEffect(() => {
    const fetchData = () => {
      setClimateData([15, 18, 21, 25, 28, 32, 30, 27, 24, 20, 16, 14]); 
      setCropGrowthData([30, 50, 75, 95, 120, 135, 140, 138, 120, 100, 70, 50]);
    };
    fetchData();
  }, []);

  
  const climateChartData = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Average Temperature (°C)",
        data: climateData,
        borderColor: "#ff9800",
        backgroundColor: "rgba(255, 152, 0, 0.2)",
        tension: 0.4,
      },
    ],
  };

  const cropGrowthChartData = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Crop Growth Rate (%)",
        data: cropGrowthData,
        borderColor: "#4CAF50",
        backgroundColor: "rgba(76, 175, 80, 0.2)",
        tension: 0.4,
      },
    ],
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-green-500 mb-6">
        Climate-Smart AGRI-Assist (AI for Sustainable Farming) 🌱
      </h1>
      <p className="text-gray-700 mb-6 text-xl">
        Welcome to{" "}
        <span className="font-semibold">🌱 Climate Change AGRI-Assist</span>, an
        AI & Blockchain-powered platform for smart farming. Our system provides
        real-time insights and analytics to enhance agricultural productivity
        and sustainability.
      </p>

      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8 w-full max-w-5xl">
        <StatCard
          icon={<FaSeedling />}
          title="50+ Smart Farms"
          description="Farms using AI for monitoring & optimization."
        />
        <StatCard
          icon={<FaChartLine />}
          title="95% Accuracy"
          description="AI-driven climate & crop predictions."
        />
        <StatCard
          icon={<FaRobot />}
          title="AI & IoT Integrated"
          description="Real-time data collection & automation."
        />
        <StatCard
          icon={<FaGlobe />}
          title="10+ Countries"
          description="Implementing AGRI-Assist globally."
        />
        <StatCard
          icon={<FaUsers />}
          title="500+ Farmers"
          description="Actively benefiting from smart farming insights."
        />
        <StatCard
          icon={<FaCloudSun />}
          title="Climate Insights"
          description="Predicting weather for better farming strategies."
        />
        <StatCard
          icon={<FaLeaf />}
          title="Pest Detection"
          description="AI detecting crop diseases before they spread."
        />
        <StatCard
          icon={<FaDatabase />}
          title="Blockchain Security"
          description="Secure & transparent agricultural transactions."
        />
        <StatCard
          icon={<FaTractor />}
          title="Smart Equipment"
          description="AI-powered tractors for precision farming."
        />
      </div>

      
      <div className="mt-10 w-full max-w-6xl flex flex-col justify-center items-center bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-3xl font-semibold text-green-500 mb-4">
          AI-Driven Insights
        </h3>
        <ul className="list-none list-inside text-gray-700 space-y-4 text-lg ">
          <li>
            <strong>Crop Monitoring:</strong> AI detects health issues, water
            levels, and growth rates.
          </li>
          <li>
            <strong>Soil Health Analysis:</strong> AI scans nutrients, pH
            levels, and soil fertility.
          </li>
          <li>
            <strong>Climate Forecasting:</strong> Blockchain-based data for
            extreme weather alerts.
          </li>
          <li>
            <strong>Pest & Disease Alerts:</strong> Smart AI detects early signs
            of infestations.
          </li>
          <li>
            <strong>Market Price Tracking:</strong> Keeps farmers updated on
            real-time crop prices.
          </li>
          <li>
            <strong>Blockchain Transactions:</strong> Secure, transparent
            record-keeping for agricultural trade.
          </li>
        </ul>
      </div>

      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10 w-full max-w-5xl">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold text-green-500 mb-4">
            🌡 Climate Change Trends
          </h3>
          <Line data={climateChartData} options={{ responsive: true }} />
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold text-green-500 mb-4">
            🌱 Crop Growth Analysis
          </h3>
          <Line data={cropGrowthChartData} options={{ responsive: true }} />
        </div>
      </div>
    </div>
  );
};


const StatCard = ({
  icon,
  title,
  description,
}: {
  icon: JSX.Element;
  title: string;
  description: string;
}) => (
  <div className="flex flex-col items-center bg-white p-4 rounded-lg shadow-md">
    <div className="text-green-600 text-4xl">{icon}</div>
    <h3 className="text-lg font-semibold text-gray-800 mt-2">{title}</h3>
    <p className="text-gray-600 text-xl mt-3 text-center">{description}</p>
  </div>
);

export default Overview;
