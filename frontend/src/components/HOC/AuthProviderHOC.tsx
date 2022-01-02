import React, { FC, useEffect, useState } from 'react';
import { read } from '../../helpers/LocalStorage';
import { INITIALSTATE } from '../../types';

const useValue = () => {
  const [auth, setAuth] = useState<INITIALSTATE>({ isLoggedIn: false });

  const isLoggedIn = read('isLoggedIn');
  useEffect(() => {
    if (isLoggedIn) {
      return setAuth({ isLoggedIn: true });
    }
  }, [isLoggedIn]);

  return { auth, setAuth };
};

export const AuthContext = React.createContext({} as ReturnType<typeof useValue>);

export const AuthProviderHOC: FC<{}> = (props) => {
  return <AuthContext.Provider value={useValue()}>{props.children}</AuthContext.Provider>;
};
