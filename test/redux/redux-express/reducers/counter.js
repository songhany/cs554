const counterReducer = (state=0, action) => {
  // check the action.type
  switch (action.type) {
    case "INC": {
      return state + action.number;
      break;
    }

    case "DEC": {
      return state - action.number;
      break;
    }
  }
  return state;
};

module.exports = counterReducer;