import NavBar from "../../components/NavBar";
import GeoLocationTest from "../../components/GeoLocationTest";
import styles from "../../CSS/home.module.css"
import Pollutants from "../../components/Pollutants/Pollutants";
export default function HomePage(){
    return(
    <div className={styles.homePg}>
        <NavBar></NavBar>
        <Pollutants></Pollutants>
        <GeoLocationTest></GeoLocationTest>
    </div>
    )
}