import { useState, useEffect } from "react";
import * as openWeatherApi from '../../utils/openWeatherApi';

export default function OpenWeatherPage() {
    const [openWeatherData, setOpenWeatherData] = useState(null)
    const [resData, setResData] = useState(null)
    const [error, setError] = useState('')

    async function fetchOpenWeatherApi() {
        const openWeatherDataValue = {
            lat: "34.05",
            lon: "-118.25"
        }
        try {
            const openWeatherDataReq = await openWeatherApi.fetchOpenWeatherData(openWeatherDataValue)
            try { if (!openWeatherDataReq.ok) throw new Error('Error fetching data'); }
            catch (error) { console.log(error) }
            console.log("openWeatherDataReq", openWeatherDataReq)
            const openWeatherDataRes = await openWeatherDataReq;
            setOpenWeatherData(openWeatherDataRes)
            const data ={
                lon: (openWeatherDataRes.coord.lon),
                lat: (openWeatherDataRes.coord.lat),
                aqi: (openWeatherDataRes.list[0].main.aqi),
                co: (openWeatherDataRes.list[0].components.co),
                no: (openWeatherDataRes.list[0].components.no),
                no2: (openWeatherDataRes.list[0].components.no2),
                o3: (openWeatherDataRes.list[0].components.o3),
                so2: (openWeatherDataRes.list[0].components.so2),
                pm2_5: (openWeatherDataRes.list[0].components.pm2_5),
                pm10: (openWeatherDataRes.list[0].components.pm10),
                nh3: (openWeatherDataRes.list[0].components.nh3),
                dt: (openWeatherDataRes.list[0].dt),

            }
            console.log('data', data)
            setResData(data)
            
            // setError('')
        } catch (err) {
            console.log(err)
            setError(err.message);
        }
    }

    return (
        <>
            <h1>HELLO</h1>

            <button onClick={() => fetchOpenWeatherApi()}> CLICK ME: Search LA coordinates</button>

            <div >

                {(openWeatherData) ? (JSON.stringify(openWeatherData))
                    : "Need to search something!"}
            </div>
        </>
    )


}