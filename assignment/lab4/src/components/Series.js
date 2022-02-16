import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
// import noImage from '../img/download.jpeg';
import { makeStyles, Card, CardContent, Typography, CardHeader } from '@material-ui/core';

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


const Series = (props) => {
  // https://gateway.marvel.com/v1/public/series/31445?&ts=1592417963445&apikey=129562f44ff4e796645e21a3e6fb4bb5&hash=2c179358186607d357b36459135d3e9e
  const md5 = require('blueimp-md5');
  const publickey = '129562f44ff4e796645e21a3e6fb4bb5';
  const privatekey = 'ba784a02b0564cbd3019ac3f48cd7d3e19b71ada';
  const ts = new Date().getTime();
  const stringToHash = ts + privatekey + publickey;
  const hash = md5(stringToHash);
  const baseUrl = 'https://gateway.marvel.com:443/v1/public/series';
  // const url = baseUrl + `/${props.match.params.id}` + '?ts=' + ts + '&apikey=' + publickey + '&hash=' + hash;

  const [seriesData, setSeriesData] = useState(undefined);
  const [loading, setLoading] = useState(true);
  const classes = useStyles();
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    console.log('useEffect fired');

    async function fetchData() {
      try {
        setHasError(false);
        const { data: series } = await axios.get(baseUrl + `/${props.match.params.id}` + '?ts=' + ts + '&apikey=' + publickey + '&hash=' + hash);
        setSeriesData(series.data.results[0]);
        setLoading(false);
        // console.log(series.data.results[0]);
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
        <h1>404 - Series Not Found!</h1>
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
      <Card className={classes.card} variant="outlined" key={seriesData.id}>
        <CardHeader className={classes.titleHead} title={seriesData.title} />
        {/* <CardMedia className={classes.media} component="img" 
          image={ seriesData.thumbnail && seriesData.thumbnail.path ? seriesData.thumbnail.path : noImage}
          title="series image" /> */}

        <CardContent>
            <dl>
              <dt className="title">urls: </dt>
              {seriesData && seriesData.urls[0] ? (
                <dd><a href={seriesData.urls[0].url}>{seriesData.urls[0].url}</a></dd>
              ) : (
                <dd>N/A</dd>
              )}
            </dl>
            <br />
            <Link to="/series/page/0">Back to all series...</Link>
        </CardContent>
      </Card>
    );
  }
};

export default Series
