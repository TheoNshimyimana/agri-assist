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


const App = () => {
  return (
      <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home/*" element={<Home />}>
          <Route path="overview" element={<Overview />} />
          <Route path="ai-chatbot" element={<AIChatbot />} />
          <Route path="crop-monitoring" element={<CropsMonitoring />} />
          <Route path="weather-forecast" element={<WeatherForecast />} />
          <Route path="pest-disease-alerts" element={<PestDiseaseAlerts />} />
          <Route path="soil-health-analysis" element={<SoilHealthAnalysis />} />
          <Route path="market-prices" element={<MarketPrices />} />
          <Route path="reports-analytics" element={<ReportsAnalytics />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;

