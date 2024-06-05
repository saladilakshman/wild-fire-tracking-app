import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import fire from "../assets/fire.svg";
import { FireEvents } from "../constants/fire";
import axios from "axios";
import { useEffect, useState } from "react";
const Map = () => {
  const icon = new Icon({
    iconUrl: fire,
    iconSize: [35, 35],
  });
  const [fireEventsdata, setFireEventsdata] = useState([]);
  useEffect(() => {
    axios
      .get("https://eonet.gsfc.nasa.gov/api/v2.1/events")
      .then((res) => setFireEventsdata(res.data.events))
      .catch((err) => {
        console.log(err.message);
        setFireEventsdata(FireEvents);
      });
  }, []);
  return (
    <div>
      <MapContainer
        center={[29.42655264, -95.67255]}
        zoom={6}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {fireEventsdata?.map(({ geometries, id, title }, index) => {
          const allcoordinates = [];
          const allpoints = geometries.map((metris) => metris.coordinates);
          allcoordinates.push(allpoints);
          return (
            <Marker
              position={geometries[0]?.coordinates}
              key={index}
              icon={icon}
            >
              <Popup>
                <div className="flex flex-col justify-center items-baseline font-roboto pt-2">
                  <h3 className=" text-lg text-slate-700">
                    Event Location Info
                  </h3>
                  <p className="text-base text-slate-600">ID: {id}</p>
                  <p className="text-base text-slate-600">TITLE: {title}</p>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
};

export default Map;
