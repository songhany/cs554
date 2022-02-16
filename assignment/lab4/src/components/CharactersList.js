import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
// import noImage from '../img/download.jpeg';
import { Card, CardContent, Grid, Typography, makeStyles } from '@material-ui/core';

import '../App.css';
import SearchCharacters from './SearchCharacters';

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


const CharactersList = (props) => {
  // 1. For valid url 
  // https://gateway.marvel.com:443/v1/public/characters?offset=20&apikey=129562f44ff4e796645e21a3e6fb4bb5
  const md5 = require('blueimp-md5');
  const publickey = '129562f44ff4e796645e21a3e6fb4bb5';
  const privatekey = 'ba784a02b0564cbd3019ac3f48cd7d3e19b71ada';
  const ts = new Date().getTime();
  const stringToHash = ts + privatekey + publickey;
  const hash = md5(stringToHash);
  const baseUrl = 'https://gateway.marvel.com:443/v1/public/characters';
  props.match.params.page = parseInt(props.match.params.page);
  const url = baseUrl + '?ts=' + ts + '&apikey=' + publickey + '&hash=' + hash;
  // const urlPageData = baseUrl + `?offset=${props.match.params.page}` + '&ts=' + ts + '&apikey=' + publickey + '&hash=' + hash;
  // const urlSearchForm = baseUrl + '?nameStartsWith=' + charTerm + '&ts=' + ts + '&apikey=' + publickey + '&hash=' + hash;

  // 2. For fetch data 
  const classes = useStyles();  // for using '@material-ui/core'
  const [ loading, setLoading] = useState(true);  // ❤ setting my initial state is just like constructor(props) in Class-Based Compoennt
  const [ initialData, setInitialData] = useState(undefined);
  const [ pageData, setPageData ] = useState(undefined);
  const [ searchData, setSearchData] = useState(undefined);
  const [charTerm, setCharTerm] = useState('');
  let card = null;

  // 3. For pagination
  const history = useHistory();  // update URL with button. https://stackoverflow.com/questions/66721132/trying-to-update-url-parameter-with-onclick-in-react
  const [ lastPageNum, setLastPageNum ] = useState(undefined);
  // const [ hasError, setHasError ] = useState(false);  // Error Handling in React Hooks. https://medium.com/technofunnel/error-handling-in-react-hooks-e42ab91c48f4

  
  useEffect(() => {  // initial loading data
    console.log('initial loading useeffect');
    async function fetchData() {
      try {
        const { data } = await axios.get(url);
        // console.log(data.data.results);
        setInitialData(data.data.results);
        setLoading(false);
        setLastPageNum(Math.floor(data.data.total/data.data.limit));  // set last page number
      } catch (e) {
        console.log(e);
      }
    }
    fetchData();  // call fetchData()
  }, []);


  useEffect(() => {  // search form keyword fire this
    console.log('search form useEffect fired');
    async function fetchData() {
      try {
        // const urlSearchForm = baseUrl + '?nameStartsWith=' + charTerm + '&ts=' + ts + '&apikey=' + publickey + '&hash=' + hash;
        console.log(`search: ${charTerm}`);
        const { data } = await axios.get(baseUrl + '?nameStartsWith=' + charTerm + '&ts=' + ts + '&apikey=' + publickey + '&hash=' + hash);
        setSearchData(data.data.results);
        setLoading(false);
      } catch (e) {
        console.log(e);
      }
    }
    if (charTerm) {
      console.log('charTerm is set');
      fetchData();
    }
  }, [charTerm]);


  useEffect(() => {  // 'props.match.params.page' fire this
    console.log('"props.match.params.page" useEffect fired');
    async function fetchData() {
      try {
        const { data } = await axios.get(url);
        // const urlPage = baseUrl + `?offset=${props.match.params.page*parseInt(data.data.limit)}` + '&ts=' + ts + '&apikey=' + publickey + '&hash=' + hash;
        const { data: urlPageData } = await axios.get(baseUrl + `?offset=${props.match.params.page*parseInt(data.data.limit)}&ts=${ts}&apikey=${publickey}&hash=${hash}`);
        
        // console.log('-------- pagenum useEffect data -----------');
        // console.log(data);
        setPageData(urlPageData.data.results);
        setLoading(false);
      } catch (e) {
        console.log(e);
      }
    }

    if (props.match.params.page) {
      console.log('props.match.params.page is set');
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
    history.push(`/characters/page/${props.match.params.page}`);
  }

  const searchValue = async (value) => {
    setCharTerm(value);
  };

  function ErrorComponent() {
    return (
      <div>
        <h1>404 - Character Not Found! You're out of character List</h1>
      </div>
    )
  }
  
  // card UI
  const buildCard = (char) => {
    return (
      <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={char.id}>
        <Card className={classes.card} variant="outlined">
            <Link to={`/characters/${char.id}`}>
              <CardContent>
                <Typography className={classes.titleHead} gutterBottom variant="h6" component="h2">
                  {char.name}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  <span>More Info</span>
                </Typography>
              </CardContent>
            </Link>
        </Card>
      </Grid>
    );
  };


  if (charTerm) {  // search keyword
    card = searchData && searchData.map((char) => {
      return buildCard(char);  // call buildCard() function to build card for each char
    });
  
  } 
  else if (props.match.params.page && props.match.params.page >= 0) {
    card = pageData && pageData.map((char) => {
      return buildCard(char);
    });
  }
  else {
    card = initialData && initialData.map((char) => {
      return buildCard(char);
    });
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
    else if (props.match.params.page === 0) {
      return (
        <div>
          <SearchCharacters searchValue={searchValue} />
          <button onClick={() => { increPageNum(); buttonChangeUrl();}}>
            Next Page
          </button>
          <br />
          <br />
          <Grid container className={classes.grid} spacing={5}>
            {card}
          </Grid>
        </div>
      );
    }
    else if (props.match.params.page === lastPageNum) {
      return (
        <div>
          <SearchCharacters searchValue={searchValue} />
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
            <SearchCharacters searchValue={searchValue} />
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


export default CharactersList


