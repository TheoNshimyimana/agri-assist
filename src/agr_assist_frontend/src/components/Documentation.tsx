import { useState } from "react";


const DocumentationPage = () => {
  const [activeTab, setActiveTab] = useState("overview");

  const renderTabContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-gray-800">Overview</h3>
            <p className="text-gray-700 leading-9 text-lg">
              Agriculture is one of the most essential sectors for ensuring food
              security worldwide. By integrating Artificial Intelligence (AI),
              we are transforming the way farming is done. AI tools enable
              farmers to make better decisions on planting, harvesting,
              irrigation, and pest control, leading to more sustainable and
              efficient agricultural practices.
            
              Our AI-powered platform provides real-time data analysis, crop
              prediction models, and resource optimization, helping farmers
              increase yields and reduce costs. With the ability to predict
              market prices, monitor soil health, and analyze weather patterns,
              AI can enable farmers to optimize their entire operation.

            </p>
            
          </div>
        );
      case "usage":
        return (
          <div className="space-y-4 text-gray-700 leading-9 text-lg">
            <h3 className="text-xl font-bold text-gray-800">
              How to Use the AI Platform
            </h3>
            <p className="text-gray-700 leading-9 text-lg">
              Our platform is designed to be user-friendly and easy to navigate.
              Follow these steps to make the most out of it:
            </p>
            <ol className="list-decimal pl-6 space-y-2">
              <li>
                <strong>Create an Account:</strong> Sign up to access
                personalized insights, crop predictions, and more.
              </li>
              <li>
                <strong>Upload Crop Data:</strong> Enter details about your
                crops, location, and current growing conditions for accurate
                predictions.
              </li>
              <li>
                <strong>Analyze Results:</strong> Use the platform’s data
                analytics tools to assess your crop's health, market trends, and
                suggested actions.
              </li>
              <li>
                <strong>Receive Recommendations:</strong> Based on your crop
                data and environmental factors, receive actionable insights such
                as irrigation schedules, pest management advice, and growth
                optimization strategies.
              </li>
            </ol>
          </div>
        );
      case "faq":
        return (
          <div className="space-y-4 text-base">
            <h3 className="text-xl font-bold text-gray-800">
              Frequently Asked Questions
            </h3>
            <div className="space-y-3">
              <div>
                <h4 className="font-semibold text-gray-700">
                  What crops can I track with the platform?
                </h4>
                <p>
                  Our platform supports a wide range of crops, including maize,
                  rice, beans, potatoes, and more. You can customize the
                  platform to track the crops that are relevant to your region
                  and farming needs.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-700">
                  How accurate are the crop predictions?
                </h4>
                <p className="text-gray-700">
                  The AI models use real-time data from various sources,
                  including weather forecasts and market trends. While they are
                  highly accurate, external factors like unusual weather
                  patterns can still influence the predictions.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-700">
                  Is the platform available in my country?
                </h4>
                <p>
                  Our platform is currently available in Rwanda and is expanding
                  to other African countries. Check the availability of the
                  platform in your region on our website.
                </p>
              </div>
            </div>
          </div>
        );
      default:
        return <div>Content not found.</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-md p-6">
        <h1 className="text-3xl font-bold text-center text-green-600 mb-6">
          Ai-Powered AGRI-Assist (AI for Sustainable Farming) 🌱
        </h1>

        <div className="flex justify-around mb-8">
          <button
            onClick={() => setActiveTab("overview")}
            className={`px-6 py-1 rounded-md font-semibold text-gray-700 ${
              activeTab === "overview"
                ? "bg-green-500 text-white"
                : "hover:bg-green-100"
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab("usage")}
            className={`px-6 py-2 rounded-md font-semibold text-gray-700 ${
              activeTab === "usage"
                ? "bg-green-500 text-white"
                : "hover:bg-green-100"
            }`}
          >
            How to Use
          </button>
          <button
            onClick={() => setActiveTab("faq")}
            className={`px-6 rounded-md font-semibold text-gray-700 ${
              activeTab === "faq"
                ? "bg-green-500 text-white"
                : "hover:bg-green-100"
            }`}
          >
            FAQ
          </button>
        </div>

        <div className="space-y-4">{renderTabContent()}</div>
      </div>
    </div>
  );
};

export default DocumentationPage;
