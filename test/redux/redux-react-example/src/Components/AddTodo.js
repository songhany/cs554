import { useState } from 'react';
import { useDispatch } from 'react-redux';
import actions, { addTodo } from '../actions';


function AddTodo() {
  const dispatch = useDispatch();
  const [ formData, setFormData ] = useState({task:'', taskDesc:''});
  console.log(formData);  // {task: 'Take out Garbage', taskDesc: 'Take it out when night'}

  const handleChange = (e) => {
    setFormData((prev) => ({...prev, [e.target.name]: e.target.value }));  // it has previous value in it and keep previous value
  };

  const addTodo = () => {  // {id: '06d23c83-c051-4c57-9849-b92b13d9c392', task: 'Take out Garbage', taskDesc: 'Take it out when night', completed: false}
    dispatch(actions.addTodo(formData.task, formData.taskDesc));
    document.getElementById('task').value='';  // after add to do, we initialize 'task' value in form to be ''
    document.getElementById('taskDesc').value='';  // initialize 'taskDesc' value in form to be ''
  }

  return (
    <div className="add">
      <div className="input-selection">
        <label>
          Todo:
          <input onChange={(e) => handleChange(e)} id="task" name="task" placeholder="Todo name..."/>
        </label>

        <label>
          Todo Description:
          <input onChange={(e) => handleChange(e)} id="taskDesc" name="taskDesc" placeholder="Todo Description..."/>
        </label>
      </div>
      <button onClick={addTodo}>Add Todo</button>
    </div>
  );
}

export default AddTodo;
