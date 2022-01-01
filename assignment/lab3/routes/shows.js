const express = require('express');
const router = express.Router();

const bluebird = require('bluebird');
const flat = require('flat');
const unflatten = flat.unflatten;

const redis = require('redis');
const client = redis.createClient();
client.on('connect', function() {
  console.log('Connected to Redis...');
});

const data = require('../data');
const showData = data.shows;  // access to "../data/shows" by index.js of data folder

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);


router.get('/', async (req, res) => {
  try {
    let cacheForShowList = await client.getAsync('showList');
    if (cacheForShowList) {
      res.render('others/showList', {shows: JSON.parse(cacheForShowList), title: 'Home Page'});  // showList aleady in the cache
    }
    else {  // showList not in cache
      const showList = await showData.getAllShow();
      //console.log(showList);
      await client.setAsync('showList', JSON.stringify(showList));
      let newCacheForShowList = await client.getAsync('showList');
      //console.log(JSON.parse(newCacheForShowList));
      res.render('others/showList', {shows: JSON.parse(newCacheForShowList), title: 'Home Page'});
    }
  } catch (e) {
    res.status(404).json({ error: "Get showList fail" });
  }
});


router.get('/show/:id', async (req, res) => {
  try {
    let id = req.params.id;

    let cacheForSingleShow = await client.getAsync(`${id}`);
    if (cacheForSingleShow) {
      res.render('others/show', {show: JSON.parse(cacheForSingleShow), title: JSON.parse(cacheForSingleShow).name});
    }
    else {  // show not in cache
      const show = await showData.getShowById(req.params.id);

      //use a regex expression to strip any HTML tags out of the Summary before displaying it on the page. 
      if (show.summary) {
        const regex = /<[/a-zA-Z]*>/g;
        show.summary = show.summary.replace(regex, '');
      }

      await client.setAsync(`${id}`, JSON.stringify(show));
      let newCacheForSingleShow = await client.getAsync(`${id}`);

      res.render('others/show', {show: JSON.parse(newCacheForSingleShow), title: JSON.parse(newCacheForSingleShow).name});
    }
  } catch (e) {
    res.status(404).json({ error: e });
  }
});


router.post('/search', async (req, res) => {
  try {
    let searchTerm = req.body.searchTerm;

    if (!searchTerm || searchTerm == ' ') {  //give a response status code of 400 on the page, and render an HTML page with a paragraph class called error
      res.status(400).render('others/error', { errorDescription: "You should input text into form for searching and the text cannot just be spaces.", title: "Error" });
      return;
    }

    //This route will do a few things and require at least two different Redis operations:
    // you will check the cache to see if it has search results for that search term. 
    // If it does you will send those cached results to the client.
    let doesTermExist = await client.existsAsync(`${searchTerm}`);
    if (doesTermExist) {  // Exist. you will increment the search term counter in the sorted set for that search term.
      const existShow = await client.getAsync(`${searchTerm}`);
      await client.zincrbyAsync('showSortedSet', 1, `${searchTerm}`); 

      res.render('others/search', {shows: JSON.parse(existShow), title: `Search: ${searchTerm}`});
    }
    else {  
      // If the term is not in the set, you will add it to the set and set the initial value to 1. 
      // query the API endpoint for the search term
      const searchedShow = await showData.getShowBySearch(searchTerm);  
      let setShow = await client.setAsync(`${searchTerm}`,  JSON.stringify(searchedShow));
      let newCacheSearchShow = await client.getAsync(`${searchTerm}`);
      //console.log(JSON.parse(newCacheSearchShow));

      let addToSortedSort = await client.zaddAsync('showSortedSet', 1, `${searchTerm}`);

      res.render('others/search', {shows: JSON.parse(newCacheSearchShow), title: `Search: ${searchTerm}`});  // render a handlebars template passing in the results of the search query that axios returns
    }
  } catch (e) {
    res.status(404).json({ error: `No results were found with search term: ${searchTerm}` });
  }
});


router.get('/popularsearches', async (req, res) => {
  try {
    let topPopularTerm = await client.zrevrangeAsync('showSortedSet', 0, 9);
    res.render('others/popularSearch', {popularTerms: topPopularTerm, title: `Top 10 Popular Term`}); 
  } catch (e) {
    res.status(404).json({ error: 'Show popularseacher fail' });
  }
});


module.exports = router;