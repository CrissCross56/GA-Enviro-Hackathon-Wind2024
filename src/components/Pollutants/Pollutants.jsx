import ProgressBar from "./ProgressBar"
import styles from "../../CSS/progress.module.css"
import React, { useState, useEffect } from "react";

export default function Pollutants(props) {
   
    return (
       
        <div className={styles.pollutants}>
             <h1 className={styles.title}>Pollutants</h1>
             <h3 className={styles.more}>Learn More</h3>
            <ProgressBar name={'Fine Particle Matter'} pollutant={`PM 2.5`} value={80} max={500} concentration={80} units={`μg/m3`}></ProgressBar>
          
        </div>
    )
 }
