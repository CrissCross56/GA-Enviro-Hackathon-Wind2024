import sendRequest from "./send-request";
const BASE_URL = '/api/openweather';


export async function fetchOpenWeatherData(openWeatherData) {
    // console.log("getting Open Weather Data")
    return sendRequest(BASE_URL, 'POST', openWeatherData)
}