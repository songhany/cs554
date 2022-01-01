import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';

import axios from 'axios';  // query server router
import { Link, useHistory } from 'react-router-dom';  // for URL synchronization

// import { Card } from 'react-bootstrap';
import '../App.css';
import { Card, CardContent, Grid, Typography, makeStyles } from '@material-ui/core';

import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';

const actions = require('../actions');


const useStyles = makeStyles({
  card: {
    maxWidth: 250,
    height: 'auto',
    marginLeft: 'auto',
    marginRight: 'auto',
    borderRadius: 5,
    border: '1px solid #1e8678',
    boxShadow: '0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22);'
  },
  titleHead: {
    borderBottom: '1px solid #1e8678',
    fontWeight: 'bold'
  },
  grid: {
    flexGrow: 1,
    flexDirection: 'row'
  },
  media: {
    height: '100%',
    width: '100%'
  },
  button: {
    color: '#1e8678',
    fontWeight: 'bold',
    fontSize: 12
  }
});


const PokemonPage = (props) => {
  // 1 - For fetch data
  const classes = useStyles();  // for using '@material-ui/core'
  const [ loading, setLoading ] = useState(true);  // ❤ setting my initial state is just like constructor(props) in Class-Based Compoennt
  const [ initialData, setInitialData ] = useState(undefined);
  const [ pageData, setPageData ] = useState(undefined);
  let card = null;

  // 2 - For pagination
  props.match.params.page = parseInt(props.match.params.page);  // ❤ 
  const history = useHistory();  // update URL with button. https://stackoverflow.com/questions/66721132/trying-to-update-url-parameter-with-onclick-in-react
  const [ lastPageNum, setLastPageNum ] = useState(undefined);
  const [ pokemonLimit, setPokemonLimit ] = useState(30);  // every page 30 pokemon
  const allTrainers = useSelector((state) => state.trainers);  //! When you use useSelector(), React Redux will automatically set up a subscription to Redux store for this component 
  // console.log('Trainers.js - allTrainers:', allTrainers);

  // 3 - For catch or release
  const dispatch = useDispatch();  //! dispatch an action. This is the only way to trigger a state change.

  // Redux dispatch()
  const catchPokemonFromSelectedTrainer = async (pokemonState) => {
    dispatch(actions.catchPokemon(pokemonState));  // add pokemon to current selected trainer
  }

  const releasePokemonFromSelectedTrainer = async (pokemonState) => {
    dispatch(actions.releasePokemon(pokemonState));  // remove pokemon from selected trainer's listPokemons []
  }

  // 1 - initial loading data
  useEffect(() => {
    // console.log('Initial loading useeffect() in PokemonPage.js');
    async function fetchData() {
      try {
        const { data } = await axios.get(`http://localhost:3001/pokemon/page/0`);
        // console.log(data.data.results);
        setInitialData(data.results);
        setLoading(false);
        setLastPageNum(Math.floor(data.count/ pokemonLimit));  // set last page number
      } catch (e) {
        console.log(e);
      }
    }
    fetchData();  // call fetchData()
  }, []);


  // 2 - 'props.match.params.page' fire this
  useEffect(() => {  
    console.log(`'props.match.params.page' useEffect() fired'`);
    async function fetchData() {
      try {
        const { data } = await axios.get(`http://localhost:3001/pokemon/page/${props.match.params.page}`);
        // console.log('-------- pagenum useEffect data -----------');
        console.log(data);
        setPageData(data.results);
        setLoading(false);
      } catch (e) {
        console.log(e);
      }
    }

    if (props.match.params.page) {
      // console.log('props.match.params.page is set');
      fetchData();
    }
  }, [props.match.params.page]);


  const decrePageNum = async () => {
    props.match.params.page = props.match.params.page - 1;
  };

  const increPageNum = async () => {
    props.match.params.page = props.match.params.page + 1;
  };

  const buttonChangeUrl = async () => {
    history.push(`/pokemon/page/${props.match.params.page}`);
  }


  // card UI
  const buildCard = (pokemon, pokemonId, pokemonState) => {
    // console.log(pokemonState);
    //! I just need to get pokemon in trainer's team and handle that 6 pokemon button is ok. Not for every pokemon.
    console.log('allTrainers:', allTrainers);
    const selectedTrainer = allTrainers[allTrainers.findIndex(x => x.selected)];  // find current selected trainer
    console.log('selectedTeam:', selectedTrainer);
    const isPokeOnTeam = selectedTrainer && selectedTrainer.listPokemons.findIndex(x => x === pokemonId);  // is Pokemon on trainer's team ?
    const isPartyFull = selectedTrainer && selectedTrainer.listPokemons.length < 6 ? false : true;  // is Trainer's party full for 6 pokemons ?

    return (
      <Grid item xs={12} sm={4} md={2} lg={2} xl={2} key={pokemonId}>
        <Card className={classes.card} variant="outlined">
          <Link to={`/pokemon/${pokemonId}`}>
            <img 
              className="card-img-top" 
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`}
              onError={(e)=>{e.target.onerror = null; e.target.src=`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`}}
            ></img> {/* https://stackoverflow.com/questions/34097560/react-js-replace-img-src-onerror */}
            
            <CardActionArea>
              <CardContent>
                <Typography className={classes.titleHead} gutterBottom variant="h6" component="h2">
                  {pokemon.name}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Link>

          <CardActions>
            {isPokeOnTeam !=-1 ? 
              <button onClick={() => { releasePokemonFromSelectedTrainer(pokemonState);}}>Release</button> : 
              (isPartyFull ? 
                <button>Party Full</button> 
              : <button onClick={() => { catchPokemonFromSelectedTrainer(pokemonState);}}>Catch</button>)}
          </CardActions>
        </Card>
      </Grid>
    );
  };

  const regex = /(\b\d+\b)/gi;  // find pokemon 'id' in url like "https://pokeapi.co/api/v2/pokemon/10194/"
  if (props.match.params.page && props.match.params.page >= 0) {
    card = pageData && pageData.map((pokemon) => {
      // console.log('page data:\n');
      // console.log(pokemon);
      let pokemonId = pokemon.url.match(regex);
      let pokemonIsCatched = false;  // give every pokemon a initial catch/release status
      
      const pokemonState = {  //! customize a pokemon status, mainly for storing catch/release status
        _pokemonId: pokemonId[0],
        name: pokemon.name,
        isCatched: pokemonIsCatched,
        url: pokemon.url
      }
      // console.log(pokemonState)
      // console.log(pokemonId[0]);
      return buildCard(pokemon, pokemonId[0], pokemonState);
      
    });
  }
  else {
    // console.log(initialData)
    card = initialData && initialData.map((pokemon) => {
      // console.log('initial data:\n');
      // console.log(pokemon);
      let pokemonId = pokemon.url.match(regex);
      let pokemonIsCatched = false;

      const pokemonState = {
        _pokemonId: pokemonId[0],
        name: pokemon.name,
        isCatched: pokemonIsCatched,
        url: pokemon.url
      }
      // console.log(pokemonId[0]);
      return buildCard(pokemon, pokemonId[0], pokemonState);
    });
  }

  
  // Error Component
  function ErrorComponent() {
    return (
      <div>
        <h1>404 - You're out of Pokemon Page List</h1>
      </div>
    )
  }

  if (loading) {
    return (
      <div>
        <h2>Loading....</h2>
      </div>
    );
  } else {
    if (props.match.params.page < 0 || props.match.params.page > lastPageNum) {
      return (
        <ErrorComponent></ErrorComponent>
      );
    }
    else if (props.match.params.page === 0) {  // 1st page
      return <div>
          <button onClick={() => { increPageNum(); buttonChangeUrl();}}>
            Next Page
          </button>
          <br />
          <br />
          <Grid container className={classes.grid} spacing={5}>
            {card}
          </Grid>
        </div>;
    }
    else if (props.match.params.page === lastPageNum) {  // last page
      return (
        <div>
          <button onClick={() => { decrePageNum(); buttonChangeUrl();}}>
            Previous Page
          </button>
          <br />
          <br />
          <Grid container className={classes.grid} spacing={5}>
            {card}
          </Grid>
        </div>
      );
    } 

    return (
      <div>
        {props.match.params.page < lastPageNum && props.match.params.page > 0 && (
          <div>
            <button onClick={() => { decrePageNum(); buttonChangeUrl();}}>   {/* https://upmostly.com/tutorials/multiple-onclick-events-in-react-with-examples#call-multiple-functions */}
              Previous Page
            </button> &nbsp;&nbsp;
            <button onClick={() => { increPageNum(); buttonChangeUrl();}}>
              Next Page
            </button>
            <br />
            <br />
            <Grid container className={classes.grid} spacing={5}>
              {card}
            </Grid>
          </div>
        )}
      </div>
    )
  }
};


export default PokemonPage
