import { gql, useQuery } from '@apollo/client';
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

export const IS_LOGGED_IN = gql`
  {
    me {
      _id
    }
  }
`;

interface Props {
  children?: React.ReactNode;
}

function IsAuthenticated({ children }: Props) {
  const { loading, error, data } = useQuery(IS_LOGGED_IN);
  const location = useLocation();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;

  const isLoggedIn: Boolean = data.me !== null;

  return isLoggedIn ? (
    <>{children}</>
  ) : (
    <Navigate
      replace={true}
      to="/landing"
      state={{ from: `${location.pathname}${location.search}` }}
    />
  );
}

export default IsAuthenticated;
