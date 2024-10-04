import { useState } from 'react';
import NavBar from "../../components/NavBar";
import GeoLocationTest from "../../components/GeoLocationTest";
import AQIComponent from '../../components/AQIComponent/AQIComponent';
import OpenWeatherPage from '../OpenWeatherPage/OpenWeatherPage';
import HealthRecComponent from "../../components/HealthRecComponent/HealthRecComponent";
import styles from "../../CSS/home.module.css";

export default function HomePage() {
    // State to hold AQI data
    const [aqiData, setAqiData] = useState(null);

    return (
        <div className={styles.homePg}>
            <NavBar />
            <GeoLocationTest />
            {/* Pass setAqiData to OpenWeatherPage */}
            <OpenWeatherPage setAqiData={setAqiData} />
            {/* Pass aqiData to HealthRecComponent */}
            <HealthRecComponent aqiData={aqiData} />
            {/* Pass aqiData to AQIComponent as 'data' */}
            <AQIComponent data={aqiData} />
        </div>
    );
}