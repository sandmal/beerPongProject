import './App.css';

import { Route, Routes } from 'react-router-dom';
import Profile from './components/users/Profile';
import Login from './pages/Login';
import Register from './pages/Register';
import Header from './components/ui/Header';
import User from './pages/User';
import MyTeams from './components/teams/MyTeams';
import TeamId from './components/teams/TeamId';
import Logout from './pages/Logout';
import IsAuthenticated from './components/auth/isAuthenticated';
import Discover from './pages/Discover';
import Home from './pages/Home';
import Tournament from './pages/Tournament';
import Create from './pages/Create';
import ConfirmUser from './components/users/ConfirmUser';
import { AuthProvider } from './context/Auth.context';

function App() {
  return (
    <AuthProvider>
      <>
        <Header />
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/logout' element={<Logout />} />
          <Route path='/home' element={<Home />}>
            <Route path='joinedTeams' element={<p>hey</p>}>
              <Route path=':teamid' element={<p>hey</p>} />
            </Route>
            <Route path='joinedTournaments' element={<p>hey</p>}>
              <Route path=':teamid' element={<p>hey</p>} />
            </Route>
            <Route path='createdTeams' element={<MyTeams />}>
              <Route path=':teamid' element={<TeamId />} />
            </Route>
          </Route>
          <Route path='/discover' element={<Discover />}></Route>
          <Route path='/tournament' element={<Tournament />}></Route>
          <Route path='/create' element={<Create />}></Route>
          <Route
            path='/user'
            element={
              <IsAuthenticated>
                <User />
              </IsAuthenticated>
            }>
            <Route path='confirm' element={<ConfirmUser />}>
              <Route path=':token' element={<p>Hey</p>} />
            </Route>
            <Route path='profile' element={<Profile />} />
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
      </>
    </AuthProvider>
  );
}

export default App;
