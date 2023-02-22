import React, {useState} from 'react';
import {MapContainer, TileLayer, Marker} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import './App.css';
import {Icon} from "leaflet";

type CustomMarker = {
    position: [number, number];
}

const customIcon = new Icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/443/443025.png',
    iconSize: [38, 38],
})

const initialMarkers: CustomMarker[] = [
    {position: [52.520645, 13.409779]},
]

function App() {
    let [markers, setMarkers] = useState<CustomMarker[]>(initialMarkers);

    function addMarker(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const target = event.currentTarget;
        const newMarker: CustomMarker = {
            position: [target.lat.value as number, target.long.value as number
            ]
        }
        setMarkers([...markers, newMarker])

    }

    return (
        <div className="App">
            <form onSubmit={addMarker}>
                <input type="text" name="lat" placeholder="latitude"/>
                <input type="text" name="long" placeholder="longitude"/>
                <button>Add marker</button>
            </form>
            <MapContainer center={[52.520645, 13.409779]} zoom={13}>
                <TileLayer
                    attribution={'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'}
                    url={"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"}
                />
                {markers.map((marker) => (
                    <Marker position={marker.position} icon={customIcon}>
                    </Marker>
                ))
                }
            </MapContainer>
        </div>
    );
}

export default App;
