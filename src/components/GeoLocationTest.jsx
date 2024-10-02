import React, {useState} from "react";
export default function GeoLocationTest(){

    const [location, setLocation] = useState({latitude: null, longitude:null});
    const [error, setError] = useState(null);


const getLocation = () => {
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(
            (position) => {
                setLocation({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                });
            },
            (err) => {
                setError(err.message)
            }
           
        );
    }
    else{
        setError("geolocation data is not supported by this browser")
    }
}

 
    return ( <div>
        <h2>User Geolocation</h2>
        <button onClick={getLocation}>Get Location</button>
        {location.latitude && location.longitude ? (
          <p>
            Latitude: {location.latitude}, Longitude: {location.longitude}
          </p>
        ) : (
          <p>No location available</p>
        )}
        {error && <p>Error: {error}</p>}
      </div>)
}