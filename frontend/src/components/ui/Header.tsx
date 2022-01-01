import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { clear } from '../../helpers/Auth';
import { AuthContext } from '../HOC/AuthProviderHOC';

const NavBar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  backgroundcolor: teal;
  color: white;
`;

function Header() {
  const context = useContext(AuthContext);

  return context.auth.isLoggedIn ? (
    <NavBar>
      <NavLink to="/user">User</NavLink>
      <NavLink to="/teams">Teams</NavLink>
      <NavLink
        to="/logout"
        onClick={() => {
          context.setAuth({ ...context.auth, isLoggedIn: false });
          clear();
        }}
      >
        Logout
      </NavLink>
    </NavBar>
  ) : (
    <NavBar>
      <NavLink to="/login">Login</NavLink>
    </NavBar>
  );
}
export default Header;
