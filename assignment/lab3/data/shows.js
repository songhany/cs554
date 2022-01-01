const axios = require('axios');

let exportedMethods = {

  async getShow() {
    const { data } = await axios.get('http://api.tvmaze.com/shows');
    const parsedData = data;  // parse the data from JSON into a normal JS Object
    return parsedData;
  },

  async getAllShow() {
    let sData = await this.getShow();
    return sData;
  },

  async getShowById(id) {
    if (id === undefined) throw "The id parameter does not exit";
    if (isNaN(id)) throw "show's id must be numeric, it cannot be any other data type besides a positive integer";
    if (id < 1) throw "There is no show with this id and id should be a positive integer";
    id = parseInt(id);
    
    try {
      const { data } = await axios.get(`http://api.tvmaze.com/shows/${id}`);
      const parsedData = data;  // parse the data from JSON into a normal JS Object
      if (!parsedData) throw `No results were found for id: ${id}.`;
      return parsedData;
    }
    catch(e) {
      throw `No results were found with id: ${id}`;
    }
  },

  async getShowBySearch(term) {
    if (term === undefined || term === null) throw "The term does not exit";
    if (typeof term !== 'string') term = term.toString();
    
    try {
      const { data } = await axios.get(`http://api.tvmaze.com/search/shows?q=${term}`);
      const parsedData = data;  // parse the data from JSON into a normal JS Object
      if (!parsedData) throw `We're sorry, but no results were found for ${term}.`;
      
      return parsedData;
    } catch (e) {
      throw `No results were found for search term: ${term}`;
    }

  }
}

module.exports = exportedMethods;