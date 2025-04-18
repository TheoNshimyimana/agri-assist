import { useState, useEffect } from "react";

const StockPage = () => {
  const [stocks, setStocks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedStock, setSelectedStock] = useState<any | null>(null);
  const [quantityToSell, setQuantityToSell] = useState<number>(0);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  // Simulating API call to fetch stock data (Replace with real API in production)
  useEffect(() => {
    const fetchStocks = async () => {
      const mockStocks = [
        {
          product: "Apples",
          status: "Available",
          price_unit: 320,
          quantity: 830,
          price_total: 849300,
          action: "Sell",
        },
        {
          product: "Mangoes",
          status: "pending",
          price_unit: 320,
          quantity: 830,
          price_total: 859307,
          action: "Sell",
        },
        {
          product: "Mangoes",
          status: "Soldout",
          price_unit: 320,
          quantity: 830,
          price_total: 859307,
          action: "Sell",
        },
        {
          product: "Mangoes",
          status: "Available",
          price_unit: 320,
          quantity: 830,
          price_total: 859307,
          action: "Sell",
        },
      
        {
          product: "Bananas",
          status: "Pending",
          price_unit: 350,
          quantity: 990,
          price_total: 649302,
          action: "Sell",
        },
        {
          product: "potatoes",
          status: "Pending",
          price_unit: 350,
          quantity: 990,
          price_total: 649302,
          action: "Sell",
        },
      
        {
          product: "Bananas",
          status: "Pending",
          price_unit: 350,
          quantity: 990,
          price_total: 649302,
          action: "Sell",
        },
        
        {
          product: "Potatoes",
          status: "Pending",
          price_unit: 350,
          quantity: 990,
          price_total: 649302,
          action: "Sell",
        },
        {
          product: "Apples",
          status: "Pending",
          price_unit: 350,
          quantity: 990,
          price_total: 649302,
          action: "Sell",
        },
        {
          product: "Mangoes",
          status: "Pending",
          price_unit: 350,
          quantity: 990,
          price_total: 649302,
          action: "Sell",
        },
        {
          product: "Oranges",
          status: "Pending",
          price_unit: 350,
          quantity: 990,
          price_total: 649302,
          action: "Sell",
        },
      
        
      ];

      setStocks(mockStocks);
      setLoading(false);
    };

    fetchStocks();
  }, []);

  const handleSellClick = (stock: any) => {
    setSelectedStock(stock);
    setQuantityToSell(1); // Default to selling 1 unit
    setShowConfirmation(true);
  };

  const handleConfirmSell = () => {
    if (selectedStock) {
      const totalAmount = quantityToSell * selectedStock.price_unit;
      setSuccessMessage(
        `Successfully sold ${quantityToSell} units of ${
          selectedStock.product
        } for ${totalAmount.toFixed(2)}.`
      );
      setShowConfirmation(false);
      // Here you can handle the stock update in your database/API
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-md p-6">
        <h1 className="text-3xl font-bold text-center text-green-800 mb-6">
          Stock Management Dashboard
        </h1>

        {loading ? (
          <div className="text-center text-gray-600">Loading stock data...</div>
        ) : (
          <table className="min-w-full table-auto bg-gray-100 text-left text-gray-700">
            <thead className="bg-green-300 text-gray-900 text-base font-bold">
              <tr>
                <th className="px-4 py-2">Products</th>
                <th className="px-4 py-2">Quantity</th>
                <th className="px-4 py-2">Price per Unit</th>
                <th className="px-4 py-2">Total Price</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {stocks.map((stock) => (
                <tr
                  key={stock.product}
                  className="border-t text-sm font-bold border-gray-200"
                >
                  <td className="px-4 py-2">{stock.product}</td>
                  <td className="px-4 py-2">{stock.quantity}</td>
                  <td className="px-4 py-2">{stock.price_unit.toFixed(2)}</td>
                  <td className="px-4 py-2">{stock.price_total.toFixed(2)}</td>
                  <td className="px-4 py-2">
                    <button className="bg-green-200 px-5 rounded-full ">
                      {stock.status}
                    </button>
                  </td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => handleSellClick(stock)}
                      className="bg-yellow-500 hover:bg-yellow-700 px-8 cursor-pointer rounded-full"
                    >
                      {stock.action}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {showConfirmation && selectedStock && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
              <h2 className="text-xl font-semibold mb-4">Confirm Sell</h2>
              <div className="mb-4">
                <label className="block text-gray-700">Quantity</label>
                <input
                  type="number"
                  value={quantityToSell}
                  onChange={(e) => setQuantityToSell(Number(e.target.value))}
                  min={1}
                  max={selectedStock.quantity}
                  className="w-full p-2 border rounded-lg"
                />
              </div>
              <div className="mb-4">
                <p>
                  Total Amount:{" "}
                  {(quantityToSell * selectedStock.price_unit).toFixed(2)}
                </p>
              </div>
              <div className="flex justify-between">
                <button
                  onClick={() => setShowConfirmation(false)}
                  className="bg-gray-500 text-white px-6 py-2 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmSell}
                  className="bg-green-600 text-white px-6 py-2 rounded-lg"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}

        {successMessage && (
          <div className="bg-green-100 text-green-800 p-3 rounded-lg mb-4 text-center">
            {successMessage}
          </div>
        )}
      </div>
    </div>
  );
};

export default StockPage;
