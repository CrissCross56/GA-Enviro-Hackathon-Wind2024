import ProgressBar from "./ProgressBar"
import styles from "../../CSS/progress.module.css"
import React, { useState, useEffect } from "react";

export default function Pollutants(props) {
   
    return (
       
        <div className={styles.pollutants}>
             <h1 className={styles.title}>Pollutants</h1>
             <h3 className={styles.more}>Learn More</h3>
            <ProgressBar name={'Fine Particle Matter'} buffer={'.....'}  pollutant={`PM 2.5`} value={props.pm25} max={500}  units={`μg/m3`} good={12} moderate={35.4} unhealthySens={55.4} unhealthy={150.4} veryUnhealthy={250.4} hazardous={500}></ProgressBar>
            {/* make a horizontal grey line here */}
            <hr className={styles.separator}/>
            <ProgressBar name={'Coarse Particle Matter'} buffer={''} pollutant={`PM 10`} value={props.pm10} max={604}  units={`μg/m3`} good={54} moderate={154} unhealthySens={254} unhealthy={354} veryUnhealthy={424} hazardous={604}></ProgressBar>
            <hr className={styles.separator}/>
            <ProgressBar name={'Carbon Dioxide'} buffer={'............'} pollutant={`NO2`} value={props.n02} max={1250}  units={`ppb`} good={53} moderate={100} unhealthySens={360} unhealthy={649} veryUnhealthy={1249} hazardous={1250}></ProgressBar>
        </div>
    )
 }
