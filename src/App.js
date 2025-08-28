import logo from './phone.png';
import './App.css';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { GoogleMap, useLoadScript, LoadScript, StreetViewPanorama } from '@react-google-maps/api';
import { APIProvider, Map, Marker, AdvancedMarker, AdvancedMarkerAnchorPoint, Pin, InfoWindow } from '@vis.gl/react-google-maps';
import {createRoot} from "react-dom/client";
import GoogleMapReact from 'google-map-react';
import { Wrapper } from '@googlemaps/react-wrapper';
import Popup from 'reactjs-popup';
////import * as Location from 'expo-location';
////import { BleManager } from 'react-native-ble-plx';

import { db } from './firebase'; // Assuming firebase.js is in the same directory
import { collection, addDoc, getDocs } from 'firebase/firestore';


////Near line 562
   /////<div>
    /////  <button onClick={handleConnectAndGetLocation}>Connect & Get Location</button>
   /////   {device && <p>Connected to Bluetooth: {device.name}</p>}
   /////   {coords && (
   /////     <p>
   /////       Phone Location: Latitude: {coords.latitude}, Longitude: {coords.longitude}
   /////     </p>
   /////   )}
  /////  </div> 

import MyStreetViewMap from './MyStreetViewMap';

import io from 'socket.io-client';
import CreateRoom from './CreateRoom';
import JoinRoom from './JoinRoom';

const socket = io('http://localhost:3000'); // Connect to your server. It was previously port 4000

const MAX_RANGE = 50; // Maximum range between phone and smartwatch in meters
const MILLISECONDS = 60000; //one minute


////Store long-term variables
localStorage.setItem('vartlongitude', 'JohnDoe');
const getLongiude = localStorage.getItem('varlongitude');

/// Bluetooth longitude and latitude, Second info box for watch, toggle info bubbles,  recenter map as phone location changes
/// unpair devices (not necessary), make dynamic, add functions, add objects, not hardcoded, use react-native





// Custom Marker Component
const PhoneMarker = ({ text, onClick }) => (
  <div onClick={onClick} style={{ cursor: 'pointer', color: 'white', fontSize: '14px',
        display: 'inline-flex',
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '50%',
        cursor: 'pointer',
        }}>
    📍 {text} </div>
);

const WatchMarker = ({ text, onClick }) => (
  <div onClick={onClick} style={{ cursor: 'pointer', color: 'white', fontSize: '14px',
color: 'white',
        background: 'royalblue',
        padding: '10px 15px',
        display: 'inline-flex',
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '50%',
        cursor: 'pointer',
        }}>
    📍 {text} </div>
);
const MapComponent = ({ center, zoom }) => {
  const ref = useRef();

  useEffect(() => {
    new window.google.maps.Map(ref.current, {
      center,
      zoom,
    });
  }, [center, zoom]);

  return <div ref={ref} style={{ width: '100%', height: '400px' }} />;
};





      



