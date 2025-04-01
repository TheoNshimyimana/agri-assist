import React, { useState } from "react";

interface Crop {
  id: number;
  name: string;
  growthStage: string;
  health: string;
  moisture: string;
}

const CropsMonitoring: React.FC = () => {
  // Mock data for crops
  const [crops] = useState<Crop[]>([
    {
      id: 1,
      name: "Corn",
      growthStage: "Vegetative",
      health: "Good",
      moisture: "40%",
    },
    {
      id: 2,
      name: "Wheat",
      growthStage: "Flowering",
      health: "Healthy",
      moisture: "35%",
    },
    {
      id: 3,
      name: "Rice",
      growthStage: "Mature",
      health: "Excellent",
      moisture: "60%",
    },
    {
      id: 4,
      name: "Tomato",
      growthStage: "Fruit Setting",
      health: "Average",
      moisture: "50%",
    },
    {
      id: 4,
      name: "Mangoes",
      growthStage: "Fruit Setting",
      health: "Average",
      moisture: "40%",
    },
    {
      id: 4,
      name: "Irish potatoes",
      growthStage: "Average",
      health: "Average",
      moisture: "60%",
    },
    {
      id: 4,
      name: "Banana",
      growthStage: "Fruit Setting",
      health: "Average",
      moisture: "50%",
    },
    {
      id: 4,
      name: "Apple",
      growthStage: "Average ",
      health: "Average",
      moisture: "50%",
    },
    {
      id: 4,
      name: "Tomato",
      growthStage: "Fruit Setting",
      health: "Average",
      moisture: "50%",
    },
  ]);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6 text-green-600">
        Crops Monitoring Dashboard
      </h1>
      <p className="text-gray-700 mb-6 text-xl text-center leading-9">
        Crops monitoring uses AI and blockchain to track plant health, detect
        pests, optimize irrigation, and predict yields in real-time, helping
        farmers make data-driven decisions.{" "}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {crops.map((crop) => (
          <div
            key={crop.id}
            className="bg-white p-6 rounded-lg space-y-4 shadow-lg flex flex-col justify-between"
          >
            <h2 className="text-2xl font-semibold text-green-500 text-center ">
              {crop.name}
            </h2>
            <p className="text-gray-700 text-lg">
              <strong>Growth Stage:</strong> {crop.growthStage}
            </p>
            <p className="text-gray-700 text-lg">
              <strong>Health:</strong> {crop.health}
            </p>
            <p className="text-gray-700 text-lg">
              <strong>Moisture:</strong> {crop.moisture}
            </p>

            <div className="mt-4">
              {/* <button className="bg-blue-300 text-white rounded-lg w-full">
                Update Status
              </button> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CropsMonitoring;
