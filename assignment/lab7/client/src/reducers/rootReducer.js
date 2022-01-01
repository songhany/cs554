import { combineReducers } from 'redux';

// import all reducers
import pokemonReducer from './pokemonReducer';
import trainersReducer from './trainersReducer';

const rootReducer = combineReducers({
  trainers: trainersReducer,
  // pokemon: pokemonReducer
})

export default rootReducer;