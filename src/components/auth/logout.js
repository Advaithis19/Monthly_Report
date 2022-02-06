import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AuthContext from "../../context/AuthContext";

const Logout = () => {
  //context api consumption - declaration
  let { setAuthTokens } = useContext(AuthContext);

  const navigate = useNavigate();

  let logout = async () => {
    axios
      .post("http://127.0.0.1:8000/api/users/logout/blacklist/", {
        refresh_token: localStorage.getItem("refresh_token"),
      })
      .then(() => {
        localStorage.removeItem("authTokens");
        setAuthTokens(null);
        navigate("/login");
      })
      .catch(() => {
        alert("Something went wrong!");
      });
  };

  useEffect(() => {
    logout();
  });
  return <div>Logout</div>;
};

export default Logout;
