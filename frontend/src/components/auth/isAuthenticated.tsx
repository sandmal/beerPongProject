import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { read } from '../../helpers/LocalStorage';
import { ChildrenProps } from '../../types';
import { AuthContext } from '../HOC/AuthProviderHOC';

function IsAuthenticated({ children }: ChildrenProps) {
  const context = useContext(AuthContext);
  const location = useLocation();
  const isLoggedIn = read('isLoggedIn');

  return isLoggedIn || context.auth.isLoggedIn ? (
    <>{children}</>
  ) : (
    <Navigate replace={true} to='/login' state={{ from: `${location.pathname}${location.search}` }} />
  );
}

export default IsAuthenticated;
