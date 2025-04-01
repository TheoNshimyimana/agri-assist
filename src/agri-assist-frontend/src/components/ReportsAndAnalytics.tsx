import React, { useState, useEffect } from "react";
import {
  Info,
  Droplet,
  Leaf,
  Sun,
  Thermometer,
  Zap,
  CloudRain,
  ThermometerSun,
  Waves,
  Layers,
} from "lucide-react";

interface SoilData {
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

const ReportsAndAnalytics: React.FC = () => {
  const [soilData, setSoilData] = useState<SoilData | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSoilData({
        ph: 6.5,
        nitrogen: 0.25,
        phosphorus: 0.15,
        potassium: 0.2,
        organicMatter: 2.5,
        moisture: 45,
        temperature: 22,
        salinity: 1.2,
        compaction: 30,
        aeration: 60,
        microbialActivity: 80,
      });
    }, 1200);
    return () => clearTimeout(timer);
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-green-500 mb-5 flex justify-center  gap-3">
              Soil Health Analysis
            </h1>
            <p className="text-gray-700 mb-6 text-xl text-center leading-9">
              Soil Health Analysis evaluates key soil properties such as pH,
              moisture, nutrient levels, and microbial activity to determine
              overall soil fertility and sustainability. This analysis helps
              optimize agricultural practices.
            </p>
          </div>
        </div>

        {!soilData ? (
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
            {Object.keys(optimalRanges).map((key) => (
              <div
                key={key}
                className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-lg flex items-center gap-2">
                    {key === "ph" ? (
                      <Droplet className="w-5 h-5 text-blue-500" />
                    ) : key === "nitrogen" ? (
                      <Zap className="w-5 h-5 text-purple-500" />
                    ) : key === "phosphorus" ? (
                      <Sun className="w-5 h-5 text-orange-500" />
                    ) : key === "potassium" ? (
                      <Thermometer className="w-5 h-5 text-yellow-500" />
                    ) : key === "organicMatter" ? (
                      <Leaf className="w-5 h-5 text-green-500" />
                    ) : key === "moisture" ? (
                      <CloudRain className="w-5 h-5 text-blue-400" />
                    ) : key === "temperature" ? (
                      <ThermometerSun className="w-5 h-5 text-red-500" />
                    ) : key === "salinity" ? (
                      <Waves className="w-5 h-5 text-teal-500" />
                    ) : (
                      <Layers className="w-5 h-5 text-gray-600" />
                    )}
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </h3>
                </div>
                <div className="space-y-4">
                  <div className="text-4xl font-bold text-gray-800">
                    {soilData[key as keyof SoilData]}
                    <span className="text-lg text-gray-500 ml-2">
                      {key === "ph"
                        ? "pH"
                        : key === "temperature"
                        ? "°C"
                        : key === "salinity"
                        ? "dS/m"
                        : "%"}
                    </span>
                  </div>
                  <div className="relative pt-4">
                    <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-green-400 to-green-600"
                        style={{
                          width: `${Math.min(
                            100,
                            ((soilData[key as keyof SoilData] -
                              optimalRanges[key as keyof SoilData].min) /
                              (optimalRanges[key as keyof SoilData].max -
                                optimalRanges[key as keyof SoilData].min)) *
                              100
                          )}%`,
                        }}
                      />
                    </div>
                    <div className="flex justify-between text-sm text-gray-500 mt-2">
                      <span>
                        Low ({optimalRanges[key as keyof SoilData].min})
                      </span>
                      <span>Optimal</span>
                      <span>
                        High ({optimalRanges[key as keyof SoilData].max})
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ReportsAndAnalytics;
