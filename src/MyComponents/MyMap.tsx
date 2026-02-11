import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '400px'
};

const center = {
  lat: 31.045099,  // Latitude
  lng: 31.391693   // Longitude
};
const MyMap = () => {
  return (
    <LoadScript googleMapsApiKey="AIzaSyAJQCVBN5kw02UvnNjQuHMtJOZihj9R3bE">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
      >
        {/* Marker at center */}
        <Marker position={center} />
      </GoogleMap>
    </LoadScript>
  );
};

export default MyMap;
