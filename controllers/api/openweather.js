// controllers/api/openweather.js
const fetch = require('node-fetch'); // Make sure this is installed
require('dotenv').config(); // To load environment variables

module.exports = {
    search
};

async function search(req, res) {
    try {
        const API_key = process.env.OPENWEATHER_API_KEY;
        
        // Log the API key and request body for debugging
        console.log("API Key:", API_key);
        console.log("Request Body:", req.body);

        // Check if lat and lon are provided
        if (!req.body.lat || !req.body.lon) {
            console.error("Latitude or longitude is missing in the request body");
            return res.status(400).json({ error: "Latitude and longitude are required" });
        }

        const url = `http://api.openweathermap.org/data/2.5/air_pollution?lat=${req.body.lat}&lon=${req.body.lon}&appid=${API_key}`;
        console.log("Request URL:", url);

        const OpenWeatherApiDataRequest = await fetch(url);
        
        // Check if the API request was successful
        if (!OpenWeatherApiDataRequest.ok) {
            console.error(`Open Weather API error: ${OpenWeatherApiDataRequest.status} - ${OpenWeatherApiDataRequest.statusText}`);
            throw new Error(`Failed to fetch data: ${OpenWeatherApiDataRequest.statusText}`);
        }

        const openWeatherDataResponse = await OpenWeatherApiDataRequest.json();
        console.log("OpenWeather API Response:", openWeatherDataResponse);

        res.status(200).json(openWeatherDataResponse);
    } catch (error) {
        console.error("Error in search function:", error);
        res.status(400).json({ error: error.message });
    }
}