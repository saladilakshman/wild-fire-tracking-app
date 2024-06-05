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
        center={[39.113014, -105.358887]}
        zoom={6}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {fireEventsdata?.map(({ geometries, id, title }) => {
          const [singlegeometric] = geometries;
          const localtime = new Date(singlegeometric?.date);
          return (
            <Marker
              position={singlegeometric?.coordinates.reverse()}
              key={id}
              icon={icon}
            >
              <Popup key={id}>
                <div className="flex flex-col justify-center items-baseline font-roboto pt-2">
                  <h3 className=" text-lg text-slate-700">
                    Event Location Info
                  </h3>
                  <p className="text">ID: {id}</p>
                  <p className="text">TITLE: {title}</p>
                  <p className="text">
                    Last happened on: {localtime.toLocaleString()}
                  </p>
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
