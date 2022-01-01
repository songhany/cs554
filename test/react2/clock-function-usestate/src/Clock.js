import React, { useState, useEffect } from 'react';
import './App.css';

function Clock(props) {
  const [clockData, setClock] = useState(props.date);

  useEffect(() => {
    const timerID = setInterval(() => tick(), 1000);  // call tick() every 1 seconds
    const tick = () => {
      setClock(new Date());
    }

    return () => {  // Any cleanup would go here. it Like 'unmount', otherwise it cause memory leak. For example, close connection, reset state
      clearInterval(timerID);  // since we initialize 'const timerID' into useEffect(), we need to release it here
    }
  }, []);

  return (
    <div className="App">
      <h2>The current time is {clockData.toLocaleTimeString()}</h2>
    </div>
  );
}

export default Clock;
