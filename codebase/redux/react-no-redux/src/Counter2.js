import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

function Counter2(props) {
  const [counter, setCouter] = useState(0);

  useEffect(() => {
    props.liftState(counter);
  }, [props, counter]);

  const incCounter = () => {
    setCouter(counter + 5);
  };

  const decCounter = () => {
    setCouter(counter - 5);
  };
  return (
    <div className="App">
      Counter 2 Component: {counter}
      <br />
      <button onClick={incCounter}>+5</button>
      <br />
      <button onClick={decCounter}>-5</button>
    </div>
  );
}

export default Counter2;
