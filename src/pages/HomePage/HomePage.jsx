import NavBar from "../../components/NavBar";
import GeoLocationTest from "../../components/GeoLocationTest";
import styles from "../../CSS/home.module.css"
import Pollutants from "../../components/Pollutants/Pollutants";
import LocationBar from "../../components/locationBar/LocationBar";
export default function HomePage(){
    return(
    <div className={styles.homePg}>
        <NavBar></NavBar>
        <LocationBar/>
        {/* have placeholder values for the pollutants for a later api call result */}
        <Pollutants pm25={20} pm10={40} n02={50}></Pollutants>
        <GeoLocationTest></GeoLocationTest>
    </div>
    )
}