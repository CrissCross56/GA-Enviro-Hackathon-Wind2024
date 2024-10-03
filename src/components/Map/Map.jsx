import { useState, useRef, useEffect } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css';
import "./Map.css";

const INITIAL_CENTER = [
    -118.25,
    34.05
]
const INITIAL_ZOOM = 8.5

export default function Map({ setCoordinates }) {
    const mapRef = useRef()
    const mapContainerRef = useRef()
    const [center, setCenter] = useState(INITIAL_CENTER)
    const [zoom, setZoom] = useState(INITIAL_ZOOM)

    useEffect(() => {
        // mapboxgl.accessToken = "password"
        mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

        mapRef.current = new mapboxgl.Map({
            container: mapContainerRef.current,
            center: center,
            zoom: zoom,
            attributionControl: false,

        })
        const attributionControl = new mapboxgl.AttributionControl({
            compact: true
        })
        mapRef.current.addControl(attributionControl, 'top-right')

//         setTimeout(() => {
//             const attributionButton = document.querySelector('.mapboxgl-ctrl-icon[title="Toggle attribution"]');
//             if (attributionButton) {
//                 // Clear the inner content and replace it with custom SVG
//                 attributionButton.innerHTML = `
//    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
// <path d="M12.8333 19.8333H15.1666V12.8333H12.8333V19.8333ZM13.9999 10.4999C14.3305 10.4999 14.6078 10.3879 14.8318 10.1639C15.0558 9.93992 15.1674 9.66303 15.1666 9.33325C15.1658 9.00347 15.0538 8.72659 14.8306 8.50259C14.6074 8.27859 14.3305 8.16658 13.9999 8.16658C13.6694 8.16658 13.3925 8.27859 13.1693 8.50259C12.946 8.72659 12.834 9.00347 12.8333 9.33325C12.8325 9.66303 12.9445 9.94031 13.1693 10.1651C13.394 10.3899 13.6709 10.5015 13.9999 10.4999ZM13.9999 25.6666C12.386 25.6666 10.8694 25.3601 9.44992 24.7473C8.03048 24.1344 6.79575 23.3033 5.74575 22.2541C4.69575 21.2049 3.8647 19.9701 3.25259 18.5499C2.64048 17.1297 2.33403 15.613 2.33325 13.9999C2.33248 12.3868 2.63892 10.8701 3.25259 9.44992C3.86625 8.0297 4.69731 6.79497 5.74575 5.74575C6.7942 4.69653 8.02892 3.86547 9.44992 3.25259C10.8709 2.6397 12.3876 2.33325 13.9999 2.33325C15.6123 2.33325 17.1289 2.6397 18.5499 3.25259C19.9709 3.86547 21.2056 4.69653 22.2541 5.74575C23.3025 6.79497 24.134 8.0297 24.7484 9.44992C25.3629 10.8701 25.6689 12.3868 25.6666 13.9999C25.6643 15.613 25.3578 17.1297 24.7473 18.5499C24.1367 19.9701 23.3056 21.2049 22.2541 22.2541C21.2025 23.3033 19.9678 24.1348 18.5499 24.7484C17.132 25.3621 15.6154 25.6681 13.9999 25.6666Z" fill="#454ADE"/>
// </svg>

//                 `;
//             }
//         }, 500);

        mapRef.current.addControl(new mapboxgl.NavigationControl(), 'bottom-right');

        //Can use "move" but that tracks all the movement on the map. "MoveEnd " tracks map movement on the end of where the map is set
        mapRef.current.on('moveend', () => {
            // This gets the current center coordinates and zoom level from the map
            const mapCenter = mapRef.current.getCenter()
            const mapZoom = mapRef.current.getZoom()
            // update state
            setCenter([mapCenter.lng, mapCenter.lat])
            // console.log("mapCenter.lng, mapCenter.lat", mapCenter.lng, mapCenter.lat)
            setCoordinates({
                lon: parseFloat(mapCenter.lng.toFixed(2)),
                lat: parseFloat(mapCenter.lat.toFixed(2))
            }) // This updates the coordinates in the Open weather page
            setZoom(mapZoom)
        })

        return () => {
            mapRef.current.remove()
        }
    }, [])

    // const handleButtonClick = () => {
    //     mapRef.current.flyTo({
    //         center: INITIAL_CENTER,
    //         zoom: INITIAL_ZOOM
    //     })
    // }

    return (

        <>
            <div id='map-container' ref={mapContainerRef} >
            </div>
        </>
    )
}