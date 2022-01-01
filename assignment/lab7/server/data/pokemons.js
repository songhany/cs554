const axios = require('axios');


let exportedMethods = {

  async getPokemonAPI() {
    const { data } = await axios.get('https://pokeapi.co/api/v2/pokemon/');
    const parsedData = data; // parse the data from JSON into a normal JS Object
    return parsedData; // this will be the object
  },

  async getPokemonPageList(offset, limit) {
    const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`);
    const parsedData = data; // parse the data from JSON into a normal JS Object
    return parsedData; // this will be the object
  },

  async getPokemonById(id) {  // https://pokeapi.co/api/v2/pokemon/898 is the last pokemon
    if (id === undefined) throw "The id parameter does not exit";
    if (isNaN(id)) throw "id must be numeric, it cannot be any other data type besides a positive whole number";  //check if string is integer

    id = parseInt(id);
    if (id < 1) throw "There is no pokemon with that ID and id should be a positive whole number";

    const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const parsedData = data; // parse the data from JSON into a normal JS Object
    return parsedData; // this will be the single Pokemon object
  },
};

module.exports = exportedMethods;