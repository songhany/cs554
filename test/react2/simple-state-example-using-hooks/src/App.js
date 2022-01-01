import React, { useState } from 'react';

const App = (props) => {
  // ❤ setting my initial state is just like constructor(props) in Class-Based Compoennt
  const [ count, setCount ] = useState(0);
  const [ text, setText] = useState('');

  return (
    <div className='App'>
      <p>The current count is: {count}</p>
      <button onClick={() => setCount(count+1)}>+1</button>
      <button onClick={() => (count <= 0 ? setCount(0) : setCount(count-1)) }>-1</button>
      <button onClick={() => setCount(0)}>Reset</button>

      <input onChange={(e) => setText(e.target.value)}/>  {/* That we type text in <input> will change e.target.value */}
      <br />
      <p> The text is: {text}</p>
    </div>
  );
}

export default App;
