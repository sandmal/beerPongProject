import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/Auth.context';
import { ChildrenProps } from '../../types';

function IsAuthenticated({ children }: ChildrenProps) {
  const location = useLocation();
  const { state } = useContext(AuthContext);

  return state.isLoggedIn ? <>{children}</> : <Navigate replace={true} to='/login' state={{ from: `${location.pathname}${location.search}` }} />;
}

export default IsAuthenticated;
