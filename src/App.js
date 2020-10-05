import React, { useState } from 'react';
import './App.css';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import { ApolloClient, gql } from '@apollo/client';
import { ApolloProvider } from 'react-apollo';
import Navbar from './util/Navbar';


import Axios from 'axios';
import Login from './Auth/Login';
import Signup from './Auth/Signup';
import Profile from './pages/profile';
import secContext from './util/secContext';
import Home from './pages/home';
import "bootstrap/dist/css/bootstrap.min.css";
import ResultsExplorer from './pages/resultsExplorer';
import { default_values } from './default_value';
import { cache, currentSection } from './util/cache';

Axios.defaults.baseURL = 'http://127.0.0.1:8000';

export const client = new ApolloClient({
  uri: Axios.defaults.baseURL + '/graphql/',
  cache,
  fetchOptions: {
    credentials: "include"
  },
  request: operation => {
    const token = localStorage.getItem('authToken') || ""
    operation.setContext({
      headers: {
        Authorization: `JWT ${token}`
      }
    })
  },
});

function App() {

  // State also contains the updater function so it will
  // be passed down into the context provider
  const changeSecName = (name) => {
    currentSection(name)
  }
  console.log(currentSection())

  return (

    <ApolloProvider client={client}>
      <secContext.Provider value={{ name: currentSection(), changeSecName }}>
        <Router>
          <Navbar />
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/nav/:sec' component={Home} />
            <Route exact path='/resultsexplorer' component={ResultsExplorer} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/signup' component={Signup} />
            <Route path='/profile/:id' component={Profile} />
          </Switch>
        </Router>
      </secContext.Provider>
    </ApolloProvider>
  );
}


export const GET_TRACKS_QUERY = gql`
  query getTracksQuery {
      music {
      id
      title
      description
      hashtag
      url
      owner {
      id
        username
    }
    }
}

`;





export const GET_SELF_QUERY = gql`
{
  userself {
    id
    username
    email
  }
}
`;

export const GET_USER_QUERY = gql`
query($id: Int!){
  user(id: $id){
    id
    username
    email
    dateJoined
    musicSet{
      id
      title
      url
    }
  }
}
`;


export default App; 
