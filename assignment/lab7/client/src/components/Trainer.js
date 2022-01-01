import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ListPokemonsCard from './ListPokemonsCard';

const actions = require('../actions');


const Trainer = (props) => {
  const dispatch = useDispatch();  // dispatch an action. This is the only way to trigger a state change.

  //! trigger actions in ../actions/index.js
  const selectTrainer = () => {  // set only one trainer 'trainer.selected' to be 'true'
    dispatch(actions.selectTrainer(props.trainer.id));
  }

  const unselectTrainer = () => {  // set 'trainer.selected' to be 'false'
    dispatch(actions.unselectTrainer(props.trainer.id));
  }

  const deleteTrainer = () => {  // delete user by dispatch an action in ./actions.js
    dispatch(actions.deleteTrainer(props.trainer.id));
  }

  return (
    <div className="single-trainer">
      <table>
        <tbody>
          <tr>
            <td>Trainer:</td>
            <td>{props.trainer.name}</td>
          </tr>
          {/* <tr>
            <td>selected</td>
            <td>{props.trainer.selected}</td>
          </tr> */}
          <tr>
            <td>listPokemons</td>
            {/* <td>{props.trainer.listPokemons}</td> //! We return catched pokemon Card through component below */}
            <td><ListPokemonsCard trainer={props.trainer}/></td>
          </tr>
          {/* <tr>
            <td>isPartyFull</td>
            <td>{props.trainer.isPartyFull}</td>
          </tr> */}

          <tr>
            <td>
              {!props.trainer.selected && <button onClick={deleteTrainer}>Delete Trainer</button>} &nbsp;&nbsp;
              {props.trainer.selected ? <button onClick={unselectTrainer}>Selected</button> : <button onClick={selectTrainer}>Select Trainer</button>}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default Trainer
