import React from "react";

const PestDiseaseAlerts = () => {
  return (
    <div className="p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Pest and Disease Alerts</h2>
      <p className="text-gray-700 mb-4">
        Receive real-time alerts about potential pest infestations and crop diseases. Leverage AI and environmental data to prevent damage and protect your crops.
      </p>
      <ul className="list-disc list-inside text-gray-600">
        <li>AI-powered pest detection</li>
        <li>Real-time disease outbreak alerts</li>
        <li>Preventative measures and recommendations</li>
        <li>Integrated with weather and environmental data</li>
      </ul>
    </div>
  );
};

export default PestDiseaseAlerts;
