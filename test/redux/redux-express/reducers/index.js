const redux = require('redux');

// import all reducers
const userReducer = require('./users');
const postReducer = require('./posts');
const counterReducer = require('./counter');

const reducers = redux.combineReducers({
  user: userReducer,
  posts: postReducer,
  counter: counterReducer
})

module.exports = reducers;