const App =  ({ center, zoom }) => {
  const apiKey = 'AIzaSyBtZc_sPOOkdR7MT8AiaNbW6nKAbe7VBo0'; // Replace with your actual API key
  const [isIOS, setIsIOS] = useState(false);
  const [phoneLocation, setPhoneLocation] = useState({ lat: 39.412327, lng: -77.425461, altitude: 0 });
  const [watchLocation, setWatchLocation] = useState({ lat: 39.412327, lng: -77.425461, altitude: 0 });
  const [maxRange, setMaxRange] = useState(100); // in meters
  const [isOutOfRange, setIsOutOfRange] = useState(false);
  //const mapRef = useRef(null);
  //const defaultCenter = { lat: 39.412327, lng: -77.425461 }; // Example coordinates
  const defaultZoom = 10;

  const defaultCenter = { lat: 39.412327, lng: -77.425461 }; // Example: Frederick MD
  const dc = { lat: 39.412327, lng: -77.425461 }; // Example: Frederick MD
  const googleMapsApiKey = 'AIzaSyBtZc_sPOOkdR7MT8AiaNbW6nKAbe7VBo0';
  const [markers, setMarkers] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [activePhoneMarker, setActivePhoneMarker] = useState(null);
  const [activeWatchMarker, setActiveWatchMarker] = useState(null);
  const [infoWindowShown, setInfoWindowShown] = useState(false);

/////Connect devices using bluetooth

  const [isIosConnected, setIsIosConnected] = useState(false);
  const [isAndroidConnected, setIsAndroidConnected] = useState(false);


const [phoneRange, setRange] = useState(MAX_RANGE);
const [phoneMinutes, setMinutes] = useState(MILLISECONDS);
const [dist] = useState(0);







  const [paired, setPaired] = useState(false);
  const [roomId, setRoomId] = useState('');
  const [message, setMessage] = useState('');




const [todos, setTodos] = useState([]);
const [newTodo1, setNewTodo1] = useState({lat: 39.412327, lng: -77.425461 });
const [newTodo2, setNewTodo2] = useState({lat: 39.412327, lng: -77.425461 });
const [newTodo3, setNewTodo3] = useState({phoneRange});
const [newTodo4, setNewTodo4] = useState({phoneMinutes});
const [newTodo5, setNewTodo5] = useState({roomId});

  useEffect(() => {
    const fetchTodos = async () => {
      const querySnapshot = await getDocs(collection(db, "todos"));
      const todoList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setTodos(todoList);
    };
    fetchTodos();
  }, []);

  const addTodo = async () => {
    if (newTodo1.lat === '' ) return;
    await addDoc(collection(db, "todos"), {
      text: newTodo1.lat,
      completed: false
    });
    if (newTodo1.lng === '' ) return;
    await addDoc(collection(db, "todos"), {
      text: newTodo1.lng,
      completed: false
    });
    if (newTodo2.lat === '' ) return;
    await addDoc(collection(db, "todos"), {
      text: newTodo2.lat,
      completed: false
    });
    if (newTodo2.lng === '' ) return;
    await addDoc(collection(db, "todos"), {
      text: newTodo2.lng,
      completed: false
    });
    setNewTodo1.lat('');
    setNewTodo1.lng('');
    setNewTodo2.lat('');
    setNewTodo2.lng('');
    // Re-fetch todos or update state locally
  };







  useEffect(() => {
    socket.on('room-created', (room) => {
      setRoomId(room);
    });

    socket.on('paired', (msg) => {
      setPaired(true);
      setMessage(msg);
    });

    socket.on('pairing-error', (msg) => {
      alert(msg);
    });

    return () => {
      socket.off('room-created');
      socket.off('paired');
      socket.off('pairing-error');
    };
  }, []);

  const handleCreateRoom = (id) => {
    socket.emit('create-room', id);
  };

  const handleJoinRoom = (id) => {
    socket.emit('join-room', id);
  };










 const [device, setDevice] = useState(null);
 const [coords, setCoords] = useState({ latitude: 39.412327, longitude: -77.425461 });
/////Bluetooth devices

  const handleConnectAndGetLocation = async () => {
    // 1. Connect to a Bluetooth device
    try {

      const btDevice = await navigator.bluetooth.requestDevice({
        // The `acceptAllDevices: true` option is mandatory to show all devices.
        acceptAllDevices: true,
        // You must also specify the services you intend to use later.
        optionalServices: ['battery_service'] // Replace with your service UUIDs
      });



      setDevice(btDevice);
      console.log('Connected to Bluetooth device:', btDevice.name);
    } catch (error) {
      console.error('Bluetooth connection failed:', error);
    }

    // 2. Get the browser's location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCoords({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
          console.log('Received phone location.');
        },
        (error) => {
          console.error('Geolocation error:', error.message);
        }
      );
    }
  };
/////
















  // Use effect to monitor Bluetooth connection status and handle maximum range exceeded
  useEffect(() => {
    const interval = setInterval(() => {
      // Check if devices are still within the maximum range
      if (!isIosConnected || !isAndroidConnected) {
            // Implement logic to detect when the devices are outside the maximum range
// input two devices lat and lng



//Get phone coordinates on refresh
if (navigator.geolocation) {
handleConnectAndGetLocation();
/////alert("refresh");

      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCoords({
            latitude: coords.latitude,
            longitude: coords.longitude
          });
          console.log('Received phone location.');
        },
        (error) => {
          console.error('Geolocation error:', error.message);
        }
      );
    }





const dist = calculateDistance( coords.latitude,
      coords.longitude,
      watchLocation.lat,
      watchLocation.lng);
//if calculateDistance is greater than recent phoneRange.

if(dist > {phoneRange} ){
    alert('Phone is outside of the maximum range.');
  };
      }
    }, phoneMinutes); // Check every 1 minute

    return () => clearInterval(interval);
  }, [isIosConnected, isAndroidConnected, coords.latitude, coords.longitude, phoneRange, watchLocation.lat, watchLocation.lng, phoneMinutes]);







