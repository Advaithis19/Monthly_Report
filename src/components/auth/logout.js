import React, { useEffect } from "react";
// import useAxios from "../../utils/axios";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Logout = () => {
  const navigate = useNavigate();
  // let api = useAxios();

  let logout = async () => {
    axios
      .post("http://127.0.0.1:8000/api/users/logout/blacklist/", {
        refresh_token: localStorage.getItem("refresh_token"),
      })
      .then(() => {
        // localStorage.removeItem("access_token");
        // localStorage.removeItem("refresh_token");
        localStorage.removeItem("authTokens");
        // api.defaults.headers["Authorization"] = null;
        navigate("/login");
        // window.location.reload();
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
