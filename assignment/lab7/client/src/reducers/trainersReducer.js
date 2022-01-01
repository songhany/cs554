import { v4 as uuid } from 'uuid';
const initalTrainersState = [{
  id: uuid(),
  name: 'Songhan Yu',
  selected: true,  // not sure whether need this state
  listPokemons: [],
  isPartyFull: false,
  // isPartyFull: listPokemons.length < 6 ? false : true,
}];

let copyState = null;
let index = 0;
let trainer = null;
let isPartyFull = null;

const trainersReducer = (state = initalTrainersState, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'create_trainer':
      console.log('payload', payload);
      return [...state, { id: uuid(),  name: payload.nameTrainer,  selected: false,  listPokemons: [],  isPartyFull: false}];  // crreate a trainer

    case 'delete_trainer':
      copyState = [...state];  // I need copy the original user list firstly
      index = copyState.findIndex((x) => x.id === payload.id);  // find the trainer index who I want to delete
      copyState.splice(index, 1);  // delete that user by index
      return [...copyState];  // return user list without the deleted user

    case 'select_trainer':
      copyState = [...state];
      for (let stateTrainer of copyState) {  // reset every user selected, since only one person could be selected at a time.
        stateTrainer.selected = false;
      }
      index = copyState.findIndex((x) => x.id === payload.id);
      trainer = copyState[index];
      // console.log("Current Selected User: ", trainer);
      trainer.selected = !trainer.selected;  // toggle 'trainer.selected'
      return [...copyState];

    case 'unselect_trainer':
      copyState = [...state];
      index = copyState.findIndex((x) => x.id === payload.id);
      trainer = copyState[index];
      trainer.selected = false;
      return [...copyState];
    

    case 'selected_trainer_catch_pokemon':  // change trainer's listPokemons. I still need another reducer to change pokemon state. Then, call two or more dispatch() with one <button onClick={}> in React Components
      copyState = [...state];
      for (let i=0; i< copyState.length; i++ ) {
        if (copyState[i].selected === true) {
          trainer = copyState[i]  // find currently selected trainer
          // console.log("Current Selected User: ", trainer);
        }
      }
      // verification, whether trainer is selected AND whether party is 6 Pokémon in their team
      isPartyFull = trainer.listPokemons.length < 6 ? false: true;  // check whther party full, we don't allow catch more pokemon
      if (trainer.selected && !isPartyFull) {
        trainer.listPokemons.push(payload.pokemonState._pokemonId)  // add pokemon to current selected trainer
      }
      // isPartyFull = trainer.listPokemons.length < 6 ? false: true;  // after adding pokemon, we check whther party full again, this is for changing <button> state to 'Party Full'
      // trainer.isPartyFull = isPartyFull;  //! display isPartyFull state on UI. Change Pokemon catch button to 'Party Full'
      // then change pokemon catch/release status. I think this should do in ./pokemonReducer.js, since I need 'return pokemonState'
      return [...copyState]; 


    case 'selected_trainer_release_pokomen':  // change trainer's listPokemons. I still need another reducer to change pokemon state. Then, call two or more dispatch() with one <button onClick={}> in React Components
      copyState = [...state];
      for (let i=0; i< copyState.length; i++ ) {
        if (copyState[i].selected === true) {
          trainer = copyState[i]  // find currently selected trainer
          // console.log("Current Selected User: ", trainer);

          if (trainer.selected) {
            index = trainer.listPokemons.findIndex((x) => x === payload.pokemonState._pokemonId);
            trainer.listPokemons.splice(index, 1);  // remove pokemon from listPokemons
            copyState[i] = trainer;
            break;
          }
        }
      }

      // isPartyFull = trainer.listPokemons.length < 6 ? false: true;  // after adding pokemon, we check whther party full again, this is for changing <button> state to 'Party Full'
      // trainer.isPartyFull = isPartyFull;  //! display isPartyFull state on UI. Change Pokemon catch button to 'Party Full'
      // then change pokemon catch/release status. I think this should do in ./pokemonReducer.js, since I need 'return pokemonState'
      return [...copyState]; 


    // case 'catch_pokemon_with_trainerId':
    //   copyState = [...state];
    //   index = copyState.findIndex((x) => x.id === payload.id);  // find trainer idx
    //   trainer = copyState[index]  // find trainer with idx
    //   // verification
    //   if (payload.id === trainer.id && trainer.selected && !trainer.isPartyFull) {
    //     trainer.listPokemons.push()  // add pokemon to corresponding trainer
    //   }
    //   return copyState;

    default:
      return state;
  }
}

export default trainersReducer
