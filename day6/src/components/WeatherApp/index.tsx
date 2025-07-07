import { WiDaySunny, WiCloudy, WiRain, WiSnow } from "react-icons/wi";
import { BsSearch } from "react-icons/bs";
import { useState, useEffect } from "react";

const API_KEY = "c9a0ca46550648b29ce125849232709";

interface WeatherData {
  location: {
    name: string;
    country: string;
  };
  current: {
    temp_c: number;
    condition: {
      text: string;
      icon: string;
    };
    humidity: number;
    wind_kph: number;
  };
}

interface ForecastData {
  forecast: {
    forecastday: Array<{
      hour: Array<{
        time: string;
        temp_c: number;
        condition: {
          text: string;
          icon: string;
        };
      }>;
    }>;
  };
}

export default function WeatherApp() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [forecastData, setForecastData] = useState<ForecastData | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("Da nang");
  const [error, setError] = useState("");

  const fetchWeatherData = async (city: string) => {
    try {
      setLoading(true);
      setError("");

      // Fetch current weather
      const currentResponse = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${encodeURIComponent(
          city
        )}&aqi=no&lang=vi`
      );

      if (!currentResponse.ok) {
        throw new Error("City not found");
      }

      const currentData = await currentResponse.json();

      // Fetch hourly forecast
      const forecastResponse = await fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${encodeURIComponent(
          city
        )}&days=1&aqi=no&alerts=no&lang=vi`
      );

      const forecastData = await forecastResponse.json();

      setWeatherData(currentData);
      setForecastData(forecastData);
    } catch (err) {
      setError("Failed to fetch weather data");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeatherData(searchQuery);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      fetchWeatherData(searchQuery.trim());
    }
  };

  const getWeatherIcon = (condition: string) => {
    const lowerCondition = condition.toLowerCase();
    if (lowerCondition.includes("sun") || lowerCondition.includes("clear")) {
      return <WiDaySunny size={120} className="text-yellow-300" />;
    } else if (lowerCondition.includes("cloud")) {
      return <WiCloudy size={120} className="text-gray-300" />;
    } else if (lowerCondition.includes("rain")) {
      return <WiRain size={120} className="text-blue-300" />;
    } else if (lowerCondition.includes("snow")) {
      return <WiSnow size={120} className="text-white" />;
    }
    return <WiDaySunny size={120} className="text-yellow-300" />;
  };

  const getHourlyIcon = (condition: string) => {
    const lowerCondition = condition.toLowerCase();
    if (lowerCondition.includes("sun") || lowerCondition.includes("clear")) {
      return <WiDaySunny size={40} className="text-yellow-500" />;
    } else if (lowerCondition.includes("cloud")) {
      return <WiCloudy size={40} className="text-gray-500" />;
    } else if (lowerCondition.includes("rain")) {
      return <WiRain size={40} className="text-blue-500" />;
    }
    return <WiDaySunny size={40} className="text-yellow-500" />;
  };

  const getHourlyForecast = () => {
    if (!forecastData) return [];

    const currentHour = new Date().getHours();
    const todayHours = forecastData.forecast.forecastday[0].hour;

    return todayHours
      .filter((_, index) => index >= currentHour)
      .slice(0, 4)
      .map((hour, index) => ({
        time:
          index === 0
            ? "Now"
            : new Date(hour.time).toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
              }),
        temp: `${Math.round(hour.temp_c)}°`,
        icon: getHourlyIcon(hour.condition.text),
      }));
  };

  if (loading) {
    return (
      <div className="max-w-sm mx-auto bg-gradient-to-b from-blue-300 to-blue-400 min-h-screen text-white flex items-center justify-center">
        <div className="text-2xl">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-sm mx-auto bg-gradient-to-b from-blue-300 to-blue-400 min-h-screen text-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-xl mb-4">{error}</div>
          <button
            onClick={() => fetchWeatherData(searchQuery)}
            className="bg-white/30 px-4 py-2 rounded-lg"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-sm mx-auto bg-gradient-to-b from-blue-300 to-blue-400 min-h-screen text-white">
      {/* Search Bar */}
      <div className="pt-12 px-4 pb-6">
        <form onSubmit={handleSearch} className="relative">
          <BsSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 z-10 text-xl" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Enter city name..."
            className="w-full bg-white/30 backdrop-blur-sm rounded-2xl py-3 pl-10 pr-4 text-white placeholder-white/70"
          />
        </form>
      </div>

      {/* Current Weather */}
      <div className="px-4 pb-6">
        <div className="text-center mb-4">
          <div className="text-lg text-white/80">
            {weatherData?.location.name}, {weatherData?.location.country}
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <div className="text-8xl font-light">
              {Math.round(weatherData?.current.temp_c || 0)}°
            </div>
            <div className="text-2xl font-light mt-2">
              {weatherData?.current.condition.text}
            </div>
          </div>
          <div className="text-white">
            {getWeatherIcon(weatherData?.current.condition.text || "")}
          </div>
        </div>
      </div>

      {/* Humidity & Wind Cards */}
      <div className="px-4 pb-6">
        <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-lg text-white/70 mb-2">Humidity</div>
              <div className="text-3xl font-semibold">
                {weatherData?.current.humidity}%
              </div>
            </div>
            <div className="text-center border-l border-white/30">
              <div className="text-lg text-white/70 mb-2">Wind</div>
              <div className="text-3xl font-semibold">
                {weatherData?.current.wind_kph} km/h
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hourly Forecast */}
      <div className="px-4">
        <div className="bg-white/90 rounded-2xl p-4">
          <div className="text-gray-800 text-xl font-semibold mb-4">
            Hourly Forecast
          </div>
          <div className="grid grid-cols-4 gap-2">
            {getHourlyForecast().map((item, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-2">{item.icon}</div>
                <div className="text-2xl font-semibold text-gray-800 mb-1">
                  {item.temp}
                </div>
                <div className="text-sm text-gray-600">{item.time}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
