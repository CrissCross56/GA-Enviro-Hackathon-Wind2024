import { useRef, useEffect } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css';

import 'mapbox-gl/dist/mapbox-gl.css';
import "./Map.css";

export default function Map() {

    const mapRef = useRef()
    const mapContainerRef = useRef()

    useEffect(() => {
        // mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

        mapRef.current = new mapboxgl.Map({
            container: mapContainerRef.current,
            center: [-74.0242, 40.6941],
            zoom: 10.12
        });

        return () => {
            mapRef.current.remove()
        }
    }, [])

    return (

        <>
            <div id='map-container' ref={mapContainerRef}>


            </div>
        </>
    )
}