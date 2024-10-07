import { useState } from 'react';
import NavBar from "../../components/NavBar";
import GeoLocationTest from "../../components/GeoLocationTest";
import AQIComponent from '../../components/AQIComponent/AQIComponent';
import OpenWeatherPage from '../OpenWeatherPage/OpenWeatherPage';
import HealthRecComponent from "../../components/HealthRecComponent/HealthRecComponent";
import styles from "../../CSS/home.module.css";
import Pollutants from "../../components/Pollutants/Pollutants";
import LocationBar from "../../components/locationBar/LocationBar";
import SafetyRanges from '../../components/SafetyRanges/SafetyRanges';

import "./HomePage.css";

export default function HomePage() {
    // State to hold AQI data
    const [aqiData, setAqiData] = useState(0);
    // State to handle alert notification
    const [alertCreated, setAlertCreated] = useState(false);

    // Function to show notification for a few seconds
    const handleNotification = () => {
        setAlertCreated(true);
        setTimeout(() => {
            setAlertCreated(false);
        }, 3000); // Show notification for 3 seconds
    };



    return (
        <div className={styles.homePg}>
            <NavBar />
            <LocationBar />
            <div className={`notification-banner ${alertCreated ? 'show' : ''}`}>
                <p>Alert created successfully!</p>
            </div>
            <div className='outer-container'>
                <div className={"container-map"} >
                    <AQIComponent data={aqiData} onAlertCreate={handleNotification} />
                    {/* Pass aqiData to HealthRecComponent */}
                    <OpenWeatherPage setAqiData={setAqiData} />
                    <HealthRecComponent aqiData={aqiData} />
                    <div className="safety-ranges">
                        <SafetyRanges />
                    </div>
                    {/* <div className='pollutants'> */}
                        <Pollutants pm25={aqiData.pm2_5} pm10={aqiData.pm10} n02={aqiData.no2}></Pollutants>
                    {/* </div> */}
                    {/* <GeoLocationTest /> */}
                </div>
            </div>
        </div>
    );
}