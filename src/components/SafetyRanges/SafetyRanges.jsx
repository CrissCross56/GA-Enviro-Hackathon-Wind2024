import "../../pages/HomePage/HomePage.css"
import  "./safetyRange.css"

export default function SafetyRanges(){
    return(
        <div className="safetyBox">
            <h1 className="safetyTitle">Safety Ranges</h1>

            <div className='ranges'>
                <p id="good" className="rangeBox">Good/Safe</p>

                <p id="mod" className="rangeBox">Moderate/Acceptable</p>

                <p id="unhealthySens" className="rangeBox">Unhealthy for Sensitive</p>

                <p id="unhealthy" className="rangeBox">Unhealthy</p>

                <p id="veryUnhealthy" className="rangeBox">Very Unhealthy</p>

                <p id="dangerous" className="dangerRangeBox">Dangerous</p>
            </div>
          
        </div>
    )
}