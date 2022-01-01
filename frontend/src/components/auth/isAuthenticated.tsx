import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { read } from '../../helpers/Auth';
import { AuthContext } from '../HOC/AuthProviderHOC';

interface Props {
  children?: React.ReactNode;
}

function IsAuthenticated({ children }: Props) {
  const context = useContext(AuthContext);
  const location = useLocation();
  const isLoggedIn = read('isLoggedIn');

  return isLoggedIn || context.auth.isLoggedIn ? (
    <>{children}</>
  ) : (
    <Navigate
      replace={true}
      to="/login"
      state={{ from: `${location.pathname}${location.search}` }}
    />
  );
}

export default IsAuthenticated;
