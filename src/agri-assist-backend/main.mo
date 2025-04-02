
import Text "mo:base/Text";
import Array "mo:base/Array";
import Option "mo:base/Option";



actor AgriAssist {
  public type AIChatbotResponse = {
    question: Text;
    response: Text;
  };

 
  public type WeatherForecast = {
    location: Text;
    temperature: Float;
    humidity: Float;
    conditions: Text;
  };


  stable var chatbotDatabase: [(Text, AIChatbotResponse)] = [];
  stable var weatherData: [(Text, WeatherForecast)] = [];


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
}


