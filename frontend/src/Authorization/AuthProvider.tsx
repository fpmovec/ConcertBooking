import React from "react";
import { Auth0Context, Auth0User } from "./Auth";
import { authSettings } from "./Settings";
import { Auth0Client, createAuth0Client } from "@auth0/auth0-spa-js";

type Props = {
  children?: React.ReactNode;
};

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = React.useState<boolean>(false);
  const [user, setUser] = React.useState<Auth0User | undefined>(undefined);
  const [auth0Client, setAuth0Client] = React.useState<Auth0Client>();
  const [loading, setLoading] = React.useState<boolean>(true);

  const getAuth0ClientFromState = () => {
    if (auth0Client === undefined) throw new Error("Auth0 client not set");

    return auth0Client;
  };

  React.useEffect(() => {
    const initAuth0 = async () => {
      setLoading(true);
      const auth0FromHook = await createAuth0Client(authSettings);
      setAuth0Client(auth0FromHook);

      if (
        window.location.pathname === "/signin-callback" &&
        window.location.search.indexOf("code=") > -1
      ) {
        await auth0FromHook.handleRedirectCallback();
        window.location.replace(window.location.origin);
      }

      const isAuthenticatedFromHook = await auth0FromHook.isAuthenticated();
      if (isAuthenticatedFromHook) {
        const user = await auth0FromHook.getUser<Auth0User>();
        setUser(user);
      }
      setIsAuthenticated(isAuthenticatedFromHook);
      setLoading(false);
    };
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    initAuth0();
  }, []);
  return (
    <Auth0Context.Provider
      value={{
        isAuthenticated,
        user,
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        signIn: () => getAuth0ClientFromState().loginWithPopup(),
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        signOut: () =>
          getAuth0ClientFromState().logout({
            clientId: authSettings.clientId,
            logoutParams: {
              returnTo: window.location.origin + "/signout-callback",
            },
          }),
        loading,
      }}
    >
      {children}
    </Auth0Context.Provider>
  );
};

export const getAccessToken = async () => {
  const auth0FromHook = await createAuth0Client(authSettings);
  const accessToken = await auth0FromHook.getTokenSilently();

  return accessToken;
};
