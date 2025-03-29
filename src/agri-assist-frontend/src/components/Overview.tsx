import React from "react";

const Overview = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Dashboard Overview</h1>
      <p className="text-gray-700">
        Welcome to the AI-powered crop monitoring system. Here, you will find a
        summary of the latest insights, alerts, and recommendations for your
        crops.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        <div className="bg-white p-4 shadow rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Crop Health Status</h2>
          <p className="text-gray-600">85% of crops are in good condition.</p>
        </div>

        <div className="bg-white p-4 shadow rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Pest Alerts</h2>
          <p className="text-gray-600">No new pest alerts detected.</p>
        </div>

        <div className="bg-white p-4 shadow rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Weather Forecast</h2>
          <p className="text-gray-600">Rain expected in 2 days.</p>
        </div>
      </div>
    </div>
  );
};

export default Overview;
