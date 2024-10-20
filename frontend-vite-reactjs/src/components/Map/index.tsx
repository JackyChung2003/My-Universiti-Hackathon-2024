// // import MarkerClusterGroup from 'react-leaflet-cluster'
// import {MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
// import 'leaflet/dist/leaflet.css'
// // import {addressPoints} from './realworld'

// const CampaignMap = () => {
//     const position = [51.505, -0.09]; // Example position, replace with your actual position

//     return (
//         <MapContainer
//               id="map"
//               // where the map should start, this is for Oslo
//               center={[59.914, 10.734]} 
//             ><TileLayer
//             url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//             attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//           />
//           <Marker position={[51.505, -0.09]}>
//             <Popup>
//               A pretty popup. <br /> Easily customizable.
//             </Popup>
//           </Marker>
//         </MapContainer>
//     );
// }

// export default CampaignMap;

import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for marker icons not displaying correctly in react-leaflet
import L from 'leaflet';
import markerIconPng from 'leaflet/dist/images/marker-icon.png';
import markerShadowPng from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: markerIconPng,
    shadowUrl: markerShadowPng,
    iconAnchor: [12, 41] // Adjust anchor if necessary
});

L.Marker.prototype.options.icon = DefaultIcon;

interface CampaignMapProps {
    position: [number, number];
}

const CampaignMap: React.FC<CampaignMapProps> = ({ position }) => {
    return (
        <MapContainer
            id="map"
            center={position}  // Ensure the center is a tuple of [latitude, longitude]
            zoom={13}
            style={{ height: '300px', width: '100%' }} // Add map height and width
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' // Correct attribution prop
            />
            <Marker position={position}>
                <Popup>
                    A pretty popup. <br /> Easily customizable.
                </Popup>
            </Marker>
        </MapContainer>
    );
};

export default CampaignMap;
