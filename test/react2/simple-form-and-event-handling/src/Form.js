import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

const Form = () => {
  const [ user, setUser ] = useState({});
  const [ toggle, setToggle ] = useState(false);
  const [ inputVal, setInputVal ] = useState('');

  // we will make a asynchronous call to post data, it has to be async function
  const formSubmit = async (e) => {  
    e.preventDefault();
    let firstName = document.getElementById('firstName').value;
    let lastName = document.getElementById('lastName').value;

    // console.log(firstName, lastName, username);
    const user = {
      firstName,
      lastName,
    };
    const { data } = await axios.post('http://localhost:3008/users', user, {  // asynchronous call to post data
      headers: { Accept: 'application/json'}
    })
    // console.log(data);
    setUser(data);
    // reset the form
    document.getElementById('firstName').value='';
    document.getElementById('lastName').value='';
  }


  return (
    <div>
      <form id='simple-form' onSubmit={formSubmit}>
        <label>
          First Name:
          <input id='firstName' type='text' placeholder='Enter your first name'/>
        </label>
        <br/>
        <label>
          Last Name:
          <input id='lastName' type='text' placeholder='Enter your last name'/>
        </label>
        <br/>

        <input type='submit' value='Submit' />
      </form>

      <br/>
      <br/>
      <p>
        {user._id} {user.firstName} {user.lastName}
      </p>

      <button onClick = {()=> setToggle(!toggle)}> {toggle===true ? 'On' : 'Off' } </button>

      <input type='text' onChange={(e)=> setInputVal(e.target.value)} />  {/* set e.target.value to be typed-in value */}
      <p>The input State is: {inputVal}</p>
    </div>
  );
}


export default Form;
