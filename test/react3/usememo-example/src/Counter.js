import React, { useState, useMemo } from 'react';
import './App.css';

function Counter() {
  const [counterOne, setCounterOne] = useState(0);
  const [counterTwo, setCounterTwo] = useState(0);

  // if we know sth. will do long running operation, for performance reason, we can usememo() to cache it
  // When we click 'counterTwo', it is instant, ❤ since if 'counterOne' don't change, it will keep last time calculation into cache and when we click 'counterTwo' it will read calculation from cache
  const isEven = useMemo(() => {  
    let i = 0;

    while (i < 1000000000) i++;
    return counterOne % 2 === 0;
  }, [counterOne])

  // const isEven = () => {
  //   let i = 0;

  //   while (i < 1000000000) i++;
  //   return counterOne % 2 === 0;
  // }

  return (
    <div className="App">
      <div>{counterOne}</div>
      <div>{isEven ? 'Even' : 'Odd'}</div>
      <button onClick={()=> setCounterOne(counterOne + 1)}>Increment Counter One</button>
      <div>{counterTwo}</div>
      <button onClick={()=> setCounterTwo(counterTwo + 1)}>Increment Counter Two</button>
    </div>
  );
}

export default Counter;
