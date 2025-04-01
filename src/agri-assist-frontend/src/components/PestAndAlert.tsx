import React, { useState, useEffect } from "react";
import { Info, Leaf, Download } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

interface SoilData {
  timestamp: string;
  ph: number;
  nitrogen: number;
  phosphorus: number;
  potassium: number;
  organicMatter: number;
  moisture: number;
  temperature: number;
  salinity: number;
  compaction: number;
  aeration: number;
  microbialActivity: number;
}

// Sample fallback data to display if the API returns nothing
const sampleData: SoilData[] = [
  {
    timestamp: new Date().toISOString(),
    ph: 6.5,
    nitrogen: 0.25,
    phosphorus: 0.15,
    potassium: 0.2,
    organicMatter: 2.7,
    moisture: 45,
    temperature: 22,
    salinity: 1.0,
    compaction: 30,
    aeration: 60,
    microbialActivity: 75,
  },
  {
    timestamp: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
    ph: 6.4,
    nitrogen: 0.26,
    phosphorus: 0.14,
    potassium: 0.19,
    organicMatter: 2.8,
    moisture: 47,
    temperature: 21,
    salinity: 1.1,
    compaction: 32,
    aeration: 58,
    microbialActivity: 72,
  },
];

const fetchSoilData = async (): Promise<SoilData[]> => {
  try {
    const response = await fetch("https://api.example.com/soil-data");
    const data = await response.json();
    // If the API returns an empty array or invalid data, fallback to sample data
    if (!data || data.length === 0) {
      return sampleData;
    }
    return data;
  } catch (error) {
    console.error("Error fetching soil data:", error);
    return sampleData;
  }
};

const SoilHealthAnalysis: React.FC = () => {
  const [soilData, setSoilData] = useState<SoilData[]>([]);

  useEffect(() => {
    fetchSoilData().then((data) => {
      setSoilData(data);
    });
  }, []);

  const optimalRanges = {
    ph: { min: 6.0, max: 7.0 },
    nitrogen: { min: 0.2, max: 0.3 },
    phosphorus: { min: 0.1, max: 0.2 },
    potassium: { min: 0.15, max: 0.25 },
    organicMatter: { min: 2.0, max: 3.0 },
    moisture: { min: 30, max: 60 },
    temperature: { min: 18, max: 25 },
    salinity: { min: 0.5, max: 1.5 },
    compaction: { min: 20, max: 40 },
    aeration: { min: 50, max: 70 },
    microbialActivity: { min: 60, max: 90 },
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text("Soil Health Analysis Report", 20, 20);
    autoTable(doc, {
      head: [["Parameter", "Value", "Optimal Range"]],
      body: Object.keys(optimalRanges).map((key) => {
        const value =
          soilData.length > 0
            ? soilData[soilData.length - 1][key as keyof SoilData]
            : "-";
        const range = optimalRanges[key as keyof typeof optimalRanges];
        return [key, value, `${range.min} - ${range.max}`];
      }),
    });
    doc.save("soil_health_report.pdf");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
              <Leaf className="w-8 h-8 text-green-600" />
              Soil Health Analysis
            </h1>
            <p className="mt-2 text-gray-500 flex items-center gap-2">
              <Info className="w-4 h-4" />
              Last updated:{" "}
              {soilData.length > 0
                ? new Date(
                    soilData[soilData.length - 1].timestamp
                  ).toLocaleDateString()
                : "-"}
            </p>
          </div>
          <button
            onClick={generatePDF}
            className="bg-green-600 text-white px-4 py-2 rounded flex items-center gap-2"
          >
            <Download className="w-5 h-5" /> Download Report
          </button>
        </div>

        {/* Cards for Soil Parameters */}
        {soilData.length === 0 ? (
          <div className="animate-pulse space-y-6">
            <div className="h-4 bg-gray-200 rounded w-1/3 mb-8" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[...Array(10)].map((_, i) => (
                <div key={i} className="h-32 bg-gray-100 rounded-xl" />
              ))}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Object.keys(optimalRanges).map((key) => {
              const value =
                soilData.length > 0
                  ? soilData[soilData.length - 1][key as keyof SoilData]
                  : undefined;
              const range = optimalRanges[key as keyof typeof optimalRanges];
              const isOutOfRange =
                typeof value === "number" &&
                (value < range.min || value > range.max);
              return (
                <div
                  key={key}
                  className={`bg-white rounded-xl p-6 shadow-lg border border-gray-100 ${
                    isOutOfRange ? "border-red-500" : ""
                  }`}
                >
                  <h3 className="font-semibold text-lg">
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </h3>
                  <p
                    className={`text-4xl font-bold ${
                      isOutOfRange ? "text-red-500" : "text-gray-800"
                    }`}
                  >
                    {value !== undefined ? value : "No Data"}
                  </p>
                </div>
              );
            })}
          </div>
        )}

        {/* Chart Section */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Soil Parameter Trends
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={soilData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="timestamp" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="ph" stroke="#8884d8" />
              <Line type="monotone" dataKey="moisture" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default SoilHealthAnalysis;