////Pins
  const handlePhoneMarkerClick = useCallback(() => {
    setInfoWindowShown(isShown => !isShown);
  }, []);


  const handleWatchMarkerClick = useCallback(() => {
    setInfoWindowShown(isShown => !isShown);
  }, []);

  const handlePhoneClose = useCallback(() => {
    setInfoWindowShown(false);
  }, []);

  const handleWatchClose = useCallback(() => {
    setInfoWindowShown(false);
  }, []);


 const defaultProps = {
        center: { lat: 39.412327, lng: -77.425461 },
        zoom: 10,
      };

  const mapRef = useRef(null);
  const ref = useRef();
  const [selectedPin, setSelectedPin] = useState(null);

 
  const pins = [
    { id: 1, lat: 39.412327, lng: -77.425461, info: 'Frderick MD' }
  ];

  const handlePhonePinClick = () => {

  };


  const handleWatchPinClick = () => {

  };

const handleSubmit = () => {
alert("Maximum range and timeframe in milliseconds values updated.");
};


////



 <APIProvider apiKey={googleMapsApiKey}>
      <Map
        defaultZoom={13}
        defaultCenter={{ lat: 39.412327, lng: -77.425461 }} // Example: Frederick MD coordinates
        mapId="YOUR_MAP_ID" // Optional: Use a custom map style created in Google Cloud Console
      />
   </APIProvider>






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
    setPhoneLocation({
      lat: 39.412327,
      lng: -77.425461,
      altitude: 0,
    });
  }, []);


    
 useEffect(() => {
    // Detect if the device is iOS or Android
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    setIsIOS(isIOS);

    // Get the initial location of the phone and watch
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setWatchLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          altitude: position.coords.altitude,
        });
      },
      (error) => {
        console.error('Error getting watch location:', error);
      }
    );

    // Get the initial location of the watch
    // (This would require pairing the watch with the phone)
    setWatchLocation({
      lat: 39.412327,
      lng: -77.425461,
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






/////If Distance in meters is greater than MAX_Range than popup error message.


    return R * c * 1000; // Distance in meters
  };










const Marker = ({ text, lat, lng, onClick }) => (
    <div onClick={onClick} style={{ cursor: 'pointer', color: 'white'
 }}>
      📍 {text}
    </div>
  );

  const InfoWindow = ({ text }) => (
    <div className="card" style={{
        color: 'white',
        background: 'royalblue',
        padding: '10px 15px',
        display: 'inline-flex',
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '50%',
        cursor: 'pointer',
        transform: 'translate(-50%, -50%)' 
}}>
      <div className="card-body">
        <h5 className="card-title">{text}</h5>
        <p className="card-text">
            Latitude: '{phoneLocation.lat}'
            Longitude: '{phoneLocation.lng}'
        </p>
      </div>
    </div>
  );



///// Refresh every 1 minute by default
  const [currentTime, setCurrentTime] = useState(phoneMinutes);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(currentTime); // Update state to trigger re-render
    }, phoneMinutes); // 60 seconds * 1000 milliseconds = 1 minute

    // Cleanup function to clear the interval when the component unmounts
    return () => clearInterval(intervalId), 


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

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setWatchLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          altitude: position.coords.altitude,
        });
      },
      (error) => {
        console.error('Error getting phone location:', error);
      }
    );




  }, [currentTime, phoneMinutes]); // Empty dependency array ensures the effect runs only once on mount




