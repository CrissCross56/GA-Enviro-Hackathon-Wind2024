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
        <Pollutants pm25={36} pm10={300} n02={500}></Pollutants>
        <GeoLocationTest></GeoLocationTest>
    </div>
    )
}