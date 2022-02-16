import React from 'react'
import logo from './img/marvel.png';
import './App.css';

import Home from './components/Home';
import Character from './components/Character';
import CharactersList from './components/CharactersList';
import Comic from './components/Comic';
import ComicsList from './components/ComicsList';
import Series from './components/Series';
import SeriesList from './components/SeriesList';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to the React.js Marvel API</h1>
          <Link className="showlink" to="/">Home</Link>
          <Link className="showlink" to="/characters/page/0">Characters</Link>
          <Link className="showlink" to="/comics/page/0">Comics</Link>
          <Link className="showlink" to="/series/page/0">Series</Link>
        </header>
        <br />
        <br />
        <div className="App-body">  {/* "/shows/page/:pagenum" will generate 'props.match.params.pagenum' */}
          <Route exact path="/" component={Home} />
          <Route exact path="/characters/page/:page" component={CharactersList} />
          <Route exact path="/characters/:id" component={Character} />
          <Route exact path="/comics/page/:page" component={ComicsList}/>  
          <Route exact path="/comics/:id" component={Comic}/> 
          <Route exact path="/series/page/:page" component={SeriesList}/>
          <Route exact path="/series/:id" component={Series}/> 
        </div>
      </div>
    </Router>
  );
}

export default App;
