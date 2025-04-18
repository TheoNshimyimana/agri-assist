interface WeatherCardProps {
  date: string;
  temperature: number;
  condition: string;
  icon: string;
  windSpeed: number;
  humidity: number;
  minTemp: number;
  maxTemp: number;
}

const WeatherCard: React.FC<WeatherCardProps> = ({
  date,
  temperature,
  condition,
  icon,
  windSpeed,
  humidity,
  minTemp,
  maxTemp,
}) =>

{
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-700">{date}</h3>

      <div className="flex items-center justify-between my-3">
        <img
          src={`https://openweathermap.org/img/wn/${icon}.png`}
          alt="Weather Icon"
          className="w-16 h-16"
        />
        <p className="text-3xl font-bold text-blue-600">{temperature}°C</p>
      </div>

      <p className="text-gray-600 text-center italic">{condition}</p>

      <div className="mt-3 text-sm text-gray-700">
        <p>
          🌡️ Min: {minTemp}°C | Max: {maxTemp}°C
        </p>
        <p>💨 Wind: {windSpeed} m/s</p>
        <p>💧 Humidity: {humidity}%</p>
      </div>
    </div>
  );
};

export default WeatherCard;
