const express = require('express');
const router = express.Router();
// const store = require('../store');
// const actions = require('../actions');
const data = require('../data');
const pokemonData = data.pokemons;  // "../data/pokemons" through ../data/index.js

const redis = require('redis');
const client = redis.createClient();
const bluebird = require('bluebird');
bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);


router.get('/page/:page', async (req, res) => {
  if (!req.params.page) throw 'You must specify a page number to get';
  
  try {
    let cacheOfPokemonPage= await client.getAsync(`pokemonPage${req.params.page}`);
    if (cacheOfPokemonPage) {  // if PokemonPage is cached in redis 
      res.send(JSON.parse(cacheOfPokemonPage));  // need to convert JSON to Object
    } else {
      let offset = 0;
      let limit = 30;
      
      if (req.params.page) {
        offset = parseInt(req.params.page) * limit;
      }
  
      if (parseInt(offset) < 0 || parseInt(limit) < 0) throw "Page parameters for offset and limit must be positive number"
  
      const pokemonPage = await pokemonData.getPokemonPageList(parseInt(offset), parseInt(limit));
      res.json(pokemonPage);
      let cachePokemonPage = await client.setAsync(`pokemonPage${req.params.page}`, JSON.stringify(pokemonPage));  // store pokemonPage in cache
    }
  } catch (e) {
    res.status(404).json({ message: 'Server /page/:page Error. Pokemon Page not found' });
  }
});


router.get('/:id', async (req, res) => {
  if (!req.params.id) throw 'You must specify a pokemonId to get';

  try {
    let cacheOfPokemon = await client.getAsync(`pokemonId${req.params.id}`);
    if (cacheOfPokemon) {  // if PokemonPage is cached in redis 
      res.send(JSON.parse(cacheOfPokemon));
    } else {
      const singlePokemon = await pokemonData.getPokemonById(req.params.id);
      res.json(singlePokemon);
      let cachePokemon = await client.setAsync(`pokemonId${req.params.page}`, JSON.stringify(singlePokemon));  // store pokemonPage in cache
    }
  } catch (e) {
    res.status(404).json({ message: 'Server /:id Error. Pokemon not found with id' });
  }
});


module.exports = router;
