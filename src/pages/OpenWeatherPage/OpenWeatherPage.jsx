import { useState } from "react";
import * as openWeatherApi from '../../utils/openWeatherApi';
import Map from '../../components/Map/Map';
import Pollutants from '../../components/Pollutants/Pollutants';
import AQIComponent from "../../components/AQIComponent/AQIComponent";

export default function OpenWeatherPage() {
    const [openWeatherData, setOpenWeatherData] = useState(null);
    const [resData, setResData] = useState(null);
    const [error, setError] = useState('');

    async function fetchOpenWeatherApi() {
        const openWeatherDataValue = {
            lat: "34.05",
            lon: "-118.25"
        };
        try {
            const openWeatherDataRes = await openWeatherApi.fetchOpenWeatherData(openWeatherDataValue);
            console.log("openWeatherDataRes", openWeatherDataRes);

            setOpenWeatherData(openWeatherDataRes);
            const data = {
                lon: openWeatherDataRes.coord.lon,
                lat: openWeatherDataRes.coord.lat,
                aqi: openWeatherDataRes.list[0].main.aqi,
                co: openWeatherDataRes.list[0].components.co,
                no: openWeatherDataRes.list[0].components.no,
                no2: openWeatherDataRes.list[0].components.no2,
                o3: openWeatherDataRes.list[0].components.o3,
                so2: openWeatherDataRes.list[0].components.so2,
                pm2_5: openWeatherDataRes.list[0].components.pm2_5,
                pm10: openWeatherDataRes.list[0].components.pm10,
                nh3: openWeatherDataRes.list[0].components.nh3,
                dt: openWeatherDataRes.list[0].dt,
            };
            console.log('data', data);
            setResData(data);
        } catch (err) {
            console.log(err);
            setError(err.message);
        }
    }

    return (
        <>
            <Map />
            <Pollutants />

            <button onClick={fetchOpenWeatherApi}> CLICK ME: Search LA coordinates</button>

            <div>
                {openWeatherData ? JSON.stringify(openWeatherData) : "Need to search something!"}
            </div>

            {/* Pass resData to AQIComponent */}
            {resData && <AQIComponent data={resData} />}

            {/* Display any errors */}
            {error && <div style={{ color: 'red' }}>Error: {error}</div>}
        </>
    );
}