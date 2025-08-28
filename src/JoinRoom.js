import React, { useState } from 'react';

function JoinRoom({ onJoin }) {
  const [inputRoomId, setInputRoomId] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputRoomId) {
      onJoin(inputRoomId);
    }
  };

  return (
    <div className="card">
      <h3>Device 2: Pair device(s)</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter device ID"
          value={inputRoomId}
          onChange={(e) => setInputRoomId(e.target.value)}
        />
        <button type="submit">Pair device(s)</button>
      </form>
    </div>
  );
}

export default JoinRoom;