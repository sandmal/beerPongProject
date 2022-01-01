import React, { FC, useEffect, useState } from 'react';
import { read } from '../../helpers/Auth';

export interface INITIALSTATE {
  isLoggedIn: any;
}

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
