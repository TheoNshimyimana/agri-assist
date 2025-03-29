import React from "react";

const MarketPrices = () => {
  return (
    <div className="p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Market Prices</h2>
      <p className="text-gray-700 mb-4">
        Stay informed about the latest market prices for your crops. Get access to real-time price data to make informed decisions about when and where to sell.
      </p>
      <ul className="list-disc list-inside text-gray-600">
        <li>Real-time market price updates</li>
        <li>Price trends and forecasting</li>
        <li>Regional price comparison</li>
        <li>Price alert notifications</li>
      </ul>
    </div>
  );
};

export default MarketPrices;
