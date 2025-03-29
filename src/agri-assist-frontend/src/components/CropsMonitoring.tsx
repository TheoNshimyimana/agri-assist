import React from "react";

const CropsMonitoring = () => {
  return (
    <div className="p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Crop Monitoring</h2>
      <p className="text-gray-700 mb-4">
        Stay updated with real-time insights on your crops' health, growth, and condition. Utilize satellite imagery, sensor data, and AI analysis to ensure optimal crop performance.
      </p>
      <ul className="list-disc list-inside text-gray-600">
        <li>Real-time crop health monitoring</li>
        <li>Growth tracking and analysis</li>
        <li>AI-powered recommendations</li>
        <li>Weather and soil impact assessment</li>
      </ul>
    </div>
  );
};

export default CropsMonitoring;
