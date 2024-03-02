import axios from 'axios';

const API_KEY = '7c3782b69fd96ec0ac80ab7e598f9ec5'; // Replace with your weather API key

export const fetchWeatherData = async (location) => {
  const url = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${location.lat},${location.lon}`;
  const response = await axios.get(url);
  return response.data;
};
