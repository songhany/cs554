import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
// import noImage from '../img/download.jpeg';
import { Card, CardContent, Grid, Typography, makeStyles } from '@material-ui/core';
// import { Card } from 'react-bootstrap';

import '../App.css';
import SearchSeries from './SearchSeries';

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


const SeriesList = (props) => {
  // 1. For valid url 
  const md5 = require('blueimp-md5');
  const publickey = '129562f44ff4e796645e21a3e6fb4bb5';
  const privatekey = 'ba784a02b0564cbd3019ac3f48cd7d3e19b71ada';
  const ts = new Date().getTime();
  const stringToHash = ts + privatekey + publickey;
  const hash = md5(stringToHash);
  const baseUrl = 'https://gateway.marvel.com:443/v1/public/series';
  props.match.params.page = parseInt(props.match.params.page);
  const url = baseUrl + '?ts=' + ts + '&apikey=' + publickey + '&hash=' + hash;

  // 2. For fetch data 
  const classes = useStyles();  // for using '@material-ui/core'
  const [ loading, setLoading] = useState(true);  // ❤ setting my initial state is just like constructor(props) in Class-Based Compoennt
  const [ initialData, setInitialData ] = useState(undefined);
  const [ searchData, setSearchData ] = useState(undefined);
  const [ pageData, setPageData ] = useState(undefined);
  const [ seriesTerm, setSeriesTerm ] = useState('');
  let card = null;

  // 3. For pagination
  const history = useHistory();  // update URL with button. https://stackoverflow.com/questions/66721132/trying-to-update-url-parameter-with-onclick-in-react
  const [ lastPageNum, setLastPageNum ] = useState(undefined);

  
  useEffect(() => {  // initial loading data
    console.log('initial loading useeffect');
    async function fetchData() {
      try {
        const { data } = await axios.get(url);
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
        console.log(`search: ${seriesTerm}`);
        const { data } = await axios.get(baseUrl + '?titleStartsWith=' + seriesTerm + '&ts=' + ts + '&apikey=' + publickey + '&hash=' + hash);
        setSearchData(data.data.results);
        setLoading(false);
      } catch (e) {
        console.log(e);
      }
    }
    if (seriesTerm) {
      console.log('seriesTerm is set');
      fetchData();
    }
  }, [seriesTerm]);


  useEffect(() => {  // 'props.match.params.page' fire this
    console.log('"props.match.params.page" useEffect fired');
    async function fetchData() {
      try {
        const { data } = await axios.get(url);
        const { data: urlPageData } = await axios.get(baseUrl + `?offset=${props.match.params.page*parseInt(data.data.limit)}&ts=${ts}&apikey=${publickey}&hash=${hash}`);
        
        // console.log('-------- pagenum useEffect data -----------');
        // console.log(urlPageData);
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
    history.push(`/series/page/${props.match.params.page}`);
  }

  const searchValue = async (value) => {
    setSeriesTerm(value);
  };

  function ErrorComponent() {
    return (
      <div>
        <h1>404 - Series Not Found! You're out of series List</h1>
      </div>
    )
  }
  
  // card UI
  const buildCard = (series) => {
    return (
      <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={series.id}>
        <Card className={classes.card} variant="outlined">
          <Link to={`/series/${series.id}`}>

            <CardContent>
              <Typography className={classes.titleHead} gutterBottom variant="h6" component="h3">
                {series.title}
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


  if (seriesTerm) {  // search keyword
    card = searchData && searchData.map((series) => {
      return buildCard(series);  // call buildCard() function to build card for each series
    });
  
  } 
  else if (props.match.params.page && props.match.params.page >= 0) {
    card = pageData && pageData.map((series) => {
      return buildCard(series);
    });
  }
  else {
    card = initialData && initialData.map((series) => {
      return buildCard(series);
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
          <SearchSeries searchValue={searchValue} />
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
          <SearchSeries searchValue={searchValue} />
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
            <SearchSeries searchValue={searchValue} />
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

export default SeriesList
