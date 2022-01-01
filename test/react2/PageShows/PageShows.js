import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Route } from 'react-router';
import { Link, useHistory } from 'react-router-dom';
// import SearchShows from './SearchShows';
import noImage from '../img/download.jpeg';
import { Card, CardActionArea, CardContent, CardMedia, Grid, Typography, makeStyles, Button } from '@material-ui/core';

import '../App.css';


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


const ShowList = (props) => {
  // console.log('props: ');
  // console.log(props);
  const regex = /(<([^>]+)>)/gi;
  const classes = useStyles();  // for using '@material-ui/core'
  const [loading, setLoading] = useState(true);  // ❤ setting my initial state is just like constructor(props) in Class-Based Compoennt
  // const [searchData, setSearchData] = useState(undefined);
  const [showsData, setShowsData] = useState(undefined);
  // const [searchTerm, setSearchTerm] = useState('');
  let card = null;

  // for pagination. localhost:3000/shows/page/0
  props.match.params.pagenum = parseInt(props.match.params.pagenum);
  const [ pageData, setPageData ] = useState(undefined);
  const history = useHistory();  // update URL with button. https://stackoverflow.com/questions/66721132/trying-to-update-url-parameter-with-onclick-in-react
  var [ hasError, setHasError ] = useState(false);  // Error Handling in React Hooks. https://medium.com/technofunnel/error-handling-in-react-hooks-e42ab91c48f4
  const [ nextPageNum, setnNextPageNum ] = useState(undefined);
  const [ lastPageNum, setLastPageNum ] = useState(undefined);

  useEffect(() => {
    console.log('on load useeffect');
    async function fetchData() {
      try {
        const { data } = await axios.get('http://api.tvmaze.com/shows');
        setShowsData(data);
        setLoading(false);
      } catch (e) {
        console.log(e);
      }
    }
    fetchData();  // call fetchData()
  }, []);


  // 'props.match.params.pagenum' fire this
  useEffect(() => {
    console.log('props.match.params.pagenum useEffect fired');
    async function fetchData() {
      try {
        const { data } = await axios.get(`https://api.tvmaze.com/shows?page=${props.match.params.pagenum}`);
        
        // console.log('-------- pagenum useEffect data -----------');
        // console.log(data);
        setPageData(data);
        setLoading(false);
      } catch (e) {
        // console.log(e);
      }
    }
    
    async function isLastPage() {
      try {
        setnNextPageNum(props.match.params.pagenum + 1);
        const { data } = await axios.get(`https://api.tvmaze.com/shows?page=${nextPageNum}`);
      } catch (e) {
        setLastPageNum(props.match.params.pagenum);
        setHasError(true);
      }
    }

    if (props.match.params.pagenum) {
      console.log('props.match.params.pagenum is set');
      fetchData();
      isLastPage();
    }
  }, [props.match.params.pagenum]);


  const decrePageNum = async () => {
    props.match.params.pagenum = props.match.params.pagenum - 1;
  };

  const increPageNum = async () => {
    props.match.params.pagenum = props.match.params.pagenum + 1;
  };

  const buttonChangeUrl = async () => {
    history.push(`/shows/page/${props.match.params.pagenum}`);
  }

  function ErrorComponent() {
    return (
      <div>
        <h1>404 - Shows List Not Found! You're out of show List</h1>
      </div>
      )
  }

  // card UI
  const buildCard = (show) => {
    return (
      <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={show.id}>
        <Card className={classes.card} variant="outlined">
          <CardActionArea>
            <Link to={`/shows/${show.id}`}>  {/* <a href="/shows/1"> */}
              <CardMedia
                className={classes.media}
                component="img"
                image={show.image && show.image.original ? show.image.original : noImage }
                title="show image"
              />  {/* <img> */}

              <CardContent>  {/* <div class="MuiCardContent-root"> */}
                <Typography className={classes.titleHead} gutterBottom variant="h6" component="h3">
                  {show.name}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {show.summary ? show.summary.replace(regex, '').substring(0, 139) + '...' : 'No Summary'}
                  <span>More Info</span>
                </Typography>
              </CardContent>
            </Link>
          </CardActionArea>
        </Card>
      </Grid>
    );
  };

  
  // props.match.params.pagenum
  if (props.match.params.pagenum && props.match.params.pagenum >= 0) {
    card = pageData && pageData.map((show) => {
      return buildCard(show);
    });
  } else {
    card = showsData && showsData.map((show) => {
      return buildCard(show);
    });
  }
  

  if (loading) {
    return (
      <div>
        <h2>Loading....</h2>
      </div>
    );
  } else {
    if (props.match.params.pagenum < 0) {
      return (
        <div>
          <h1>404 - Shows List Not Found! Page number cannot less than 0. You're out of show List</h1>
        </div>
      );
    }
    if (props.match.params.pagenum === 0) {  // The first page
      return (
        <div>
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
    if (props.match.params.pagenum == lastPageNum ) {  // The last oge
      return (
        <div>
          {!hasError && (
            <section className="App">
              <button onClick={() => { decrePageNum(); buttonChangeUrl();}}>   {/* https://upmostly.com/tutorials/multiple-onclick-events-in-react-with-examples#call-multiple-functions */}
                Previous Page
              </button> &nbsp;&nbsp;
              <br />
              <br />
              <Grid container className={classes.grid} spacing={5}>
                {card}
              </Grid>
            </section>
          )}
    
          {hasError && <ErrorComponent></ErrorComponent>}
        </div>
      );
    }

    // Error Handling in React Hooks https://medium.com/technofunnel/error-handling-in-react-hooks-e42ab91c48f4
    return (
      <div>
        {!hasError && props.match.params.pagenum === 0 && (
          <section className="App">
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
          </section>
        )}

        {!hasError && (
          <section className="App">
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
          </section>
        )}
  
        {hasError && <ErrorComponent></ErrorComponent>}
      </div>
    );
    
  }
};

export default ShowList;
