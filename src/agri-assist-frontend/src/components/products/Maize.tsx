import React, { useState } from "react";
import { Search } from "lucide-react";

interface MarketData {
  seller: string;
  pricePerKg: number;
  location: string;
  quantity: number;
  request: string;
  payment_meth: string;
  Id: number;
}

const Maize: React.FC = () => {
  const [filter, setFilter] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [selectedItem, setSelectedItem] = useState<MarketData | null>(null);
  const [formData, setFormData] = useState({
    quantity: "",
    paymentMethod: "",
  });

  const marketData: MarketData[] = [
    {
      seller: "John Doe",
      pricePerKg: 600,
      location: "Kigali",
      quantity: 100,
      request: "Request",
      payment_meth: "FRW",
      Id: 33541,
    },
    {
      seller: "Jane Smith",
      pricePerKg: 1700,
      location: "Musanze",
      quantity: 200,
      request: "Request",
      payment_meth: "USDT",
      Id: 2434343,
    },
    {
      seller: "Alice Johnson",
      pricePerKg: 1500,
      location: "Rubavu",
      quantity: 300,
      request: "Request",
      payment_meth: "BTC",
      Id: 353433,
    },
    {
      seller: "Bob Brown",
      pricePerKg: 1200,
      location: "Huye",
      quantity: 400,
      request: "Request",
      payment_meth: "ETH",
      Id: 343534,
    },
    {
      seller: "Charlie Green",
      pricePerKg: 800,
      location: "Gisenyi",
      quantity: 500,
      request: "Request",
      payment_meth: "RWF",
      Id: 553435,
    },
    {
      seller: "Diana White",
      pricePerKg: 900,
      location: "Butare",
      quantity: 600,
      request: "Request",
      payment_meth: "USD",
      Id: 43436546,
    },
    {
      seller: "Ethan Black",
      pricePerKg: 1100,
      location: "Kibuye",
      quantity: 700,
      request: "Request",
      payment_meth: "USD",
      Id: 76745634,
    },
    {
      seller: "Fiona Blue",
      pricePerKg: 950,
      location: "Nyagatare",
      quantity: 800,
      request: "Request",
      payment_meth: "RWF",
      Id: 2765783,
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuccess(true); // Set success message visibility to true
    setFormData({ quantity: "", paymentMethod: "" });
    setTimeout(() => {
      setShowSuccess(false); // Hide the success message after 3 seconds
      setShowForm(false); // Close the form after submission
    }, 3000);
  };

  const handleRequestClick = (item: MarketData) => {
    setSelectedItem(item);
    setShowForm(true);
  };

  const filteredData = marketData.filter((item) =>
    item.seller.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-green-800 flex items-center mb-6 justify-center gap-2">
            Rwanda Agricultural Market Prices
          </h1>
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

        {/* Show success message after form submission */}
        {showSuccess && (
          <div className="bg-green-100 text-green-800 p-3 rounded-lg mb-4 text-center">
            Request submitted successfully!
          </div>
        )}

        <div className="grid gap-4">
          {filteredData.map((item) => (
            <div
              key={item.Id}
              className="bg-white p-4 rounded-lg shadow-lg flex justify-between items-center"
            >
              <div>
                <h2 className="text-lg font-semibold">{item.seller}</h2>
                <p>Location: {item.location}</p>
                <p>
                  Price per kg: {item.pricePerKg} {item.payment_meth}
                </p>
              </div>
              <button
                onClick={() => handleRequestClick(item)}
                className="bg-green-600 text-white px-4 py-2 rounded-lg"
              >
                {item.request}
              </button>
            </div>
          ))}
        </div>

        {showForm && selectedItem && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <form
              onSubmit={handleSubmit}
              className="bg-white p-6 rounded-lg shadow-lg"
            >
              <h2 className="text-xl font-semibold mb-4">
                Request Maize Purchase
              </h2>
              <div className="mb-4">
                <label className="block text-gray-700">Quantity (kg)</label>
                <input
                  type="number"
                  value={formData.quantity}
                  onChange={(e) =>
                    setFormData({ ...formData, quantity: e.target.value })
                  }
                  required
                  className="w-full p-2 border rounded-lg"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Amount to Pay</label>
                <input
                  type="text"
                  value={`${
                    selectedItem.pricePerKg *
                    (parseFloat(formData.quantity) || 0)
                  } ${selectedItem.payment_meth}`}
                  disabled
                  className="w-full p-2 border rounded-lg bg-gray-200"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Payment Method</label>
              </div>
              <button
                type="submit"
                className="bg-green-600 text-white px-6 py-2 rounded-lg"
              >
                Confirm
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Maize;
