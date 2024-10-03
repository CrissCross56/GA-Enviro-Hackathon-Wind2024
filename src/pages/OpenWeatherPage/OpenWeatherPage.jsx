import { useState, useEffect } from "react";
import * as openWeatherApi from '../../utils/openWeatherApi';

export default function OpenWeatherPage() {
    const [openWeatherData, setOpenWeatherData] = useState(null)
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
            // setError('')
        } catch (err) {
            console.log(err)
            setError(err.message);
        }
    }

    return (
        <>
            <h1>HELLO</h1>'

            <button onClick={() => fetchOpenWeatherApi()}> CLICK ME: Search LA coordinates</button>

            <div >

                {(openWeatherData) ? (JSON.stringify(openWeatherData))
                    : "Need to search something!"}
            </div>
        </>
    )


}