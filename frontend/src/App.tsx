import './App.css';

import { Route, Routes } from 'react-router-dom';
import Profile from './components/users/Profile';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Header from './components/ui/Header';
import User from './pages/User';
import MyTeams from './components/teams/MyTeams';
import TeamId from './components/teams/TeamId';
import Logout from './pages/Logout';
import { AuthProviderHOC } from './components/HOC/AuthProviderHOC';
import IsAuthenticated from './components/auth/isAuthenticated';
import Teams from './pages/Teams';

function App() {
  return (
    <>
      <AuthProviderHOC>
        <Header />
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/logout' element={<Logout />} />
          <Route
            path='/user'
            element={
              <IsAuthenticated>
                <User />
              </IsAuthenticated>
            }>
            <Route path='profile' element={<Profile />} />
          </Route>
          <Route
            path='/teams'
            element={
              <IsAuthenticated>
                <Teams />
              </IsAuthenticated>
            }>
            <Route path='myteams' element={<MyTeams />}>
              <Route path=':teamid' element={<TeamId />} />
            </Route>
          </Route>
          <Route
            path='*'
            element={
              <main>
                <p>There is nothing here</p>
              </main>
            }
          />
        </Routes>
      </AuthProviderHOC>
    </>
  );
}

export default App;
