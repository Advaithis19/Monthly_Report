import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const PrivateOutlet = () => {
  // let authTokens = localStorage.getItem("authTokens")
  //   ? localStorage.getItem("authTokens")
  //   : null;
  const { user } = useContext(AuthContext);
  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateOutlet;
