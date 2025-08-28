import React, { useRef, useEffect, useState } from 'react';
import GoogleMapReact from 'google-map-react';

const MyStreetViewMap = () => {
  const streetViewRef = useRef(null);
  const [googleMapsApiLoaded, setGoogleMapsApiLoaded] = useState(false);
  const [mapInstance, setMapInstance] = useState(null);
  const [mapsInstance, setMapsInstance] = useState(null);

  const handleApiLoaded = ({ map, maps }) => {
    setMapInstance(map);
    setMapsInstance(maps);
    setGoogleMapsApiLoaded(true);
  };

  useEffect(() => {
    if (googleMapsApiLoaded && mapInstance && mapsInstance && streetViewRef.current) {
      const panorama = new mapsInstance.StreetViewPanorama(
        streetViewRef.current,
        {
          position: { lat: 39.412327, lng: -77.425461 }, // Example coordinates
          pov: { heading: 270, pitch: 0 },
          zoom: 1,
        }
      );
      mapInstance.setStreetView(panorama);
    }
  }, [googleMapsApiLoaded, mapInstance, mapsInstance]);

  return (
    <div style={{ height: '500px', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyBtZc_sPOOkdR7MT8AiaNbW6nKAbe7VBo0' }}
        defaultCenter={{ lat: 39.412327, lng: -77.425461 
 }}
        defaultZoom={12}
        onGoogleApiLoaded={handleApiLoaded}
        yesIWantToUseGoogleMapApiInternals
      />
      <div ref={streetViewRef} style={{ height: '400px', width: '100%' }}></div>
    </div>
  );
};

export default MyStreetViewMap;