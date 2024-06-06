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
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios
      .get("https://eonet.gsfc.nasa.gov/api/v2.1/events")
      .then((res) => setFireEventsdata(res.data.events))
      .catch((err) => {
        console.log(err.message);
        setFireEventsdata(FireEvents);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  return (
    <div className="relative">
      {loading ? (
        <div className="inset-0 h-screen w-full backdrop-sepia-10 bg-gray-200   absolute">
          <div
            role="status"
            className="flex flex-col justify-center items-center h-screen"
          >
            <svg
              aria-hidden="true"
              className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
          </div>
        </div>
      ) : (
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
            const [singleGeometric] = geometries;
            const localtime = new Date(singleGeometric?.date);
            return (
              <Marker
                position={singleGeometric?.coordinates.reverse()}
                key={id}
                icon={icon}
              >
                <Popup key={id}>
                  <div className="flex flex-col justify-center items-baseline font-roboto pt-2">
                    <h3 className="text-lg text-slate-700">
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
      )}
    </div>
  );
};

export default Map;
