import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import SearchShows from "./SearchShows";
import noImage from "../img/download.jpeg";
import "../App.css";

const ShowList = (props) => {
  const [searchData, setSearchData] = useState(undefined);
  const [showsData, setShowsData] = useState(undefined);
  const [searchTerm, setSearchTerm] = useState("");
  let li = null;
  let img = null;

  useEffect(
    () => {
      console.log("render");
      async function fetchData() {
        if (searchTerm) {
          try {
            const { data } = await axios.get('http://api.tvmaze.com/search/shows?q=' + searchTerm);
            setSearchData(data);
          } catch (e) {
            console.log(e);
          }
        } else {
          try {
            const { data } = await axios.get('http://api.tvmaze.com/shows');
            setShowsData(data);
          } catch (e) {
            console.log(e);
          }
        }
      }
      fetchData();
    },
    [ searchTerm ]  
  );

  const searchValue = (value) => {
    setSearchTerm(value);
  }

  
  if (searchTerm) {
    li = 
      searchData && 
      searchData.map((shows) => {
        // console.log(shows);
        let { show } = shows;
        if (show.image && show.image.medium) {
          img = <img alt='Show' src={show.image.medium} />;
        } else {
          img = <img alt='Show' src={noImage} />;
        }

        return (
          <li key={show.id}>
            <Link to={`/shows/${show.id}`}>
              {img} <br />
              {show.name}
            </Link>
          </li>
        );
      });
  } else {
    li = 
      showsData && 
      showsData.map((show) => {
        
        if (show.image && show.image.medium) {
          img = <img alt='Show' src={show.image.medium} />;
        } else {
          img = <img alt='Show' src={noImage} />;
        }

        return (
          <li key={show.id}>
            <Link to={`/shows/${show.id}`}>
              {img} <br />
              {show.name}
            </Link>
          </li>
        );
      });
  }

  // Until here, showList Component is donr, we need to render showList Component
  return (
    <div className="App-body">
      <SearchShows searchValue={searchValue} />
      <ul>{li}</ul>
    </div>
  );
};

export default ShowList;
