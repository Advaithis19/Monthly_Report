import React from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const ActivateAccount = () => {
  const { uid, token } = useParams();
  const navigate = useNavigate();

  let handleSubmit = async () => {
    axios
      .post(`http://127.0.0.1:8000/api/auth/users/activation/`, {
        uid: uid,
        token: token,
      })
      .then((response) => {
        if (response.status === 204) {
          alert("Activation completed! You will now be redirected to login");

          navigate("/login");
        }
      })
      .catch((err) => {
        alert("Something went wrong! Did you try activating your account?");
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="submit" value="Activate" />
    </form>
  );
};

export default ActivateAccount;
