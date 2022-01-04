import { createContext, useReducer } from 'react';
import { clear, read, store } from '../helpers/LocalStorage';

type AppState = typeof initialState;
type Action = { type: 'USER_LOGIN'; payload: { email: string; isRegistered: boolean } } | { type: 'USER_LOGOUT' } | { type: 'USER_CONFIRMED' };

interface AuthProviderProps {
  children: React.ReactNode;
}

const initialState = {
  isLoggedIn: JSON.parse(read('isLoggedIn')!) || false, // HAVE TO PARSE because localstorage is stringified (always true)
  email: read('email') || '',
  isRegistered: JSON.parse(read('isRegistered')!) || false,
};

const reducer = (state: AppState, action: Action) => {
  switch (action.type) {
    case 'USER_LOGIN':
      store('isLoggedIn', true);
      store('email', action.payload.email);
      store('isRegistered', action.payload.isRegistered);
      return {
        ...state,
        isLoggedIn: true,
        isRegistered: action.payload.isRegistered,
      };
    case 'USER_LOGOUT':
      clear();
      return {
        ...state,
        isLoggedIn: false,
      };
    case 'USER_CONFIRMED':
      store('isRegistered', true);
      return {
        ...state,
        isRegistered: true,
      };
    default:
      return state;
  }
};

const AuthContext = createContext<{ state: AppState; dispatch: React.Dispatch<Action> }>({ state: initialState, dispatch: () => {} });

function AuthProvider({ children }: AuthProviderProps) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return <AuthContext.Provider value={{ state, dispatch }}>{children}</AuthContext.Provider>;
}

export { AuthProvider, AuthContext };
