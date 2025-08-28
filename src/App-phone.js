import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';

const MAX_RANGE = 50; // Maximum range between phone and smartwatch in meters

function App() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: 'AIzaSyC0u7I6_b9X7M2N1O5P4Q3R8S0T1U2V3W4X5Y6Z7A8B9C',
  });

  const [isIOS, setIsIOS] = useState(false);
  const [phoneLocation, setPhoneLocation] = useState({ lat: 0, lng: 0, altitude: 0 });
  const [watchLocation, setWatchLocation] = useState({ lat: 0, lng: 0, altitude: 0 });
  const [maxRange, setMaxRange] = useState(100); // in meters
  const [isOutOfRange, setIsOutOfRange] = useState(false);

  useEffect(() => {
    // Detect if the device is iOS or Android
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    setIsIOS(isIOS);

    // Get the initial location of the phone and watch
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setPhoneLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          altitude: position.coords.altitude,
        });
      },
      (error) => {
        console.error('Error getting phone location:', error);
      }
    );

    // Get the initial location of the watch
    // (This would require pairing the watch with the phone)
    setWatchLocation({
      lat: 37.7749,
      lng: -122.4194,
      altitude: 0,
    });
  }, []);

  useEffect(() => {
    // Check if the watch is out of range
    const distance = calculateDistance(
      phoneLocation.lat,
      phoneLocation.lng,
      watchLocation.lat,
      watchLocation.lng
    );
    setIsOutOfRange(distance > maxRange);
  }, [phoneLocation, watchLocation, maxRange]);

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    // Haversine formula to calculate the distance between two points
    const R = 6371; // Earth's radius in kilometers
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c * 1000; // Distance in meters
  };

  const handleSetLocation = () => {
    // Use Google Maps API to get the current location of the phone
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setPhoneLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          altitude: position.coords.altitude,
        });
      },
      (error) => {
        console.error('Error getting phone location:', error);
      }
    );
  };

  if (!isLoaded){ return <div>Loading...</div>};

  return (
    <div
      style={{
        backgroundColor: 'royalblue',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <button onClick={handleSetLocation}>Set Location</button>
      <GoogleMap
        mapContainerStyle={{
          width: '80vw',
          height: '60vh',
        }}
        center={{
          lat: (phoneLocation.lat + watchLocation.lat) / 2,
          lng: (phoneLocation.lng + watchLocation.lng) / 2,
        }}
        zoom={15}
      >
        <Marker position={{ lat: phoneLocation.lat, lng: phoneLocation.lng }} />
        <Marker position={{ lat: watchLocation.lat, lng: watchLocation.lng }} />
      </GoogleMap>
      {isOutOfRange && (
        <div style={{ color: 'white', fontSize: '24px', marginTop: '20px' }}>
          {isIOS
            ? 'Your iOS phone is out of range.'
            : 'Your Android phone is out of range.'}
        </div>
      )}
    </div>
  );

}

export default App;
