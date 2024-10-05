import { useState } from 'react';
import NavBar from "../../components/NavBar";
import GeoLocationTest from "../../components/GeoLocationTest";
import AQIComponent from '../../components/AQIComponent/AQIComponent';
import OpenWeatherPage from '../OpenWeatherPage/OpenWeatherPage';
import HealthRecComponent from "../../components/HealthRecComponent/HealthRecComponent";
import styles from "../../CSS/home.module.css";
import "./HomePage.css";

export default function HomePage() {
    // State to hold AQI data
    const [aqiData, setAqiData] = useState(null);

    return (
        
        <div className={styles.homePg}>
            <NavBar />
            <div className={"container-map"} >
            <AQIComponent data={aqiData} />
            {/* Pass aqiData to HealthRecComponent */}
            <OpenWeatherPage setAqiData={setAqiData} />
            {/* Pass aqiData to AQIComponent as 'data' */}
            <HealthRecComponent aqiData={aqiData} />
            {/* Pass setAqiData to OpenWeatherPage */}
            <GeoLocationTest />
        </div>
        </div>
    );
}