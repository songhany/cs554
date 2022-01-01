import { v4 as uuid } from 'uuid';
const initalState = [{
  id: uuid(),
  name: 'Patrick Hill',
  email: 'phill@stevens.edu' // falses
}];

let copyState = null;
let index = 0;


const userReducer = (state = initalState, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'create_user':
      console.log('payload', payload);
      return [...state, { id: uuid(), name: payload.name, email: payload.email }];

    case 'DELETE_USER':
      copyState = [...state];  // I need copy the original user list firstly
      index = copyState.findIndex((x) => x.id === payload.id);  // find the user index who I want to delete
      copyState.splice(index, 1);  // delete that user by index
      return [...copyState];  // return user list without the deleted user

    default:
      return state;
  }
};

export default userReducer;
