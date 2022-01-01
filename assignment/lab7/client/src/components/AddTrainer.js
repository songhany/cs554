import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import actions from '../actions';


const AddTrainer = () => {
  const dispatch = useDispatch();  // Dispatches an action. This is the only way to trigger a state change.
  const [formTrainerData, setFormTrainerData] = useState({ name: '' });
  console.log('AddTrainer.js - formTrainerData:', formTrainerData);

  const handleChange = (e) => {  // ! what this do ? Everytime we type a new letter in <input> textbox , it automatically update 'formTrainerData'
    // Prevents React from resetting its properties:  https://reactjs.org/docs/legacy-event-pooling.html
    e.persist();  // Without this line will report error if you access previous 'e.target.xxx' below https://duncanleung.com/fixing-react-warning-synthetic-events-in-setstate/
    console.log('e.target.name:', e.target.name);
    console.log('e.target.value:', e.target.value);
    setFormTrainerData((prev) => ({ ...prev, [e.target.name]: e.target.value }));  // https://stackoverflow.com/questions/50376353/why-we-need-to-put-e-target-name-in-square-brackets
    // setFormTrainerData((prev) => (console.log('prev:', prev)));
  }

  const addTrainer = () => {
    dispatch(actions.addTrainer(formTrainerData.name));
    document.getElementById('name').value ='';  // after adding user by submitting form, we initialize form value
  }

  return (
    <div className="add">
      <div className="input selection">
        <label>
          Name:
          <input onChange={(e) => handleChange(e)} id="name" name="name" placeholder="Trainer Name..."/>
        </label>
      </div>
      <button onClick={addTrainer}>Add Trainer</button>
    </div>
  );
}

export default AddTrainer;

