// src/pages/SoilHealthAnalysis.tsx
import React, { useState, useEffect } from "react";

interface SoilData {
  ph: number;
  nitrogen: number;
  phosphorus: number;
  potassium: number;
  organicMatter: number;
}

const SoilHealthAnalysis: React.FC = () => {
  const [soilData, setSoilData] = useState<SoilData | null>(null);

  // Fetch soil data (could be from an API or static data)
  useEffect(() => {
    // For example, mock data:
    const fetchedSoilData: SoilData = {
      ph: 6.5,
      nitrogen: 0.25,
      phosphorus: 0.15,
      potassium: 0.2,
      organicMatter: 2.5,
    };
    setSoilData(fetchedSoilData);
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold">Soil Health Analysis</h1>
      <div className="mt-6">
        {soilData ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div className="bg-white shadow rounded-lg p-4">
              <h2 className="font-medium">pH Level</h2>
              <p>{soilData.ph}</p>
            </div>
            <div className="bg-white shadow rounded-lg p-4">
              <h2 className="font-medium">Nitrogen (N)</h2>
              <p>{soilData.nitrogen}</p>
            </div>
            <div className="bg-white shadow rounded-lg p-4">
              <h2 className="font-medium">Phosphorus (P)</h2>
              <p>{soilData.phosphorus}</p>
            </div>
            <div className="bg-white shadow rounded-lg p-4">
              <h2 className="font-medium">Potassium (K)</h2>
              <p>{soilData.potassium}</p>
            </div>
            <div className="bg-white shadow rounded-lg p-4">
              <h2 className="font-medium">Organic Matter</h2>
              <p>{soilData.organicMatter}</p>
            </div>
          </div>
        ) : (
          <p>Loading soil health data...</p>
        )}
      </div>
    </div>
  );
};

export default SoilHealthAnalysis;
