import React, { useState } from 'react';
import Map from './map';
import WeatherChart from './WeatherChart';
import Search from './search';
import { fetchWeatherData } from './api';

function App() {
  const [weatherData, setWeatherData] = useState([]);

  const handleLocationChange = async (location) => {
    try {
      const data = await fetchWeatherData(location);
      setWeatherData(data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  return (
    <div className="App">
      <Search onLocationChange={handleLocationChange} />
      <Map onLocationSelect={handleLocationChange} />
      <WeatherChart data={weatherData} />
    </div>
  );
}

export default App;

