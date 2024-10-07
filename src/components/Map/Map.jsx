import { useState, useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import '../../pages/HomePage/HomePage';
import './Map.css';

const INITIAL_CENTER = [-118.25, 34.05];
const INITIAL_ZOOM = 8.5;

export default function Map({ setCoordinates, resData }) {
    const mapRef = useRef();
    const mapContainerRef = useRef();
    const [center, setCenter] = useState(INITIAL_CENTER);
    const [zoom, setZoom] = useState(INITIAL_ZOOM);

    useEffect(() => {
        mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

        mapRef.current = new mapboxgl.Map({
            container: mapContainerRef.current,
            center: center,
            zoom: zoom,
            attributionControl: false,
        });

        const attributionControl = new mapboxgl.AttributionControl({
            compact: true,
        });
        mapRef.current.addControl(attributionControl, 'top-right');
        mapRef.current.addControl(new mapboxgl.NavigationControl(), 'bottom-right');

        mapRef.current.on('load', () => {
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
                },
            });

            // Trigger a resize event after the map has fully loaded
            mapRef.current.resize();
        });

        mapRef.current.on('moveend', () => {
            const mapCenter = mapRef.current.getCenter();
            const mapZoom = mapRef.current.getZoom();
            setCenter([mapCenter.lng, mapCenter.lat]);
            setCoordinates({
                lon: parseFloat(mapCenter.lng.toFixed(2)),
                lat: parseFloat(mapCenter.lat.toFixed(2)),
            });
            setZoom(mapZoom);
        });

        // Resize the map whenever the window is resized
        window.addEventListener('resize', () => mapRef.current.resize());

        return () => {
            mapRef.current.remove();
            window.removeEventListener('resize', () => mapRef.current.resize());
        };
    }, []);

    return (
        <div className="mapbox-card">
            <div id="map-container" ref={mapContainerRef}></div>
        </div>
    );
}