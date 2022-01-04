import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { AuthContext } from '../../context/Auth.context';

const NavBar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  color: white;
`;

function Header() {
  const { state, dispatch } = useContext(AuthContext);
  return state.isLoggedIn ? (
    <NavBar>
      <NavLink to='/home'>Home</NavLink>
      <NavLink to='/discover'>Discover</NavLink>
      <NavLink to='/tournament'>Tournament</NavLink>
      {state.isRegistered ? <NavLink to='/create'>Create</NavLink> : null}
      <NavLink to='/user'>User</NavLink>
      <NavLink
        to='/logout'
        onClick={() => {
          dispatch({ type: 'USER_LOGOUT' });
        }}>
        Logout
      </NavLink>
    </NavBar>
  ) : (
    <NavBar>
      <NavLink to='/login'>Login</NavLink>
      <NavLink to='/register'>Register</NavLink>
    </NavBar>
  );
}
export default Header;
