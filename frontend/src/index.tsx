import React from 'react';
import { render } from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache } from '@apollo/client';
import { BrowserRouter as Router } from 'react-router-dom';

const httpLink = new HttpLink({
  uri: 'http://localhost:4000/graphql',
  // uri: 'http://10.0.0.36:4000/graphql', //Testing for mobil
  credentials: 'include',
});

const link = httpLink;

const client = new ApolloClient({
  link: link as any,
  cache: new InMemoryCache(),
});
render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Router>
        <App />
      </Router>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
