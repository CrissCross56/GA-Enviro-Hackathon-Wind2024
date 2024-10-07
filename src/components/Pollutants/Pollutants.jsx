import ProgressBar from "./ProgressBar";
import styles from "../../CSS/progress.module.css";
import React, { useState, useEffect } from "react";

export default function Pollutants(props) {
    //have a default values for the bars
    const [pm25Val,setPm25Val] = useState(0)
    const [pm10Val, setPm10Val] = useState(0)
    const [n02Val, setNo2Val] = useState(0)
   
    // Use useEffect to update state when props change
    useEffect(()=>{
        //Check and update for PM 2.5 value
        if (props.pm25 !== null && props.pm25 !== undefined) {
            setPm25Val(props.pm25);
        } else {
            setPm25Val(0); // Default to 0 if value is null or undefined
        }

        // Check and update for PM 10 value
        if (props.pm10 !== null && props.pm10 !== undefined) {
            setPm10Val(props.pm10);
        } else {
            setPm10Val(0); // Default to 0 if value is null or undefined
        }

         // Check and update for NO2 value
         if (props.n02 !== null && props.n02 !== undefined) {
            setNo2Val(props.n02);
        } else {
            setNo2Val(0); // Default to 0 if value is null or undefined
        }
    }), [props.pm25, props.pm10, props.n02]
    // useEffect(()=>{
    //     if(props.pm25){
    //         setpm25Val(props.pm25)
    //     }
    //     else{
    //         setpm25Val(0)
    //     }
    
    //     if(props.pm10){
    //         setpm10Val(props.pm10)
    //     }
    //     else{
    //         setpm10Val(0)
    //     }
    
    //     if(props.n02){
    //         setn02Val(props.n02)
    //     }
    //     else{
    //         setn02Val(0)
    //     }
    
    // })

  return (
    <div className={styles.pollutants}>
      <h1 className={styles.title}>Pollutants</h1>
      <h3
        className={styles.more}
        onClick={() =>
          window.open("https://openweathermap.org/api/air-pollution", "_blank")
        }
        style={{ cursor: "pointer" }}
      >
        Learn More
      </h3>{" "}
      <ProgressBar
        name={"Fine Particle Matter"}
        buffer={"....."}
        pollutant={`PM 2.5`}
        value={pm25Val}
        max={500}
        units={`μg/m3`}
        good={12}
        moderate={35.4}
        unhealthySens={55.4}
        unhealthy={150.4}
        veryUnhealthy={250.4}
        hazardous={500}
      ></ProgressBar>
      {/* make a horizontal grey line here */}
      <hr className={styles.separator} />
      <ProgressBar
        name={"Coarse Particle Matter"}
        buffer={""}
        pollutant={`PM 10`}
        value={pm10Val}
        max={604}
        units={`μg/m3`}
        good={54}
        moderate={154}
        unhealthySens={254}
        unhealthy={354}
        veryUnhealthy={424}
        hazardous={604}
      ></ProgressBar>
      <hr className={styles.separator} />
      <ProgressBar
        name={"Carbon Dioxide"}
        buffer={"............"}
        pollutant={`NO2`}
        value={n02Val}
        max={1250}
        units={`ppb`}
        good={53}
        moderate={100}
        unhealthySens={360}
        unhealthy={649}
        veryUnhealthy={1249}
        hazardous={1250}
      ></ProgressBar>
    </div>
  );
}
