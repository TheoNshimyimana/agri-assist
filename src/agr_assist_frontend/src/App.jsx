import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Home from "./pages/Home";
import AIChatbot from "./components/AiChatBot";
import CropsMonitoring from "./components/CropsMonitoring";
import PestDiseaseAlerts from "./components/PestAndAlert";
import SoilHealthAnalysis from "./components/SoilHealthyAnalysis";
import MarketPrices from "./components/MarketPrice";
import ReportsAnalytics from "./components/ReportsAndAnalytics";
import WeatherForecast from "./components/WeatherForeCast";
import Overview from "./components/Overview";
import WalletPage from "./components/Wallet";
import StockPage from "./components/Stock";
import DocumentationPage from "./components/Documentation";
import Maize from "./components/products/Maize";
import RicePage from "./components/products/Rice";
import BeansPage from "./components/products/BeansPage";



const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />

        {/* Route for Home Page which includes the Navbar */}
        <Route path="/home/*" element={<Home />}>
          <Route path="overview" element={<Overview />} />
          <Route path="stock" element={<StockPage />} />
          <Route path="documentation" element={<DocumentationPage />} />
          <Route path="my-wallet" element={<WalletPage />} />
          <Route path="ai-chatbot" element={<AIChatbot />} />
          <Route path="crop-monitoring" element={<CropsMonitoring />} />
          <Route path="weather-forecast" element={<WeatherForecast />} />
          <Route path="pest-disease-alerts" element={<PestDiseaseAlerts />} />
          <Route path="soil-health-analysis" element={<SoilHealthAnalysis />} />
          <Route path="market-prices" element={<MarketPrices />} />
          <Route path="reports-analytics" element={<ReportsAnalytics />} />
          <Route path="maize" element={<Maize />} />
          <Route path="rice" element={<RicePage />} />
          <Route path="beans" element={<BeansPage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
