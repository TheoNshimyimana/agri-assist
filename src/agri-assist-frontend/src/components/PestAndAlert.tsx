import React, { useState, useEffect } from "react";
import axios from "axios";

interface PestDiseaseAlert {
  name: string;
  description: string;
  prevention: string;
  icon: string;
}

const PestDiseaseAlerts: React.FC = () => {
  const [alertData, setAlertData] = useState<PestDiseaseAlert[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [crop, setCrop] = useState<string>("Tomato"); 
  const [location, setLocation] = useState<string>("Kigali"); 

  const API_URL = "https://crop.kindwise.com/api/v1";
  const API_KEY = "6EBxlZP9MOz26cyt0nG829YnJoQLQgyPA6CHFmsyCDDzWYoI91";

  useEffect(() => {
    const fetchPestDiseaseAlerts = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await axios.post(
          `${API_URL}/identify`,
          {
            crop: crop,
            location: location,
          },
          {
            headers: {
              Authorization: `Bearer ${API_KEY}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.data && response.data.alerts) {
          setAlertData(response.data.alerts);
        } else {
          setAlertData([]);
          setError("No alerts found for this crop and location.");
        }
      } catch (err) {
        console.error("Error fetching pest disease alerts:", err);
        setError(
          "Could not fetch pest/disease alerts. Please try again later."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchPestDiseaseAlerts();
  }, [crop, location]);

  const handleCropChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCrop(e.target.value);
  };

  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocation(e.target.value);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* HEADER */}
      <h2 className="text-4xl font-bold text-green-600 mb-6 text-center">
        🌱 Pest & Disease Alerts
      </h2>

      {/* INTRODUCTION */}
      <p className="text-lg text-gray-700 text-center mb-8">
        Protect your crops from pests and diseases with the latest insights.
        Select your crop and location to see relevant threats and prevention
        methods.
      </p>

      {/* FILTER SECTION */}
      <div className="flex flex-col md:flex-row justify-center space-x-4 mb-8">
        <div className="flex flex-col">
          <label className="text-sm text-gray-600 mb-2 font-medium">
            Enter Crop Type
          </label>
          <input
            type="text"
            value={crop}
            onChange={handleCropChange}
            className="p-2 border border-gray-300 rounded-lg"
            placeholder="e.g., Tomato, Potato"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm text-gray-600 mb-2 font-medium">
            Enter Location
          </label>
          <input
            type="text"
            value={location}
            onChange={handleLocationChange}
            className="p-2 border border-gray-300 rounded-lg"
            placeholder="e.g., Kigali"
          />
        </div>
      </div>

      {/* DISPLAY ALERTS */}
      {loading ? (
        <div className="flex justify-center items-center h-32">
          <div className="w-12 h-12 border-4 border-green-500 border-dashed rounded-full animate-spin"></div>
        </div>
      ) : error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {alertData.length > 0 ? (
            alertData.map((alert, index) => (
              <div
                key={index}
                className="p-4 border rounded-lg shadow-lg bg-white transform hover:scale-105 transition duration-300 ease-in-out"
              >
                <img
                  src={alert.icon}
                  alt={alert.name}
                  className="w-16 h-16 mb-4"
                />
                <h3 className="text-xl font-semibold mb-2">{alert.name}</h3>
                <p className="text-gray-700 mb-4">{alert.description}</p>
                <h4 className="text-lg font-semibold">Prevention Tips</h4>
                <p className="text-gray-700">{alert.prevention}</p>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-700">
              No alerts found for this crop and location.
            </p>
          )}
        </div>
      )}

      {/* FOOTER */}
      <div className="mt-8 text-center">
        <p className="text-lg text-gray-700">
          Need expert assistance?{" "}
          <a href="/contact" className="text-green-600 font-semibold underline">
            Contact an Expert
          </a>
          .
        </p>
      </div>
    </div>
  );
};

export default PestDiseaseAlerts;
