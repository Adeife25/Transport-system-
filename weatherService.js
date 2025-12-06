require('dotenv').config();
const axios = require('axios');
// const url = 'http://api.weatherapi.com/v1/current.json?key=city&q=lagos';

const WEATHER_API_KEY = process.env.API_KEY;

// -------------------------
// Fetch current weather
// -------------------------
async function getWeather(city) {

  try {
    const response = await axios.get(
      "https://api.weatherapi.com/v1/current.json",
      {
        params: {
          key: WEATHER_API_KEY,
          q: city
        }
      }
    );

  console.log("Weather fetched successfully");

    return {
      condition: response.data.current.condition.text,
      temp: response.data.current.temp_c
    };

  } catch (err) {
    console.error("Weather API Error:", err.message);
    throw new Error("Could not fetch weather data");
  }

}

 module.exports = { getWeather };

 