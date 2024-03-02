import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const Map = ({ onLocationSelect }) => {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);

  useEffect(() => {
    if (!mapInstanceRef.current && mapContainerRef.current) {
      mapInstanceRef.current = L.map(mapContainerRef.current).setView([51.505, -0.09], 13);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(mapInstanceRef.current);

      mapInstanceRef.current.on('click', (e) => {
        onLocationSelect({ lat: e.latlng.lat, lon: e.latlng.lng });
      });
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [onLocationSelect]);

  return <div ref={mapContainerRef} style={{ height: '500px' }}></div>;
};

export default Map;
