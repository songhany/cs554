import React from 'react'
import logo from './img/pokeBall.png';
import './App.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import Home from './components/Home';
import Trainers from "./components/Trainers";
import PokemonList from "./components/PokemonPage";
import Pokemon from "./components/Pokemon";


function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">React-Redux-Express/GraphQL Redis Pokemon Lab</h1>
          <Link className="showlink" to="/">Home</Link>
          <Link className="showlink" to="/trainers">Trainers</Link>
          <Link className="showlink" to="/pokemon/page/0">PokemonList</Link>
        </header>
        <br />
        <br />
        <div className="App-body">  {/* "/shows/page/:pagenum" will generate 'props.match.params.pagenum' and pass it to "components" */}
          <Route exact path="/" component={Home} />
          <Route exact path="/trainers" component={Trainers} />
          <Route exact path="/pokemon/page/:page" component={PokemonList} />
          <Route exact path="/pokemon/:id" component={Pokemon} />
        </div>
      </div>
    </Router>
  );
}

export default App;
