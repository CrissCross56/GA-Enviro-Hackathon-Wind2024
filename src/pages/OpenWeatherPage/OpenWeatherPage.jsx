import { useState, useEffect } from "react";
import * as openWeatherApi from '../../utils/openWeatherApi';
import Map from "../../components/Map/Map";

export default function OpenWeatherPage({ setAqiData }) {
    const [error, setError] = useState('');
    const [coordinates, setCoordinates] = useState({ lon: -118.25, lat: 34.05 });

    useEffect(() => {
        if (coordinates.lon && coordinates.lat) {
            fetchOpenWeatherApi();
        }
    }, [coordinates]);

    async function fetchOpenWeatherApi() {
        try {
            const openWeatherDataRes = await openWeatherApi.fetchOpenWeatherData(coordinates);

            if (!openWeatherDataRes || !openWeatherDataRes.list || !openWeatherDataRes.list[0]) {
                throw new Error('Error fetching data');
            }

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

            console.log('AQI Data:', data);
            // Pass the AQI data up to HomePage
            setAqiData(data);
        } catch (err) {
            console.log(err);
            setError(err.message);
        }
    }

    return (
        <>
            <Map setCoordinates={setCoordinates} />
            {error && <div>Error: {error}</div>}
        </>
    );
}