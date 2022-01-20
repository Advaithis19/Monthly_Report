import React, { useState, useEffect } from "react";
import useAxios from "../../utils/axios";
import { useNavigate, useParams } from "react-router-dom";

import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
}));

const GrantDetail = () => {
  let navigate = useNavigate();
  let api = useAxios();
  let [grant, setGrant] = useState(null);
  const { id } = useParams();

  let getGrant = async () => {
    api
      .get("grants/" + id)
      .then((response) => {
        setGrant(response.data);
      })
      .catch((error) => {
        if (error.response.status === 401) {
          alert("Authentication has expired! Please re-login");
          navigate("/logout");
        } else {
          alert("Something went wrong! Please logout and try again");
        }
      });
  };

  useEffect(() => {
    getGrant();
  }, [setGrant]);

  if (!grant || grant.length === 0)
    return <p>Can not find required grant, sorry</p>;
  return (
    <div>
      <p>{grant.title}</p>
      <p>{grant.agency}</p>
      <p>{grant.sanc_amt}</p>
    </div>
  );
};

export default GrantDetail;