////
  return (


     <div className="App" 
      style={{
        backgroundColor: 'royalblue',
        height: '1050vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >



      <h1>TrackerKeeper App - An app that tracks smart phones locations</h1>

      <div className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Click - Get device pairing ID <br/>to start tracking your ios or android device.
        </p>
      </div>


        {!paired ? (
          <div className="pairing-container">
            <CreateRoom onCreate={handleCreateRoom} roomId={roomId} />
            <JoinRoom onJoin={handleJoinRoom} />
          </div>
        ) : (
          <div className="paired-success">
            <h2>Devices Paired!</h2>
            <p>{message}</p>
            <p>You can now exchange data.</p>
          </div>
        )}



      <div>Phone Latitude: <input disabled
        type="text"
        value={newTodo1.lat}
        onChange={(e) => setNewTodo1.lat(e.target.value)}
        placeholder="Phone Latitude"
      /></div>
      <div>Phone Longitude: <input disabled
        type="text"
        value={newTodo1.lng}
        onChange={(e) => setNewTodo1.lng(e.target.value)}
        placeholder="Phone Longitude"
      /></div>
      <div>Watch Latitude: <input disabled
        type="text"
        value={newTodo2.lat}
        onChange={(e) => setNewTodo2.lat(e.target.value)}
        placeholder="Watch Latitude"
      /></div>
      <div>Watch Longitude: <input disabled
        type="text"
        value={newTodo2.lng}
        onChange={(e) => setNewTodo2.lng(e.target.value)}
        placeholder="Watch Longitude"
      /></div>
      <button onClick={addTodo}>Track phone & watch devices</button>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>{newTodo1.lat}</li>, <li key={todo.id}>{newTodo2.lng}</li>, <li key={todo.id}>{newTodo3.lat}</li>, <li key={todo.id}>{newTodo4.lng}</li>
        ))}
      </ul>







        <Popup 
        trigger={<button>Set/View Maximum range between devices</button>} modal nested>
          {close => (
            <div className="modal" style={{
        backgroundColor: '#000000',
        display: 'flex',
        flexDirection: 'column',
        color: '#ff0066',
        fontSize: '10px',
        padding: '5px'
      }}>
              <button className="close" onClick={close}>
                &times;
              </button>
              <div className="header">Customize TrackerKeeper</div>
              <div className="content">
                <form>
                  <label>
                    Maximum Range:
                    <input type="text" value={phoneRange} onChange={(e) => setRange(e.target.value)} />
                  </label><br />
                  <label>
                    How often in milliseconds to check for phone:
                    <input type="text" value={phoneMinutes} onChange={(e) => setMinutes(e.target.value)} />
                  </label>
                </form>
              </div>
              <div className="actions">
                <button style={{
        color: 'royalblue',
        fontSize: '10px',
      }}
                  className="button"
                  onClick={() => {
                    handleSubmit();
                    close(); // Close the popup after submitting
                  }}
                >
                  Submit
                </button>
              </div>
            </div>
          )}
        </Popup>


<MyStreetViewMap />

<GoogleMapReact 
        bootstrapURLKeys={{ key: "AIzaSyBtZc_sPOOkdR7MT8AiaNbW6nKAbe7VBo0" }}
        defaultCenter={{lat:phoneLocation.lat,
      lng:phoneLocation.lng}}
        defaultZoom={defaultProps.zoom}
      >

       <WatchMarker style={{positon: 'relative',
        color: 'ffffff'}}
          lat={watchLocation.lat}
          lng={watchLocation.lng}
          text="Watch"
          onClick={() => setActiveWatchMarker('{watchLocation.lat,watchLocation.lng}')}
        />
        {activeWatchMarker === '{watchLocation.lat, watchLocation.lng}' && (
          <InfoWindow
            lat={watchLocation.lat}
            lng={watchLocation.lng}
            text="Watch Location"
          />
          
        )}
        {/* Add more markers and info windows as needed */}


       <PhoneMarker style={{position: 'relative',
        color: '#ffffff'}}
          lat={phoneLocation.lat}
          lng={phoneLocation.lng}
          text="Phone"
          onClick={() => setActivePhoneMarker('{phoneLocation.lat, phoneLocation.lng}')}
        />
        {activePhoneMarker === '{phoneLocation.lat, phoneLocation.lng}' && (
          <InfoWindow
            lat={phoneLocation.lat}
            lng={phoneLocation.lng}
            text="Phone Location"
          />
         
        )}
        {/* Add more markers and info windows as needed */}

</GoogleMapReact>

{selectedPin && (
        <div style={{
          position: 'absolute',
          bottom: '20px',
          left: '20px',
          backgroundColor: 'white',
          padding: '10px',
          border: '1px solid #ccc',
          zIndex: 1000
        }}>
          <h3>{selectedPin.info}</h3>
          <p>More details about this location...</p>
          <button onClick={() => setSelectedPin(null)}>Close</button>
        </div>
      )}


    </div>
  );
};

export default App;