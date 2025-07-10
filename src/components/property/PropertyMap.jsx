import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect } from 'react';
import L from 'leaflet';

// Fix for default marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

// Utility component to recenter map
const RecenterMap = ({ lat, lng }) => {
  const map = useMap();
  useEffect(() => {
    map.setView([lat, lng]);
  }, [lat, lng, map]);
  return null;
};

const PropertyMap = ({ property }) => {
  const { latitude, longitude, title, address, price } = property;

  // Fallback in case coordinates are missing
  if (!latitude || !longitude) {
    return (
      <div className="bg-white rounded-lg shadow-md p-4 mb-8">
        <h3 className="text-xl font-semibold mb-4">Location</h3>
        <p className="text-sm text-gray-500">Location data is not available for this property.</p>
      </div>
    );
  }

  const position = [latitude, longitude];

  // Custom icon
  const propertyIcon = new L.Icon({
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

  // Function to handle map click and open Google Maps
  const handleMapClick = () => {
    const googleMapsUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;
    window.open(googleMapsUrl, '_blank');
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-8">
      <h3 className="text-xl font-semibold mb-4">Location</h3>
      <div 
        className="relative w-full h-[400px] rounded-lg overflow-hidden cursor-pointer"
        onClick={handleMapClick}
      >
        {/* Overlay with click instructions */}
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 hover:bg-opacity-10 transition-all duration-300 z-10">
          <div className="bg-white px-4 py-2 rounded-full shadow-lg flex items-center opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            <span className="text-sm font-medium">Click to open in Google Maps</span>
          </div>
        </div>
        
        <MapContainer
          center={position}
          zoom={14}
          scrollWheelZoom={false}
          className="w-full h-full z-0"
        >
          <RecenterMap lat={latitude} lng={longitude} />
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={position} icon={propertyIcon}>
            <Popup>
              <div className="p-1">
                <h4 className="font-semibold">{title}</h4>
                <p className="text-xs text-gray-600">{address}</p>
                <p className="text-[#2C2DCB] font-medium mt-1">
                  ₹{price.toLocaleString('en-IN')}/month
                </p>
              </div>
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
};

export default PropertyMap;