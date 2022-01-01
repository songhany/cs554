import Todo from './Todo';
import AddTodo from './AddTodo';
import { useState } from 'react';
import { useSelector } from 'react-redux';  // allow us to tell redux which piece of state this component will use 


function Todos() {
  const [ addBtnToggle, setAddBtnToggle ] = useState(false);
  
  const allTodos = useSelector((state) => state.todos); // If we want to state tree, we use 'state', but we don't want whole state tree, we just want 'state.todos'. It kind like map 'state.todos' to variable allTodos
  console.log('allToDos', allTodos);  // 0: {id: '3349e2bd-59e4-458b-8767-9942cb90ea26', task: 'Pay the Cable Bill', taskDesc: 'Pay the cable by the 15th', completed: false}

  return (
    <div className="todo-wrapper">
      <h2>My Todos</h2>
      <button onClick={() => setAddBtnToggle(!addBtnToggle)}>Add A Todo</button>
      <br />
      <br />
      <br />
      { addBtnToggle && <AddTodo />}
      <br />

      {allTodos.map((todo)=> {
        console.log(todo);
        return <Todo key={todo.id} todo={todo}/>
      })}

    </div>
  );
}

export default Todos;
