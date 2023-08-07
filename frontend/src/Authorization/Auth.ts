/* eslint-disable @typescript-eslint/no-empty-function */
import React from "react";

export interface Auth0User {
  name: string;
  email: string;
}

interface IAuth0Context {
  isAuthenticated: boolean;
  user?: Auth0User;
  signIn: () => void;
  signOut: () => void;
  loading: boolean;
}

export const Auth0Context = React.createContext<IAuth0Context>({
  isAuthenticated: false,
  signIn: () => {},
  signOut: () => {},
  loading: true,
});

export const useAuth = () => React.useContext(Auth0Context);

