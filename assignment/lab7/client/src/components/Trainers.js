import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';

import AddTrainer from './AddTrainer';
import Pokemon from './Pokemon';
import PokemonPage from './PokemonPage';
import Trainer from './Trainer';


const Trainers = () => {
  // props.match.params.id = parseInt(props.match.params.id);  // ❤ 
  const [addBtnToggle, setAddBtnToggle] = useState(false);

  const allTrainers = useSelector((state) => state.trainers);  //! When you use useSelector(), React Redux will automatically set up a subscription to Redux store for this component 
  console.log('Trainers.js - allTrainers:', allTrainers);
  const listPokemonsForTrainer = useSelector((state) => state.trainers.listPokemons);
  console.log('Trainers.js - listPokemonsForTrainer:', listPokemonsForTrainer);

  return (
    <div className="all-trainers">

      <h2>Trainers</h2>
      <button onClick={() => {setAddBtnToggle(!addBtnToggle);} }>Add a Trainer</button>
      <br />
      <br />
      <br />
      {addBtnToggle && <AddTrainer />}
      <br />
      {allTrainers && allTrainers.map((trainer) => {
        {/* console.log(trainer); */}
        return <Trainer key={trainer.id} trainer={trainer} />;
      })}
    </div>
  )
}

export default Trainers;
