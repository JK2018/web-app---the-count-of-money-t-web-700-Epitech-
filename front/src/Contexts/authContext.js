import React, { useState, createContext, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import userApi from "../Api/userApi";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  const history = useHistory();

  useEffect(() => {
    if(localStorage.getItem("access_token")) {
      setUser({nom: "test"})
    }
  }, [])

  const signup = (credentials) => {
  };

  const signin = (email, password) => {
    return userApi.signin({email, password})
      .then((data) => {
        localStorage.setItem("access_token", data.data.access_token)
        setUser({nom: "test"});
      })
  };

  const signout = () => {
    history.push("/");
    window.localStorage.removeItem("access_token");
    window.localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, signup, signin, signout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
