// import Debug "mo:base/Debug";
import Text "mo:base/Text";
import Array "mo:base/Array";
import Option "mo:base/Option";

actor AgriAssist {

  // Type definitions for different sections
  public type Overview = {
    title: Text;
    description: Text;
  };

  public type AIChatbotResponse = {
    question: Text;
    response: Text;
  };

  public type CropMonitoring = {
    farmId: Text;
    healthStatus: Text;
    suggestedActions: Text;
  };

  public type WeatherForecast = {
    location: Text;
    temperature: Float;
    humidity: Float;
    conditions: Text;
  };

  public type PestAlert = {
    region: Text;
    pestType: Text;
    alertLevel: Text;
  };

  public type SoilHealth = {
    farmId: Text;
    phLevel: Float;
    nutrients: Text;
  };

  public type MarketPrice = {
    cropType: Text;
    pricePerKg: Float;
    region: Text;
  };

  public type Report = {
    reportId: Text;
    content: Text;
    date: Text;
  };

  // 🟢 Stable storage (arrays instead of HashMap)
  stable var overviewData: [(Text, Overview)] = [];
  stable var chatbotDatabase: [(Text, AIChatbotResponse)] = [];
  stable var cropMonitoringData: [(Text, CropMonitoring)] = [];
  stable var weatherData: [(Text, WeatherForecast)] = [];
  stable var pestAlerts: [(Text, PestAlert)] = [];
  stable var soilHealthData: [(Text, SoilHealth)] = [];
  stable var marketPrices: [(Text, MarketPrice)] = [];
  stable var reports: [(Text, Report)] = [];

  // 🟢 Function to add or update overview data
  public func setOverview(title: Text, description: Text): async Text {
    let newEntry: Overview = { title = title; description = description };

    // Filter out the existing entry and create a new list
    overviewData := Array.append<(Text, Overview)>(
      Array.filter<(Text, Overview)>(overviewData, func (entry) { entry.0 != title }),
      [(title, newEntry)]
    );

    return "Overview updated successfully!";
  };

  public query func getOverview(title: Text): async ?Overview {
    return Option.map<(Text, Overview), Overview>(
      Array.find<(Text, Overview)>(overviewData, func (entry) { entry.0 == title }),
      func (entry) { entry.1 }
    );
  };

  // 🟢 Function to add or update chatbot responses
  public func setChatbotResponse(question: Text, response: Text): async Text {
    let newEntry: AIChatbotResponse = { question = question; response = response };

    // Filter out the existing entry and create a new list
    chatbotDatabase := Array.append<(Text, AIChatbotResponse)>(
      Array.filter<(Text, AIChatbotResponse)>(chatbotDatabase, func (entry) { entry.0 != question }),
      [(question, newEntry)]
    );

    return "Chatbot response saved!";
  };

  public query func getChatbotResponse(question: Text): async ?AIChatbotResponse {
    return Option.map<(Text, AIChatbotResponse), AIChatbotResponse>(
      Array.find<(Text, AIChatbotResponse)>(chatbotDatabase, func (entry) { entry.0 == question }),
      func (entry) { entry.1 }
    );
  };

  // 🟢 Function to update crop monitoring data
  public func setCropMonitoring(farmId: Text, healthStatus: Text, suggestedActions: Text): async Text {
    let newEntry: CropMonitoring = { farmId = farmId; healthStatus = healthStatus; suggestedActions = suggestedActions };

    // Filter out the existing entry and create a new list
    cropMonitoringData := Array.append<(Text, CropMonitoring)>(
      Array.filter<(Text, CropMonitoring)>(cropMonitoringData, func (entry) { entry.0 != farmId }),
      [(farmId, newEntry)]
    );

    return "Crop monitoring data updated!";
  };

  public query func getCropMonitoring(farmId: Text): async ?CropMonitoring {
    return Option.map<(Text, CropMonitoring), CropMonitoring>(
      Array.find<(Text, CropMonitoring)>(cropMonitoringData, func (entry) { entry.0 == farmId }),
      func (entry) { entry.1 }
    );
  };

  // 🟢 Function to update soil health data
  public func setSoilHealth(farmId: Text, phLevel: Float, nutrients: Text): async Text {
    let newEntry: SoilHealth = { farmId = farmId; phLevel = phLevel; nutrients = nutrients };

    // Filter out the existing entry and create a new list
    soilHealthData := Array.append<(Text, SoilHealth)>(
      Array.filter<(Text, SoilHealth)>(soilHealthData, func (entry) { entry.0 != farmId }),
      [(farmId, newEntry)]
    );

    return "Soil health data updated!";
  };

  public query func getSoilHealth(farmId: Text): async ?SoilHealth {
    return Option.map<(Text, SoilHealth), SoilHealth>(
      Array.find<(Text, SoilHealth)>(soilHealthData, func (entry) { entry.0 == farmId }),
      func (entry) { entry.1 }
    );
  };

  // 🟢 Function to update weather data
  public func setWeatherForecast(location: Text, temperature: Float, humidity: Float, conditions: Text): async Text {
    let newEntry: WeatherForecast = { location = location; temperature = temperature; humidity = humidity; conditions = conditions };

    // Filter out the existing entry and create a new list
    weatherData := Array.append<(Text, WeatherForecast)>(
      Array.filter<(Text, WeatherForecast)>(weatherData, func (entry) { entry.0 != location }),
      [(location, newEntry)]
    );

    return "Weather forecast updated!";
  };

  public query func getWeatherForecast(location: Text): async ?WeatherForecast {
    return Option.map<(Text, WeatherForecast), WeatherForecast>(
      Array.find<(Text, WeatherForecast)>(weatherData, func (entry) { entry.0 == location }),
      func (entry) { entry.1 }
    );
  };

  // 🟢 Function to update pest alerts
  public func setPestAlert(region: Text, pestType: Text, alertLevel: Text): async Text {
    let newEntry: PestAlert = { region = region; pestType = pestType; alertLevel = alertLevel };

    // Filter out the existing entry and create a new list
    pestAlerts := Array.append<(Text, PestAlert)>(
      Array.filter<(Text, PestAlert)>(pestAlerts, func (entry) { entry.0 != region }),
      [(region, newEntry)]
    );

    return "Pest alert updated!";
  };

  public query func getPestAlert(region: Text): async ?PestAlert {
    return Option.map<(Text, PestAlert), PestAlert>(
      Array.find<(Text, PestAlert)>(pestAlerts, func (entry) { entry.0 == region }),
      func (entry) { entry.1 }
    );
  };

  // 🟢 Function to update market prices
  public func setMarketPrice(cropType: Text, pricePerKg: Float, region: Text): async Text {
    let newEntry: MarketPrice = { cropType = cropType; pricePerKg = pricePerKg; region = region };

    // Filter out the existing entry and create a new list
    marketPrices := Array.append<(Text, MarketPrice)>(
      Array.filter<(Text, MarketPrice)>(marketPrices, func (entry) { entry.0 != cropType }),
      [(cropType, newEntry)]
    );

    return "Market price updated!";
  };

  public query func getMarketPrice(cropType: Text): async ?MarketPrice {
    return Option.map<(Text, MarketPrice), MarketPrice>(
      Array.find<(Text, MarketPrice)>(marketPrices, func (entry) { entry.0 == cropType }),
      func (entry) { entry.1 }
    );
  };

  // 🟢 Function to add reports
  public func setReport(reportId: Text, content: Text, date: Text): async Text {
    let newEntry: Report = { reportId = reportId; content = content; date = date };

    // Filter out the existing entry and create a new list
    reports := Array.append<(Text, Report)>(
      Array.filter<(Text, Report)>(reports, func (entry) { entry.0 != reportId }),
      [(reportId, newEntry)]
    );

    return "Report added!";
  };

  public query func getReport(reportId: Text): async ?Report {
    return Option.map<(Text, Report), Report>(
      Array.find<(Text, Report)>(reports, func (entry) { entry.0 == reportId }),
      func (entry) { entry.1 }
    );
  };
}
