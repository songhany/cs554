const userReducer = (state={}, action) => {
  switch (action.type) {
    case "CHANGE_USER": {  // change user
      state = {...state, name: action.name, location: action.location};
      break;
    }

    case "CHANGE_NAME": {  // change name
      state = {...state, name: action.name};
      break;
    }

    case "CHANGE_LOCATION": {  // change location
      state = {...state, location: action.location};
      break;
    }
  }
  return state;
}

module.exports = userReducer;