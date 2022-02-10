import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AuthContext from "../../context/AuthContext";

//mui
import Container from "@mui/material/Container";

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
        localStorage.removeItem("authTokens");
        setAuthTokens(null);
        alert("Something went wrong!");
        navigate("/login");
      });
  };

  useEffect(() => {
    logout();
  });
  return (
    <Container
      maxWidth="md"
      component="main"
      className="border-solid border-1 border-[#27447e] my-5 shadow-xl shadow-blue-500/50"
    >
      <p className="text-xl text-bold">Unable to Logout...</p>
    </Container>
  );
};

export default Logout;
