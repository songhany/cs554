// action.js describes how the store should be updated. All actions should be objects 
// with a type filed to indicates what the action type is. 

//  Dispatches an action. This is the only way to trigger a state change. ./Component/AddTrainer.js will call below function
const addTrainer = (nameTrainer) => ({
  type: 'create_trainer',
  payload: {
    nameTrainer: nameTrainer,
  }
})

const deleteTrainer = (trainerId) => ({
  type: 'delete_trainer',
  payload: { id: trainerId }
})

const selectTrainer = (trainerId) => ({  // this will try to find matched 'type' in reducers at ../reducers/trainersReducer.js
  type: 'select_trainer',
  payload: { id: trainerId }
})

const unselectTrainer = (trainerId) => ({
  type: 'unselect_trainer',
  payload: { id: trainerId }
})

const catchPokemon = (pokemonState) => ({  // I customize this pokemonState in ../components/PokemonPage.js
  type: 'selected_trainer_catch_pokemon',
  payload: { 
    pokemonState: pokemonState,
  }
})

const releasePokemon = (pokemonState) => ({
  type: 'selected_trainer_release_pokomen',
  payload: { 
    pokemonState: pokemonState,
  }
})


const checkPartyFull = (trainerId) => ({
  type: 'check_party_full',
  payload: { 
    id: trainerId,
  }
}) 

// ../reducers/pokemonReducer.js ↓
// const pokemonIsCatched = (pokemonState) => ({
//   type: 'pokemon_is_catched',
//   payload: { 
//     pokemonState: pokemonState,
//   }
// })

// const pokemonIsReleased = (pokemonState) => ({
//   type: 'pokemon_is_released',
//   payload: { 
//     pokemonState: pokemonState,
//   }
// })



module.exports = {
  addTrainer,
  deleteTrainer,
  selectTrainer,
  unselectTrainer,
  catchPokemon,
  releasePokemon,
  checkPartyFull,
  // pokemonIsCatched,
  // pokemonIsReleased,
};