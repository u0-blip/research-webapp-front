import React from 'react';
import './App.css';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import { ApolloClient, createHttpLink, gql, useQuery } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

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
import { cache, currentSection } from './util/cache';
import Structure from './pages/stucture';
//Redux
import { Provider } from "react-redux";
import store from "./redux/store";

Axios.defaults.baseURL = 'https://research.tbitzz.com';

const httpLink = createHttpLink({
  uri: Axios.defaults.baseURL + '/graphql/',
});
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('authToken') || ""
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      Authorization: `JWT ${token}`,
    }
  }
});

export const client = new ApolloClient({
  cache,
  fetchOptions: {
    credentials: "include"
  },
  link: authLink.concat(httpLink),
});

function App() {

  // State also contains the updater function so it will
  // be passed down into the context provider
  const changeSecName = (name) => {
    currentSection(name)
  }
  return (

    <Provider store={store}>
      <ApolloProvider client={client}>
        <secContext.Provider value={{ name: currentSection(), changeSecName }}>
          <Router>
            <Navbar />
            <Switch>
              <Route exact path='/' component={Home} />
              <Route exact path='/config/:sec' component={Home} />
              <Route exact path='/resultsexplorer' component={ResultsExplorer} />
              <Route exact path='/structure/:sec' component={Structure} />
              <Route exact path='/login' component={Login} />
              <Route exact path='/signup' component={Signup} />
              <Route path='/profile/:id' component={Profile} />
            </Switch>
          </Router>
        </secContext.Provider>
      </ApolloProvider>
    </Provider>
  );
}


export const GET_TRACKS_QUERY = gql`
  query getTracksQuery {
      track {
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
