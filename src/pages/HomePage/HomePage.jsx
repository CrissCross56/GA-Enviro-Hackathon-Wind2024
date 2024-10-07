import { useState } from 'react';
import NavBar from "../../components/NavBar";
import GeoLocationTest from "../../components/GeoLocationTest";
import AQIComponent from '../../components/AQIComponent/AQIComponent';
import OpenWeatherPage from '../OpenWeatherPage/OpenWeatherPage';
import HealthRecComponent from "../../components/HealthRecComponent/HealthRecComponent";
import styles from "../../CSS/home.module.css";
import Pollutants from "../../components/Pollutants/Pollutants";
import LocationBar from "../../components/locationBar/LocationBar";

import "./HomePage.css";

export default function HomePage() {
    // State to hold AQI data
    const [aqiData, setAqiData] = useState(null);
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
            <LocationBar/>
            <div className={`notification-banner ${alertCreated ? 'show' : ''}`}>
                <p>Alert created successfully!</p>
            </div>
            <div className={"container-map"} >
                <AQIComponent data={aqiData} onAlertCreate={handleNotification} />
                {/* Pass aqiData to HealthRecComponent */}
                <OpenWeatherPage setAqiData={setAqiData} />
                <HealthRecComponent aqiData={aqiData} />
                <Pollutants className='Pollutants' pm25={0} pm10={0} n02={0}></Pollutants>
                <GeoLocationTest />
            </div>
        </div>
    );
}