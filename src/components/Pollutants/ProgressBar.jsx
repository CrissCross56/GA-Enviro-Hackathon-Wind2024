import { set } from "mongoose";
import styles from "../../CSS/progress.module.css"
import { useEffect, useState } from "react";
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
    const good = props.good;
    const moderate = props.moderate;
    const unhealthySens = props.unhealthySens;
    const unhealthy = props.unhealthy;
    const veryUnhealthy = props.veryUnhealthy;
    const hazardous = props.hazardous;

    const goodColor = '#71C09B';
    const moderateColor = '#ADEABA';
    const unhealthySensColor = '#EECF9A';
    const unhealthyColor = '#F2AD95';
    const veryUnhealthyColor = '#EE7E90';
    const hazardousColor = '#BBA3DC';

    const [barColor, setBarColor] = useState(goodColor);

    useEffect(()=>{
        if(props.value >= 0 && props.value <= good){
            setBarColor(goodColor)
        }
        if(props.value > good && props.value <=moderate){
            setBarColor(moderateColor)
        }
        if(props.value > moderate && props.value <=unhealthySens){
            setBarColor(unhealthySensColor)
        }
        if(props.value > unhealthySens && props.value <= unhealthy){
            setBarColor(unhealthyColor)
        }
        if(props.value > unhealthy && props.value <= veryUnhealthy){
            setBarColor(veryUnhealthyColor)
        }
        if(props.value > veryUnhealthy && props.value <= hazardous){
            setBarColor(hazardousColor)
        }
        if(props.value >= hazardous){
            setBarColor(hazardousColor)
        }
    }, [props.value])

    const progressPercentage = (props.value / props.max) * 100; // Calculate the width of the filled bar based on the current value

    return (
        <div className={styles.comp}>
            <div className={styles.pollDiv}>
                <h3 className={styles.name}>{props.name}<span className={styles.buffer}>{props.buffer}</span></h3>
                <p className={styles.pollutant}>{props.pollutant}</p>
            </div>
           
            <div>
                <div className={styles.progressContainer}>
                    <div
                        className={styles.progressBar}
                        style={{ width: `${progressPercentage}%`,
                                 backgroundColor: barColor
                        }}
                    />
                </div>
                {/* put the numbers for the scale here */}
                <div className={styles.range}>
                    <p className={styles.zero}>0</p>
                    <p className={styles.maxNumRange}>{props.max}</p>
                </div>
               
            </div>
            <div className={styles.concentrationDiv}> 
                <h3 className={styles.concentrationLabel}>Concentration</h3>
                <p className={styles.concentrationUnits}><span className={styles.concentration}>{props.value}</span>{props.units}</p>
            </div>
           
         
        </div>
    );
 }
