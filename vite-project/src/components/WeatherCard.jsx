// import React, { useEffect, useState } from "react";

// export default function WeatherCard({ city }) {
//   const [weather, setWeather] = useState(null);
//   const [time, setTime] = useState(new Date());

//   useEffect(() => {
//     const key = import.meta.env.VITE_OPENWEATHER_API_KEY;
//     fetch(
//       `https://api.open-meteo.com/v1/forecast?latitude=-1.9536&longitude=30.0606&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code&temperature_unit=celsius&wind_speed_unit=kmh&timezone=Africa%2FKigali`
//     )
//       .then((res) => res.json())
//       .then((data) => setWeather(data));

//     const interval = setInterval(() => setTime(new Date()), 1000);
//     return () => clearInterval(interval);
//   }, [city]);

//   if (!weather) return <p>Loading weather...</p>;

//   return (
//     <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
//       <h2 className="text-lg font-semibold flex items-center gap-2 mb-4">
//         <span className="text-blue-600">☁️</span> Current Weather
//       </h2>

//       <div className="flex flex-col items-center text-center">
//         <img
//           src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
//           alt="icon"
//           className="w-16 h-16"
//         />
//         <p className="text-4xl font-bold">{Math.round(weather.main.temp)}°C</p>
//         <p className="capitalize">{weather.weather[0].description}</p>
//         <p className="text-gray-500 dark:text-gray-300">
//           {weather.name}, {weather.sys.country}
//         </p>

//         <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3 mt-4 w-full">
//           <p className="text-blue-600 font-bold text-lg">
//             {time.toLocaleTimeString()}
//           </p>
//           <p className="text-sm">
//             {time.toLocaleDateString(undefined, {
//               weekday: "long",
//               month: "long",
//               day: "numeric",
//               year: "numeric",
//             })}
//           </p>
//         </div>

//         <div className="flex justify-around w-full mt-4 text-center">
//           <div>
//             <p className="text-blue-600 font-bold">{Math.round(weather.main.temp)}°</p>
//             <p className="text-sm">Temperature</p>
//           </div>
//           <div>
//             <p className="text-blue-600 font-bold">{weather.wind.speed}</p>
//             <p className="text-sm">Wind (km/h)</p>
//           </div>
//           <div>
//             <p className="text-blue-600 font-bold">{weather.main.humidity}%</p>
//             <p className="text-sm">Humidity</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }




import React from 'react';
import { useEffect, useState } from 'react';

export default function WeatherCard({ isDarkMode }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const fetchWeatherData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          'https://api.open-meteo.com/v1/forecast?latitude=-1.9536&longitude=30.0606&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code&temperature_unit=celsius&wind_speed_unit=kmh&timezone=Africa%2FKigali'
        );

        if (!response.ok) {
          throw new Error('Failed to fetch weather data');
        }

        const result = await response.json();

        const weatherConditions = {
          0: { condition: 'Clear sky', icon: '☀️' },
          1: { condition: 'Mainly clear', icon: '🌤️' },
          2: { condition: 'Partly cloudy', icon: '⛅' },
          3: { condition: 'Overcast', icon: '☁️' },
          45: { condition: 'Foggy', icon: '🌫️' },
          48: { condition: 'Foggy', icon: '🌫️' },
          51: { condition: 'Light drizzle', icon: '🌦️' },
          53: { condition: 'Moderate drizzle', icon: '🌧️' },
          55: { condition: 'Dense drizzle', icon: '🌧️' },
          61: { condition: 'Slight rain', icon: '🌧️' },
          63: { condition: 'Moderate rain', icon: '🌧️' },
          65: { condition: 'Heavy rain', icon: '⛈️' },
          71: { condition: 'Slight snow', icon: '🌨️' },
          73: { condition: 'Moderate snow', icon: '❄️' },
          75: { condition: 'Heavy snow', icon: '❄️' },
          95: { condition: 'Thunderstorm', icon: '⛈️' },
        };

        const weatherCode = result.current.weather_code;
        const weather = weatherConditions[weatherCode] || {
          condition: 'Unknown',
          icon: '🌡️',
        };

        setData({
          temperature: Math.round(result.current.temperature_2m),
          condition: weather.condition,
          windSpeed: Math.round(result.current.wind_speed_10m),
          humidity: result.current.relative_humidity_2m,
          location: 'Kigali, Rwanda',
          icon: weather.icon,
        });
      } catch (err) {
        setError(err.message || 'Failed to fetch weather data');
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherData();
    const interval = setInterval(fetchWeatherData, 300000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (loading) {
    return (
      <div className={`rounded-xl shadow-lg p-8 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} transition-colors duration-300`}>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin text-blue-500 text-3xl">⏳</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`rounded-xl shadow-lg p-8 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} transition-colors duration-300`}>
        <div className="flex items-center justify-center h-64">
          <p className="text-red-500 text-lg">{error}</p>
        </div>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className={`rounded-xl shadow-lg p-6 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'} transition-colors duration-300 hover:shadow-xl`}>
      <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
        ☁️ Current Weather
      </h2>

      <div className="flex flex-col items-center mb-6">
        <div className="text-7xl mb-4">{data.icon}</div>
        <div className="text-6xl font-bold mb-2">{data.temperature}°C</div>
        <p className={`text-xl ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>{data.condition}</p>
        <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{data.location}</p>
      </div>

      <div className={`mb-6 p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-blue-50'} border ${isDarkMode ? 'border-gray-600' : 'border-blue-200'}`}>
        <div className="flex items-center justify-center gap-2 mb-2">
          🕒 <span className="text-2xl font-mono font-bold">{formatTime(currentTime)}</span>
        </div>
        <p className={`text-center text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          {formatDate(currentTime)}
        </p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className={`text-center p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
          🌡️
          <p className="text-2xl font-bold">{data.temperature}°</p>
          <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mt-1`}>Temperature</p>
        </div>
        <div className={`text-center p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
          💨
          <p className="text-2xl font-bold">{data.windSpeed}</p>
          <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mt-1`}>Wind (km/h)</p>
        </div>
        <div className={`text-center p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
          💧
          <p className="text-2xl font-bold">{data.humidity}%</p>
          <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mt-1`}>Humidity</p>
        </div>
      </div>
    </div>
  );
}

