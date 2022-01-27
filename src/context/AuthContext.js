import { createContext, useState, useEffect } from "react";
import jwt_decode from "jwt-decode";

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
  let [authTokens, setAuthTokens] = useState(null);

  let [user, setUser] = useState(null);

  let contextData = {
    user: user,
    setAuthTokens: setAuthTokens,
    authTokens: authTokens,
  };

  useEffect(() => {
    if (authTokens) {
      setUser(jwt_decode(authTokens.access));
    } else {
      setUser(null);
    }
  }, [authTokens, setUser]);

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};
