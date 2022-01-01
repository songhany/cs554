import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import Counter2 from './Counter2';

function Counter(props) {
  const [counter, setCouter] = useState(0);

  useEffect(() => {
    props.setCounterState(counter);
  }, [props, counter]);

  const liftState = (counter) => {
    console.log('in counter lift state', counter);
    setCouter(counter);
    props.setCounterState(counter);
  };
  const incCounter = () => {
    setCouter(counter + 1);
  };

  const decCounter = () => {
    setCouter(counter - 1);
  };
  return (
    <div className="App">
      Counter Component: {counter}
      <br />
      <button onClick={incCounter}>+1</button>
      <br />
      <button onClick={decCounter}>-1</button>
      <Counter2 liftState={liftState} />
    </div>
  );
}

export default Counter;
