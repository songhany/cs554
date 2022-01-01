import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';

import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
// import { Card } from 'react-bootstrap';
// import Button from 'react-bootstrap/Button';
import '../App.css';
import { makeStyles, Card, CardContent, CardMedia, Typography, CardHeader, CardActionArea, CardActions } from '@material-ui/core';

const actions = require('../actions');


const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
  card: {
    maxWidth: 550,
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


const Pokemon = (props) => {
  props.match.params.id = parseInt(props.match.params.id);  // ❤ 
  const classes = useStyles();
  const [pokeData, setPokeData] = useState(undefined);
  const [loading, setLoading] = useState(true);
  let typeList = [];

  useEffect(() => {
    // console.log('useEffect fired');
    async function fetchData() {
      try {
        setLoading(true);
        const { data: pokemon } = await axios.get(`http://localhost:3001/pokemon/${props.match.params.id}`);
        setPokeData(pokemon);
        setLoading(false);

        // console.log(pokemon);
        // return () => {  // Any cleanup go here
        //   clearInterval(variable);
        // }
      } catch (e) {
        console.log(e);
      }
    }
    fetchData();
  }, [props.match.params.id]);


  const allTrainers = useSelector((state) => state.trainers);  //! Access trainer list from State tree
  const dispatch = useDispatch();  //! dispatch an action. This is the only way to trigger a state change.

  // Redux dispatch()
  const catchPokemonFromSelectedTrainer = async (pokemonState) => {
    dispatch(actions.catchPokemon(pokemonState));  // add pokemon to current selected trainer
  }

  const releasePokemonFromSelectedTrainer = async (pokemonState) => {
    dispatch(actions.releasePokemon(pokemonState));  // remove pokemon from selected trainer's listPokemons []
  }

  // Error Component
  function ErrorComponent() {
    return (
      <div>
        <h1>404 - You don't find pokemon with this Id</h1>
      </div>
    )
  }

  if (loading) {
    if (!pokeData) {
      return (<ErrorComponent></ErrorComponent>);
    }
   
    return (
      <div>
        <h2>Loading....</h2>
      </div>
    );
  } else {
    pokeData.types.forEach((obj) => {
      // console.log(obj.type.name);
      typeList.push(obj.type.name);
    })

    const pokemonState = {
      _pokemonId: props.match.params.id,
      name: pokeData["species"]["name"],
      isCatched: '',  // I don't use this attribute in this application
      url: ["species"]["url"],
    }
    
    // console.log('allTrainers:', allTrainers);
    const selectedTrainer = allTrainers[allTrainers.findIndex(x => x.selected)];  // find current selected trainer
    // console.log('selectedTeam:', selectedTrainer);
    const isPokeOnTeam = selectedTrainer && selectedTrainer.listPokemons.findIndex(x => x === props.match.params.id);
    const isPartyFull = selectedTrainer && selectedTrainer.listPokemons.length < 6 ? false : true;

    
    return (
      <Card className={classes.card} variant="outlined">
        <CardHeader className={classes.titleHead} title={pokeData.name} />
        <img 
          class="card-img-top" 
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${props.match.params.id}.png`} 
          onError={(e)=>{e.target.onerror = null; e.target.src=`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${props.match.params.id}.png`}}
          alt={pokeData.name}>
        </img>

        <div>
          {`Type: ${typeList}`}
        </div>
        <CardContent>
          <Typography>
            {props.match.params.id < 1118 ? <Link to={`/pokemon/page/${Math.floor(props.match.params.id/31)}`}>Back to all pokemons list...</Link> : <Link to={`/pokemon/page/0`}>Back to all pokemons list...</Link>}
          </Typography>
        </CardContent>

        <CardActions>
          {isPokeOnTeam !=-1 ? 
            <button onClick={() => { releasePokemonFromSelectedTrainer(pokemonState);}}>Release</button> : 
            (isPartyFull ? 
              <button>Party Full</button> 
            : <button onClick={() => { catchPokemonFromSelectedTrainer(pokemonState);}}>Catch</button>)}
        </CardActions>
      </Card>
    );
  }
}

export default Pokemon;
