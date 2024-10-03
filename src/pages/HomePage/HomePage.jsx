import NavBar from "../../components/NavBar";
import GeoLocationTest from "../../components/GeoLocationTest";
import OpenWeatherPage from '../OpenWeatherPage/OpenWeatherPage'

import styles from "../../CSS/home.module.css"
export default function HomePage(){
    return(
    <div className={styles.homePg}>
        <NavBar></NavBar>
        <GeoLocationTest></GeoLocationTest>
        <OpenWeatherPage />
    </div>
    )
}