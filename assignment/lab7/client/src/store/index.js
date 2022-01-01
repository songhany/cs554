import { createStore } from 'redux';  // const redux = require('redux');
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from '../reducers/rootReducer';

const store = createStore(rootReducer, composeWithDevTools());

const stateSubscriber = () => {
  const latestState = store.getState();
  console.log('Store State Changed:', latestState);
}

store.subscribe(stateSubscriber);

export default store;
