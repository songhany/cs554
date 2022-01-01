// action.js describes how the store should be updated. All actions should be objects 
// with a type filed to indicates what the action type is. 

// Front end React App will dispatch the action below. Dispatches an action. This is the only way to trigger a state change. ./Component/AddTodo.js will call below function
const addTodo = (task, taskDesc) => ({
  type: 'CREATE_TODO',   // need to match ./reducers/todoReducer.js
  payload: {
    task: task,
    taskDesc: taskDesc
  }
});

const deleteTodo = (id) => ({
  type: 'DELETE_TODO',
  payload: { id: id }
});

const completeTodo = (id) => ({
  type: 'COMPLETE_TODO',
  payload: { id: id }
});

const uncompleteTodo = (id) => ({
  type: 'UNCOMPLETE_TODO',
  payload: { id: id }
});


// ./Component/AddUser.js call below
const addUser = (name, email) => ({
  type: 'create_user',
  payload: {
    name: name,
    email: email
  }
});

const deleteUser = (id) => ({
  type: 'DELETE_USER',
  payload: { id: id }
});

module.exports = {
  addTodo,
  deleteTodo,
  completeTodo,
  uncompleteTodo,
  addUser,
  deleteUser
};
