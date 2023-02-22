import React, {useState} from 'react';
import {MapContainer, TileLayer, Marker, useMap} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import './App.css';
import {Icon} from "leaflet";

type GeoCode = [number, number];


type CustomMarker = {
    position: GeoCode;
}

interface ChangeViewProps {
    center: GeoCode
    zoom: number
}

function ChangeView({center, zoom}: ChangeViewProps) {
    const map = useMap();
    map.setView(center, zoom);
    return null;
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
    let [position, setPosition] = useState<GeoCode>([52.520645, 13.409779]);

    function addMarker(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const target = event.currentTarget;
        const newMarker: CustomMarker = {
            position: [target.lat.value as number, target.long.value as number
            ]
        }
        setMarkers([...markers, newMarker])
        setPosition(newMarker.position)
    }

    function removeMarker(index: number) {
        setMarkers(markers.filter((marker, i) => i !== index));
    }

    function jumpToMarker(index: number) {
        setPosition(markers[index].position)
    }

    return (
        <div className="App">
            <form className={"input-form"} onSubmit={addMarker}>
                <input type="text" name="lat" placeholder="latitude"/>
                <input type="text" name="long" placeholder="longitude"/>
                <button>Add marker</button>
            </form>
            <div className={"markerList"}>
                <ul>
                    {markers.map((marker, index) => (
                        <li key={index}>
                            <button className={"btn"} onClick={() => jumpToMarker(index)}>{`lat: ${marker.position[0]} -- long: ${marker.position[1]}`}</button>
                            <button onClick={() => removeMarker(index)}>Del</button>
                        </li>
                    ))}
                </ul>
            </div>
            <div className={"main"}>
                <MapContainer center={position} zoom={13}>
                    <ChangeView center={position} zoom={13}/>
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
        </div>
    );
}

export default App;
