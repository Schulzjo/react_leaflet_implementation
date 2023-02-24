import React, {useState} from 'react';
import {MapContainer, TileLayer, Marker, useMap, Popup} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import './App.css';
import {Icon} from "leaflet";

type GeoCode = [number, number];


type CustomMarker = {
    position: GeoCode;
    name: string;
}

interface ChangeViewProps {
    center: GeoCode
}

function ChangeView({center}: ChangeViewProps): null {
    const map = useMap();
    map.setView(center);
    return null;
}

const customIcon = new Icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/443/443025.png',
    iconSize: [38, 38],
})

const initialMarkers: CustomMarker[] = [
    {position: [52.520645, 13.409779], name: "Berlin"},
]

function App() {
    let [markers, setMarkers] = useState<CustomMarker[]>(initialMarkers);
    let [position, setPosition] = useState<GeoCode>([52.520645, 13.409779]);

    function addMarker(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const target = event.currentTarget;
        const newMarker: CustomMarker = {
            position: [target.lat.value as number, target.long.value as number
            ],
            name: target.markerName.value as string,
        }
        setMarkers([...markers, newMarker])
        console.log(newMarker.name)
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
                <input className={"input-field"} type="text" name="lat" placeholder="latitude"/>
                <input className={"input-field"} type="text" name="long" placeholder="longitude"/>
                <input className={"input-field"} type="text" name="markerName" placeholder="name"/>
                <button className={"btn"}>Add marker</button>
            </form>
            <div className={"markerList"}>
                <ul>
                    {markers.map((marker, index) => (
                        <li className={"row-outer"} key={index}>
                                <div className={"row-inner"}>
                                    <button className={"btn marker-list-btn"} onClick={() => jumpToMarker(index)}>
                                        {`name: ${marker.name}`}<br/>
                                        {`lat: ${marker.position[0]}`}<br/>
                                        {`long: ${marker.position[1]}`}<br/>
                                    </button>
                                </div>
                                <div className={"row-inner"}>
                                    <button className={"btn marker-list-btn btn-del"} onClick={() => removeMarker(index)}>X</button>
                                </div>
                        </li>
                    ))}
                </ul>
            </div>
            <div className={"main"}>
                <MapContainer center={position} zoom={13}>
                    <ChangeView center={position} />
                    <TileLayer
                        attribution={'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'}
                        url={"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"}
                    />
                    {markers.map((marker, index) => (
                        <Marker key={index} position={marker.position} icon={customIcon}>
                            <Popup>
                                <h2>{marker.name}</h2>
                                <button onClick={() => {
                                    removeMarker(index)
                                }}>Delete
                                </button>
                            </Popup>
                        </Marker>
                    ))
                    }
                </MapContainer>

            </div>
        </div>
    );
}

export default App;
