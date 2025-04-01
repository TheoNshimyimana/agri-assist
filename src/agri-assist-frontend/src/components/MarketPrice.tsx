import React, { useState } from "react";

interface MarketData {
  crop: string;
  pricePerKg: number;
  location: string;
  date: string;
}

const MarketPrices: React.FC = () => {
  const [filter, setFilter] = useState<string>("");
  const currentDate = new Date().toISOString().split("T")[0];


  // Dummy Market Prices Data
  const marketData: MarketData[] = [
    { crop: "Maize", pricePerKg: 600, location: "Kigali", date:currentDate },
    { crop: "Rice", pricePerKg: 1700, location: "Musanze", date: currentDate },
    { crop: "Beans", pricePerKg: 1500, location: "Rubavu", date: currentDate },
    { crop: "Potatoes", pricePerKg: 650, location: "Huye", date: currentDate },
    { crop: "Maize", pricePerKg: 600, location: "Kigali", date: currentDate },
    { crop: "Rice", pricePerKg: 1700, location: "Musanze", date: currentDate },
    { crop: "Beans", pricePerKg: 1500, location: "Rubavu", date: currentDate },
    { crop: "Potatoes", pricePerKg: 650, location: "Huye", date: currentDate },
    { crop: "Maize", pricePerKg: 600, location: "Kigali", date: currentDate },
    { crop: "Rice", pricePerKg: 1700, location: "Musanze", date: currentDate },
    { crop: "Beans", pricePerKg: 1500, location: "Rubavu", date: currentDate },
    { crop: "Potatoes", pricePerKg: 650, location: "Huye", date: currentDate },
    {
      crop: "Cassava",
      pricePerKg: 1.1,
      location: "Rwamagana",
      date: currentDate,
    },
    {
      crop: "Cassava",
      pricePerKg: 1.1,
      location: "Rwamagana",
      date: currentDate,
    },
    {
      crop: "Cassava",
      pricePerKg: 1.1,
      location: "Rwamagana",
      date: currentDate,
    },
  ];

  // Filtered data based on user input
  const filteredData = marketData.filter((item) =>
    item.crop.toLowerCase().includes(filter.toLowerCase())
  );


  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-6">
      <h2 className="text-3xl font-semibold text-green-600 mb-4">
        Agricultural Market Prices
      </h2>

      {/* Search Filter */}
      <input
        type="text"
        placeholder="Search crop (e.g., maize)..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="p-2 border border-gray-300 rounded w-full max-w-md"
      />

      {/* Market Prices Table */}
      <div className="overflow-x-auto w-full max-w-4xl mt-4">
        <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-blue-600 text-white ">
            <tr>
              <th className="p-1 text-left">Crop</th>
              <th className="p-1 text-left">Price per Kg (FRW)</th>
              <th className="p-1 text-left">Location</th>
              <th className="p-1 text-left">Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((item, index) => (
                <tr key={index} className="border-b">
                  <td className="p-3">{item.crop}</td>
                  <td className="p-3">FRW{item.pricePerKg.toFixed(2)}</td>
                  <td className="p-3">{item.location}</td>
                  <td className="p-3">{item.date}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="p-3 text-center text-gray-500">
                  No results found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MarketPrices;
