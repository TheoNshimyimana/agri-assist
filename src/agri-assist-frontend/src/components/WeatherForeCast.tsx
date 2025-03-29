import React, { useState, useEffect } from "react";

// Define TypeScript interfaces for the weather data
interface Weather {
  description: string;
}

interface Main {
  temp: number;
  humidity: number;
}

interface Wind {
  speed: number;
}

interface WeatherData {
  weather: Weather[];
  main: Main;
  wind: Wind;
  name: string;
}

const WeatherForecast = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null); // Specify that weatherData is either WeatherData or null
  const [location, setLocation] = useState("Kigali"); // Default city

  useEffect(() => {
    // Fetch weather data using a weather API
    const fetchWeather = async () => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=YOUR_API_KEY&units=metric`
        );
        const data: WeatherData = await response.json(); // Cast the response to WeatherData
        setWeatherData(data);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    fetchWeather();
  }, [location]);

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg max-w-2xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Weather Forecast</h2>
      <div className="mb-4">
        <label htmlFor="location" className="block text-gray-700">
          Enter Location:
        </label>
        <input
          id="location"
          type="text"
          className="mt-2 p-2 w-full border border-gray-300 rounded-md"
          placeholder="Enter city"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>

      {weatherData ? (
        <div className="mt-4">
          <h3 className="text-xl font-semibold">{weatherData.name}</h3>
          <p className="text-gray-700">{weatherData.weather[0].description}</p>
          <div className="mt-4">
            <p className="text-lg font-bold">
              Temperature: {weatherData.main.temp}°C
            </p>
            <p className="text-lg">Humidity: {weatherData.main.humidity}%</p>
            <p className="text-lg">Wind Speed: {weatherData.wind.speed} m/s</p>
          </div>
        </div>
      ) : (
        <p className="text-gray-700 mt-4">Loading weather data...</p>
      )}
    </div>
  );
};

export default WeatherForecast;
