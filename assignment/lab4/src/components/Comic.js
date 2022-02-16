import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
// import noImage from '../img/download.jpeg';
import { makeStyles, Card, CardContent, CardHeader } from '@material-ui/core';

import '../App.css';


const useStyles = makeStyles({
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


const Comic = (props) => {
  // construct the valid URL
  // https://gateway.marvel.com:443/v1/public/comics/1?apikey=129562f44ff4e796645e21a3e6fb4bb5
  const md5 = require('blueimp-md5');
  const publickey = '129562f44ff4e796645e21a3e6fb4bb5';
  const privatekey = 'ba784a02b0564cbd3019ac3f48cd7d3e19b71ada';
  const ts = new Date().getTime();
  const stringToHash = ts + privatekey + publickey;
  const hash = md5(stringToHash);
  const baseUrl = 'https://gateway.marvel.com:443/v1/public/comics';
  // const url = baseUrl + `/${props.match.params.id}` + '?ts=' + ts + '&apikey=' + publickey + '&hash=' + hash;
  
  const [comicData, setComicData] = useState(undefined);
  const [loading, setLoading] = useState(true);
  const classes = useStyles();
  const [ hasError, setHasError] = useState(false);

  useEffect(() => {
    console.log('useEffect fired');
    async function fetchData() {
      try {
        setHasError(false);
        const comicUrl = baseUrl + `/${props.match.params.id}?ts=${ts}&apikey=${publickey}&hash=${hash}`;
        const { data: comic } = await axios.get(comicUrl);
        setComicData(comic.data.results[0]);
        setLoading(false);
      } catch (e) {
        //! return 404 Error Compoenet
        console.log(e)
        setHasError(true);
      }
    }
    fetchData();
  }, [props.match.params.id]);

  
  if (hasError) {
    return (
      <div>
        <h1>404 - Comic Not Found!</h1>
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
    return (
      <Card className={classes.card} variant="outlined" key={comicData.id}>
        <CardHeader className={classes.titleHead} title={comicData.title} />
        {/* <CardMedia className={classes.media} component="img" 
          image={ comicData.thumbnail && comicData.thumbnail.path ? comicData.thumbnail.path : noImage}
          title="comic image" /> */}

        <CardContent>
            <dl>
              <dt className="title">urls:</dt>
              {comicData && comicData.urls[0] ? (
                <dd><a href={comicData.urls[0].url}>{comicData.urls[0].url}</a></dd>
              ) : (
                <dd>N/A</dd>
              )}
            </dl>
            <br />
            <Link to="/comics/page/0">Back to all comics...</Link>
        </CardContent>
      </Card>
    );
  }
};

export default Comic;
