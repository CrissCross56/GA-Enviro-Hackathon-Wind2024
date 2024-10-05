import styles from "../../CSS/progress.module.css"
import { useState } from "react";
export default function ProgressBar(props) {
    // console.log(`hey im in the progressbar.jsx here are my props for value ${props.value} and max ${props.max}`)
    // return (
    // <div className={styles.progressContainer}>
    //     <input
    //         type="range"
    //         value={props.value}
    //         max={props.max}
    //         min={0}
    //         className={styles.progressBar}
    //         readOnly
    //     />
    // </div>
    // )
    const progressPercentage = (props.value / props.max) * 100; // Calculate the width of the filled bar based on the current value

    return (
        <div>
            <h3>{props.name}</h3>
            <p>{props.pollutant}</p>
            <div>
                <div className={styles.progressContainer}>
                    <div
                        className={styles.progressBar}
                        style={{ width: `${progressPercentage}%` }}
                    />
                </div>
                
            </div>
            <h3>Concentration</h3>
            <p><span>{props.concentration}</span>{props.units}</p>
        </div>
    );
 }
