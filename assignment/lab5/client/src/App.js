import React from 'react';
import logo from './logo.svg';
import './App.css';
import { ApolloClient, HttpLink, InMemoryCache, ApolloProvider } from '@apollo/client';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import Images from './components/Images';
import MyBin from './components/MyBin';
import MyPost from './components/MyPost';
import NewPost from './components/NewPost';


const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: 'http://localhost:4000'
  })
});


function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className='App'>
          <header className='App-header'>
          <h1 className='App-title'>Binterest</h1>
            <Link className='navlink' to='/my-bin'>my bin</Link> &nbsp;&nbsp;&nbsp;
            <Link className='navlink' to='/'>images</Link> &nbsp;&nbsp;&nbsp;
            <Link className='navlink' to='/my-posts'>my posts</Link> &nbsp;&nbsp;&nbsp;
          </header>
          <br />
          <br />
          <div className='App-body'>  {/* '/shows/page/:pagenum' will generate 'props.match.params.pagenum' */}
            <Route exact path = '/' component ={Images}></Route>
            <Route exact path = '/my-bin' component = {MyBin}></Route>
            <Route exact path = '/my-posts' component = {MyPost}></Route>
            <Route exact path = '/new-post' component = {NewPost}></Route>
          </div>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
