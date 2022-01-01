import { v4 as uuid } from 'uuid';
const initalState = [  // initial state, this should be Array
  {
    id: uuid(),
    task: 'Pay the Cable Bill',
    taskDesc: 'Pay the cable by the 15th',
    completed: false
  }
];

let copyState = null;
let index = 0;


// button function implement at here
const todoReducer = (state = initalState, action) => {  // assign initialState to variable 'state'
  const { type, payload } = action;

  switch (type) {
    case 'CREATE_TODO':  // need to match ../actions.js
      console.log('payload', payload);
      return [...state, {id: uuid(), task: payload.task, taskDesc: payload.taskDesc, completed: false}];

    case 'DELETE_TODO':
      copyState = [...state];
      index = copyState.findIndex((x) => x.id === payload.id);
      copyState.splice(index, 1);
      return [...copyState];

    case 'COMPLETE_TODO':
      copyState = [...state];  // destructure initialState
      index = copyState.findIndex((x) => x.id === payload.id);  // find index which match payload.id in ../actions.js
      copyState[index].completed = true;  // toggle complete to true
      return [...copyState];  // return destructured copyState that has been changed

    case 'UNCOMPLETE_TODO':
      copyState = [...state];
      index = copyState.findIndex((x) => x.id === payload.id);
      copyState[index].completed = false;  // toggle complete to false
      return [...copyState];

    default:
      return state;
  }
};

export default todoReducer;
