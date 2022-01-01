import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import Counter2 from './Counter2';

function Counter(props) {
  const [ counter, setCouter ] = useState(0);

  useEffect(() => {
      props.setCounterState(counter);
    }, 
    [props, counter]
  )

  const incCounter = () => {
    setCouter(counter + 1);
    // props.setCounterState(counter);
  }

  const decCounter = () => {
    setCouter(counter - 1);
    // props.setCounterState(counter);
  }

  return (
    <div className="App">
      Counter Component: {counter}
      <br />
      <button onClick={incCounter}>+1</button>
      <br />
      <button onClick={decCounter}>-1</button>
    </div>
  );
}

export default Counter;
