import React, { useState, useCallback } from 'react';
import './App.css';

function App() {
  const [username, setUserName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName ] = useState(''); 

  const updateUserName = useCallback(() => {
    setUserName ('syu');
  }, [setUserName]);

  const updateFirstName = useCallback(() => {
    setFirstName('Songhan');
  }, [setFirstName]);

  const updateLastName = useCallback(() => {
    setLastName('Yu');
  }, [setLastName]);

  return (
    <div className="App">
      <div>
        {username}
        <br/>
        {firstName}
        <br/>
        {lastName}
      </div>
      <button onClick={updateUserName}>Set Username</button>
      <button onClick={updateFirstName}>Set firstName</button>
      <button onClick={updateLastName}>Set LastName</button>
    </div>
  );
}

export default App;
