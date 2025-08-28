import React, { useState } from 'react';

function CreateRoom({ onCreate, roomId }) {
  const [inputRoomId, setInputRoomId] = useState('');

  const generateRoomId = () => {
    const id = Math.random().toString(36).substring(2, 8);
    setInputRoomId(id);
  };

  return (
    <div className="card">
      <h3>Device 1: Get Device pairing ID</h3>
      <button onClick={generateRoomId}>Generate ID</button>
      <div className="room-info">
        {inputRoomId && (
          <>
            <p>Share this ID with the other device:</p>
            <strong>{inputRoomId}</strong>
            <button onClick={() => onCreate(inputRoomId)}>Create ID</button>
          </>
        )}
        {roomId && <p className="success">Waiting for second device...</p>}
      </div>
    </div>
  );
}

export default CreateRoom;