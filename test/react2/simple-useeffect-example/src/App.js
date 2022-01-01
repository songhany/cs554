import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import { useReducer } from 'react';

function App() {
  // const [user, setUser] = useState({});
  const [shows, setShowData] = useState(undefined);

  useEffect(() => {  // every time the render() happen, the useEffect() will be called
    console.log('useEffect has been called');

    // axios.get('http://api.tvmaze.com/show').then(({data}) => {  // Not async way
    //   setShowData(data);
    //   console.log(data);
    // })

    async function fetchData() {  // async way
      try {
        const {data} = await axios.get('http://api.tvmaze.com/show');
        setShowData(data);
        console.log(data);
      } catch(e) {
        console.log(e);
      }
    }
    fetchData();  // call fetchData()
  }, []);

  return (
    <div className='App'>
      {/* <p>
        {user.firstName} {user.lastName}
      </p> */}
      <ul>
          {shows && shows.map((show) => <li key={show.id}>{show.name}</li>)}
      </ul>
    </div>
  )
}

export default App;
