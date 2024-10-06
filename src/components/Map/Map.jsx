import { useState, useRef, useEffect } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css';
import "./Map.css";
import "../../pages/HomePage/HomePage";

const INITIAL_CENTER = [
    -118.25,
    34.05
]
const INITIAL_ZOOM = 8.5

export default function Map({ setCoordinates, resData }) {
    const mapRef = useRef()
    const mapContainerRef = useRef()
    const [center, setCenter] = useState(INITIAL_CENTER)
    const [zoom, setZoom] = useState(INITIAL_ZOOM)
    const [showTemperatureLayer, setShowTemperatureLayer] = useState(false)

    useEffect(() => {
        // mapboxgl.accessToken = "password"
        mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;
        console.log("mapboxgl.accessToken", mapboxgl.accessToken)

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
        mapRef.current.addControl(new mapboxgl.NavigationControl(), 'bottom-right');

        mapRef.current.on('load', () => {
            if (showTemperatureLayer) {
                addTemperatureLayer();
            }
        });

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
    useEffect(() => {
        if (mapRef.current && mapRef.current.isStyleLoaded()) {
            if (showTemperatureLayer) {
                addTemperatureLayer();
            } else {
                removeTemperatureLayer();
            }
        }
    }, [showTemperatureLayer])

    const addTemperatureLayer = () => {
        if (!mapRef.current.getSource('raster-tiles')) {
            mapRef.current.addSource('raster-tiles', {
                type: 'raster',
                tiles: [
                    `https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=${import.meta.env.VITE_OPENWEATHER_API_KEY}`
                ],
                tileSize: 256,
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, OpenWeather',
            });

            mapRef.current.addLayer({
                id: 'simple-tiles',
                type: 'raster',
                source: 'raster-tiles',
                minzoom: 0,
                maxzoom: 22,
                paint: {
                    'raster-brightness-min': 0.2,
                    'raster-brightness-max': 0.8,
                    'raster-contrast': 0.7,
                }
            });
        }
    }

    const removeTemperatureLayer = () => {
        if (mapRef.current.getLayer('simple-tiles')) {
            mapRef.current.removeLayer('simple-tiles')
        }
        if (mapRef.current.getSource('raster-tiles')) {
            mapRef.current.removeSource('raster-tiles')
        }
    }

    return (
        <>
            <div className="mapbox-card">

                <div id='map-container' ref={mapContainerRef} >
                <button
                    className="toggle-temperature-layer"
                    onClick={() => setShowTemperatureLayer(!showTemperatureLayer)}
                >
                    {showTemperatureLayer ? 'T' : 'T'}
                </button>
                </div>
            </div>
            <div className="SafetyRanges">SafetyRanges</div>
            <div className="Pollutants">Pollutants</div>
        </>
    )
}