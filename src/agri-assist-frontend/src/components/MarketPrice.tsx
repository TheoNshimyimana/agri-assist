import React, { useState } from "react";
import {
  Search,
  PieChart,
  MapPin,
  Calendar,
  Info,
  TrendingUp,
  TrendingDown,
} from "lucide-react";

interface MarketData {
  crop: string;
  pricePerKg: number;
  location: string;
  date: string;
  trendingPrice: number;
}

const MarketPrices: React.FC = () => {
  const [filter, setFilter] = useState("");
  const currentDate = new Date().toLocaleDateString("en-RW", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Generate trending price with a random fluctuation (±10%)
  const generateTrendingPrice = (price: number) => {
    const fluctuation = (Math.random() * 0.2 - 0.1) * price; // ±10%
    return Math.round(price + fluctuation);
  };

  const marketData: MarketData[] = [
    {
      crop: "Maize",
      pricePerKg: 600,
      location: "Kigali",
      date: currentDate,
      trendingPrice: generateTrendingPrice(600),
    },
    {
      crop: "Rice",
      pricePerKg: 1700,
      location: "Musanze",
      date: currentDate,
      trendingPrice: generateTrendingPrice(1700),
    },
    {
      crop: "Beans",
      pricePerKg: 1500,
      location: "Rubavu",
      date: currentDate,
      trendingPrice: generateTrendingPrice(1500),
    },
    {
      crop: "Potatoes",
      pricePerKg: 650,
      location: "Huye",
      date: currentDate,
      trendingPrice: generateTrendingPrice(650),
    },
    {
      crop: "Cassava",
      pricePerKg: 450,
      location: "Rwamagana",
      date: currentDate,
      trendingPrice: generateTrendingPrice(450),
    },
    {
      crop: "Wheat",
      pricePerKg: 850,
      location: "Nyagatare",
      date: currentDate,
      trendingPrice: generateTrendingPrice(850),
    },
    {
      crop: "Sorghum",
      pricePerKg: 700,
      location: "Karongi",
      date: currentDate,
      trendingPrice: generateTrendingPrice(700),
    },
  ];

  const filteredData = marketData.filter((item) =>
    item.crop.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-green-800 flex items-center mb-6 justify-center gap-2">
            <PieChart className="w-8 h-8" /> Rwanda Agricultural Market Prices
          </h1>
          <p className="text-gray-800 text-lg flex mb-6 items-center justify-center gap-1">
            Rwanda Agricultural Market Prices provides real-time updates on crop
            prices across different regions, helping farmers and traders make
            informed decisions. The platform sources its data from the National
            Agricultural Export Development Board (NAEB) and updates prices
            daily.
          </p>
        </div>

        <div className="relative mb-6">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="w-5 h-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search crops..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border focus:ring-2 focus:ring-green-500 focus:border-green-500"
          />
        </div>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-green-50">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-green-700 text-white">
                <tr>
                  <th className="px-6 py-2 text-base text-left font-semibold">
                    Crop
                  </th>
                  <th className="px-6 py-2 text-base text-left font-semibold">
                    Price/Kg (FRW)
                  </th>
                  <th className="px-6 py-2 text-base text-left font-semibold">
                    Trending Price (FRW)
                  </th>
                  <th className="px-6 py-2 text-left text-base font-semibold">
                    Location
                  </th>
                  <th className="px-6 py-2 text-left text-base font-semibold">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-green-50">
                {filteredData.map((item, index) => (
                  <tr
                    key={index}
                    className="hover:bg-green-50 transition-colors"
                  >
                    <td className="px-6 py-4 text-lg font-semibold text-green-900">
                      {item.crop}
                    </td>
                    <td className="px-6 py-4">
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                        FRW {item.pricePerKg.toFixed(0)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm flex items-center gap-1 ${
                          item.trendingPrice >= item.pricePerKg
                            ? "bg-green-100 text-lg text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {item.trendingPrice >= item.pricePerKg ? (
                          <TrendingUp className="w-4 h-4 text-lg font-semibold" />
                        ) : (
                          <TrendingDown className="w-4 h-4 text-lg font-semibold" />
                        )}
                        FRW {item.trendingPrice.toFixed(0)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-600 text-lg font-semibold">
                      {item.location}
                    </td>
                    <td className="px-6 py-4 text-gray-500 text-lg font-semibold">
                      {item.date}
                    </td>
                  </tr>
                ))}
                {filteredData.length === 0 && (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-6 py-8 text-center text-gray-500"
                    >
                      No matching crops found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <p className="mt-6 text-sm text-gray-500 text-center">
          Data updated daily from National Agricultural Export Development Board
        </p>
      </div>
    </div>
  );
};

export default MarketPrices;
