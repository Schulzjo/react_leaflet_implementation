import React from 'react';
import {MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import './App.css';

function App() {
    return (
        <div className="App">
            <MapContainer center={ [47.2154556, -1.5644531] } zoom={13}>
                <TileLayer
                    attribution={'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'}
                    url={"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"}
                />
            </MapContainer>
        </div>
    );
}

export default App;
