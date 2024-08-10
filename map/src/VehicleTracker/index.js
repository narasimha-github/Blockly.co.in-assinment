import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';


const VehicleTracker = () => {
  const [vehiclePath, setVehiclePath] = useState([]);
  const [currentLocation, setCurrentLocation] = useState([17.385044, 78.486671]);

  const mainMethod = async () => {
    const response = await fetch('http://localhost:4000/apis')
    const data = await response.json()
    console.log(data)
    setVehiclePath(prevPath => [...prevPath, [data.latitude, data.longitude]]);
    setCurrentLocation([data.latitude, data.longitude]);
  }

  useEffect(() => {
    const interval = setInterval(() => {
      mainMethod()
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <MapContainer center={currentLocation} zoom={13} style={{ height: '400px', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />
      <Marker position={currentLocation} icon={L.icon({ iconUrl: 'https://www.shutterstock.com/shutterstock/photos/1667537305/display_1500/stock-vector-car-vector-object-transportation-illustration-1667537305.jpg', iconSize: [25, 41] })} />
      <Polyline positions={vehiclePath} />
    </MapContainer>
  );
};

export default VehicleTracker;
