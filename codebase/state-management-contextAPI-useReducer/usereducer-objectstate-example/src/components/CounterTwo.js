import React, { useReducer } from 'react';
const intitalState = {
  firstCounter: 0,
  secondCounter: 10
};
const reducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'increment':
      return { ...state, firstCounter: state.firstCounter + payload.incBy };
    case 'decrement':
      return { ...state, firstCounter: state.firstCounter - payload.decBy };
    case 'increment2':
      return { ...state, secondCounter: state.secondCounter + payload.incBy };
    case 'decrement2':
      return { ...state, secondCounter: state.secondCounter - payload.decBy };
    case 'reset':
      return intitalState;
    default:
      return state;
  }
};
function CounterTwo() {
  const [count, dispatch] = useReducer(reducer, intitalState);
  return (
    <div>
      <div>Count One: {count.firstCounter}</div>

      <button
        onClick={() => dispatch({ type: 'increment', payload: { incBy: 1 } })}
      >
        Increment Counter One by 1
      </button>
      <br />
      <button
        onClick={() => dispatch({ type: 'decrement', payload: { decBy: 1 } })}
      >
        Decrement Counter One by 1
      </button>
      <br />
      <button
        onClick={() => dispatch({ type: 'increment', payload: { incBy: 5 } })}
      >
        Increment Counter One by 5
      </button>
      <br />
      <button
        onClick={() => dispatch({ type: 'decrement', payload: { decBy: 5 } })}
      >
        Decrement Counter One by 5
      </button>
      <br />
      <div>Count Two: {count.secondCounter}</div>
      <button
        onClick={() => dispatch({ type: 'increment2', payload: { incBy: 1 } })}
      >
        Increment Counter Two by 1
      </button>
      <br />
      <button
        onClick={() => dispatch({ type: 'decrement2', payload: { decBy: 1 } })}
      >
        Decrement Counter Two by 1
      </button>
      <br />
      <button
        onClick={() => dispatch({ type: 'increment2', payload: { incBy: 5 } })}
      >
        Increment Counter Two by 5
      </button>
      <br />
      <button
        onClick={() => dispatch({ type: 'decrement2', payload: { decBy: 5 } })}
      >
        Decrement Counter Two by 5
      </button>
      <br />
      <button onClick={() => dispatch({ type: 'reset' })}>Reset</button>
    </div>
  );
}

export default CounterTwo;
