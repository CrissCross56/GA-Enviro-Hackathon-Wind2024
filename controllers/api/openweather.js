
module.exports = {
    search
}

async function search(req, res) {
    try {
        const API_key = process.env.OPENWEATHER_API_KEY
        const url = `http://api.openweathermap.org/data/2.5/air_pollution?lat=${req.body.lat}&lon=${req.body.lon}&appid=${API_key}`
        const OpenWeatherApiDataRequest = await fetch(url, {
            // headers: {
            //     'Accept': 'application/json',
            //     'Authorization': `Bearer ${API_key}`
            // }
        });
        console.log("fetch(url, API_key):", url, API_key);
        if (!OpenWeatherApiDataRequest.ok) {
            console.error(`Open Weather API error: ${OpenWeatherApiDataRequest.status} - ${OpenWeatherApiDataRequest.statusText}`);
            throw new Error(`Failed to fetch OpenWeatherApiDataRequest data: ${OpenWeatherApiDataRequest.statusText}`);
        }
        const openWeatherDataResponse = await OpenWeatherApiDataRequest.json();
        console.log("openWeatherDataResponse:",openWeatherDataResponse)
        res.status(200).json(openWeatherDataResponse)
    } catch (error) {
        console.log("ERROR:", error)
        res.status(400).json(error);
    }
}