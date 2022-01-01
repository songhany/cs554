import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux';
// import actions from '../actions';

import { Link } from 'react-router-dom';

const Home = () => {
  return (
      <div>
        <p className="hometext">
          This is website for Pokemon API
          <br />
          <br />
          <Link className="showlink" to="/trainers">Trainers</Link>
          <br />
          <br />
          <Link className="showlink" to="/pokemon/page/0">PokemonList</Link>
        </p>
      </div>
  );
}

export default Home
