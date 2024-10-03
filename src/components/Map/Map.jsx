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
            zoom: zoom
        });

        mapRef.current.addControl(new mapboxgl.NavigationControl(), 'bottom-right');

       //Can use "move" but that tracks all the movement on the map. "MoveEnd " tracks map movement on the end of where the map is set
        mapRef.current.on('moveend', () => {
            // This gets the current center coordinates and zoom level from the map
            const mapCenter = mapRef.current.getCenter()
            const mapZoom = mapRef.current.getZoom()
            // update state
            setCenter([mapCenter.lng, mapCenter.lat])
            console.log("mapCenter.lng, mapCenter.lat", mapCenter.lng, mapCenter.lat)
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