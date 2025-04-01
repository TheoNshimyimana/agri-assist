import React, { useState, useEffect, useMemo } from "react";
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

// Register required Chart.js components
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement, // Fix missing point element issue
  CategoryScale,
  LinearScale
);

const ReportsAnalytics: React.FC = () => {
  const [reportType, setReportType] = useState("crop-yield");
  const [startDate, setStartDate] = useState(
    new Date().toISOString().split("T")[0]
  ); // Default to today
  const [endDate, setEndDate] = useState(
    new Date().toISOString().split("T")[0]
  ); // Default to today
  const [reports, setReports] = useState<any[]>([]);

  // Simulating API data fetching
  useEffect(() => {
    const fetchReports = () => {
      setReports([
        {
          id: 1,
          type: "crop-yield",
          title: "Crop Yield Report",
          date: "2025-03-31",
          yield: 120,
          description: "Analysis of crop production trends.",
        },
        {
          id: 2,
          type: "market-prices",
          title: "Market Prices Report",
          date: "2025-03-30",
          yield: 110,
          description: "Insights on agricultural market prices.",
        },
        {
          id: 3,
          type: "pest-disease",
          title: "Pest & Disease Analysis",
          date: "2025-03-29",
          yield: 100,
          description: "Monitoring spread and prevention of plant diseases.",
        },
        {
          id: 4,
          type: "soil-health",
          title: "Soil Health Analysis",
          date: "2025-03-28",
          yield: 150,
          description: "Evaluation of soil nutrients and conditions.",
        },
      ]);
    };

    fetchReports();
  }, []);

  // Filter reports based on user input
  const filteredReports = useMemo(() => {
    return reports.filter(
      (report) =>
        report.type === reportType &&
        (!startDate || report.date >= startDate) &&
        (!endDate || report.date <= endDate)
    );
  }, [reports, reportType, startDate, endDate]);

  // Chart data setup
  const chartData = {
    labels: filteredReports.map((report) => report.date),
    datasets: [
      {
        label: "Yield (tons)",
        data: filteredReports.map((report) => report.yield),
        borderColor: "#4CAF50",
        backgroundColor: "rgba(76, 175, 80, 0.2)",
        borderWidth: 2,
        pointRadius: 5, // Ensures data points are visible
        tension: 0.4, // Smooth curve
      },
    ],
  };

  // Chart configuration
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem: any) => `${tooltipItem.raw} tons`,
        },
      },
    },
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-50 p-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">
        📊 Reports & Analytics
      </h2>

      {/* Filters */}
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-4xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Report Type Selector */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Select Report Type:
            </label>
            <select
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="crop-yield">Crop Yield</option>
              <option value="market-prices">Market Prices</option>
              <option value="pest-disease">Pest & Disease</option>
              <option value="soil-health">Soil Health</option>
            </select>
          </div>

          {/* Start Date */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Start Date:
            </label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          {/* End Date */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              End Date:
            </label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
        </div>
      </div>

      {/* Chart Section */}
      <div className="mt-6 w-full max-w-4xl bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Crop Yield Over Time
        </h3>
        <Line data={chartData} options={chartOptions} />
      </div>

      {/* Report List */}
      <div className="w-full max-w-4xl mt-6">
        {filteredReports.length > 0 ? (
          filteredReports.map((report) => (
            <div
              key={report.id}
              className="bg-white p-6 mb-4 rounded-lg shadow-md"
            >
              <h3 className="text-lg font-semibold text-gray-800">
                {report.title}
              </h3>
              <p className="text-gray-600">{report.date}</p>
              <p className="text-gray-700">{report.description}</p>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">
            No reports found for the selected filters.
          </p>
        )}
      </div>
    </div>
  );
};

export default ReportsAnalytics;
