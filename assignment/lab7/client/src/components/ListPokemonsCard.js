import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';

import axios from 'axios';
import { Link } from 'react-router-dom';
import { Card, CardContent, Grid, Typography, makeStyles } from '@material-ui/core';


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

const ListPokemon = (props) => {
  const [ pokeData, setPokeData ] = useState(undefined);
  const classes = useStyles();
  let card = null;

  // useEffect(() => {
  //   console.log('useEffect fired');
  //   async function fetchData() {
  //     try {
  //       const { data: pokemon } = await axios.get(`http://localhost:3001/pokemon/${props.match.params.id}`);
  //       setPokeData(pokemon);
  //       // setLoading(false);
  //       // console.log(pokemon);
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   }
  //   fetchData();
  // }, [props.trainer.listPokemons]);


  // card UI
  const buildCard = (pokemonId) => {
    // console.log(pokemonState);
    return (
      <Grid item xs={4} sm={4} md={4} lg={4} xl={4} key={pokemonId}>
        <Card className={classes.card} variant="outlined">
          <Link to={`/pokemon/${pokemonId}`}>
            <img 
              className="card-img-top" 
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`}
              onError={(e)=>{e.target.onerror = null; e.target.src=`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`}}
            ></img> {/* https://stackoverflow.com/questions/34097560/react-js-replace-img-src-onerror */}
            
          </Link>
        </Card>
      </Grid>
    );
  };


  console.log('props.trainer.listPokemons:', props.trainer.listPokemons);
  card = props.trainer.listPokemons.map((pokemonId) => {
    // console.log(pokemonId);
    return buildCard(pokemonId);
  });

  return (
    <div>
      {card}
    </div>
  )
}

export default ListPokemon
