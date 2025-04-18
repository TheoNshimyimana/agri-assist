import React, { useEffect, useState } from "react";
import WeatherCard from "../components/ui/card";

interface ForecastData {
  dt_txt: string;
  main: {
    temp: number;
    temp_min: number;
    temp_max: number;
    humidity: number;
  };
  weather: Array<{
    description: string;
    icon: string;
  }>;
  wind: {
    speed: number;
  };
}

const WeatherForecast: React.FC = () => {
  const [weatherData, setWeatherData] = useState<ForecastData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [city, setCity] = useState<string>("Kigali"); 
  const [cityInput, setCityInput] = useState<string>(""); 
  const API_KEY = "9e8e22c73eb6aba8d533790f58b1015c";

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
        );
        const data = await response.json();

        console.log("API Response:", data); 

        if (data.cod !== "200") {
          throw new Error(data.message || "Failed to fetch weather data");
        }

        
        const dailyForecast: ForecastData[] = [];
        const uniqueDates = new Set();

        for (const forecast of data.list) {
          const forecastDate = new Date(forecast.dt_txt).toLocaleDateString();

          if (!uniqueDates.has(forecastDate) && dailyForecast.length < 6) {
            uniqueDates.add(forecastDate);
            dailyForecast.push(forecast);
          }
        }

        setWeatherData(dailyForecast);
      } catch (err) {
        console.error("Error fetching weather data:", err);
        setError("Could not fetch weather data. Please try again later.");
      } finally {
        setLoading(false); 
      }
    };

    fetchWeatherData();
  }, [city]); 

  const handleCityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCityInput(event.target.value);
  };

  const handleCitySubmit = () => {
    setCity(cityInput); 
    setCityInput(""); 
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold text-green-500 mb-6">
        6-Day Weather Prediction
      </h2>

      <p className="text-gray-700 mb-6 text-xl text-center leading-9">
        Weather forecasting utilizes AI and blockchain to provide accurate,
        real-time climate predictions, helping farmers prepare for extreme
        weather conditions. By analyzing temperature, rainfall, and wind
        patterns, it enables smarter agricultural planning.
      </p>
      <div className="mb-6 text-center">
        <input
          type="text"
          value={cityInput}
          onChange={handleCityChange}
          className="p-2 border border-gray-300 rounded-lg"
          placeholder="Enter city name"
        />
        <button
          onClick={handleCitySubmit}
          className="ml-2 p-2 bg-green-500 text-white rounded-lg"
        >
          Get Weather
        </button>
      </div>

      {error && <p className="text-red-500 text-center">{error}</p>}

      {loading ? (
        <div className="flex justify-center items-center h-32">
          <div className="w-12 h-12 border-4 border-green-500 border-dashed rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {weatherData.map((forecast, index) => (
            <WeatherCard
              key={index}
              date={
                index === 0
                  ? "Today"
                  : index === 1
                  ? "Tomorrow"
                  : new Date(forecast.dt_txt).toLocaleDateString()
              }
              temperature={forecast.main.temp}
              condition={forecast.weather[0].description}
              icon={forecast.weather[0].icon}
              windSpeed={forecast.wind.speed}
              humidity={forecast.main.humidity}
              minTemp={forecast.main.temp_min}
              maxTemp={forecast.main.temp_max}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default WeatherForecast;
