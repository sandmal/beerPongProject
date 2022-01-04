export interface INITIAL_AUTH_STATE {
  isLoggedIn?: boolean;
  isRegistered?: boolean;
  email?: string;
}

export const UserAuthentication: INITIAL_AUTH_STATE = {
  isLoggedIn: false,
  isRegistered: false,
  email: '',
};

export interface ChildrenProps {
  children?: React.ReactNode;
}

export interface User {
  confirmToken?: string;
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

/**Register */
export const DefaultRegisterValues: User = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
};

/**Register */
export const DefaultConfirmValues: User = {
  email: '',
  confirmToken: '',
};

/**Login */
export const DefaultSignValues: User = {
  email: '',
  password: '',
};
