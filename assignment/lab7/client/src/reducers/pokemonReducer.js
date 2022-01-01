//! In this application, I don't need pokemonReducer
// import { v4 as uuid } from 'uuid';
// const initalPokemonState = {
//   _pokemonId: '',
//   name: '',
//   isCatched: false,
//   url: ''
// };

// /* 
// // I customize pokemonState in ../components/PokemonPage.js
// const pokemonState = {
//   _pokemonId: pokemonId[0],
//   name: pokemon.name,
//   isCatched: pokemonIsCatched,
//   url: pokemon.url
// }
//  */

// let copyState = null;
// let index = 0;


// const pokemonReducer = (state = initalPokemonState, action) => {
//   const { type, payload } = action;

//   switch (type) {
//     case 'pokemon_is_catched':  // change 'isCatched' to true
//       copyState = {...payload.pokemonState};  // I need copy the original pokemon state
//       copyState.isCatched = true;
//       return {...copyState};  // return new pokemonState

//     case 'pokemon_is_released':  // change 'isCatched' to false
//       copyState = {...payload.pokemonState};  // I need copy the original pokemon state
//       copyState.isCatched = false;
//       return {...copyState};  // return new pokemonState

//     default:
//       return state;
//   }
// }

// export default pokemonReducer