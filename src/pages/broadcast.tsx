import React, { useState } from "react";

const BroadcastPage = () => {
  const [streamName, setStreamName] = useState("");

  const handleStreamNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStreamName(event.target.value);
  };

  const handleBroadcastClick = () => {
    // TODO: Implement broadcasting logic
    console.log(`Broadcasting stream with name ${streamName}`);
  };

  return (
    <div>
      <h1>Broadcast Page</h1>
      <label>
        Stream Name:
        <input type="text" value={streamName} onChange={handleStreamNameChange} />
      </label>
      <button onClick={handleBroadcastClick}>Broadcast</button>
    </div>
  );
};

export default BroadcastPage;
