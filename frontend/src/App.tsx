import './App.css';
import IsAuthenticated from './components/isAuthenticated';

import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache } from '@apollo/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Profile from './pages/Profile';
import Login from './pages/Login';

const httpLink = new HttpLink({
  uri: 'http://localhost:4000/graphql',
  credentials: 'include',
});

const link = httpLink;

const client = new ApolloClient({
  link: link as any,
  cache: new InMemoryCache(),
});
function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Routes>
          <Route path="/landing" element={<div>Hello</div>} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/profile"
            element={
              <IsAuthenticated>
                <Profile />
              </IsAuthenticated>
            }
          />
        </Routes>
      </Router>
    </ApolloProvider>
  );
}

export default App;
