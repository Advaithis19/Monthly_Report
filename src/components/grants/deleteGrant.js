import React from "react";
import useAxios from "../../utils/axios";
import { useParams, useNavigate } from "react-router-dom";
//MaterialUI
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";

const DeleteGrant = () => {
  let api = useAxios();
  api.defaults.xsrfCookieName = "csrftoken";
  api.defaults.xsrfHeaderName = "X-CSRFToken";

  const navigate = useNavigate();
  const { id } = useParams();

  const handleSubmit = (e) => {
    e.preventDefault();
    api
      .delete("grants/delete/" + id)
      .then(function () {
        // handleClose();
        navigate("/grants");
        // window.location.reload();
      })
      .catch((error) => {
        if (error.response.status === 401) {
          alert("Authentication has expired! Please re-login");
          navigate("/logout");
        } else if (error.response.status === 403) {
          alert("You do not have permission to perform this action!");
          navigate("/grants");
        } else {
          alert("Something went wrong! Please logout and try again");
        }
      });
  };

  return (
    <Container component="main" maxWidth="sm">
      <Box
        display="flex"
        justifyContent="center"
        m={1}
        p={1}
        bgcolor="background.paper"
      >
        <Button
          variant="contained"
          color="secondary"
          type="submit"
          onClick={handleSubmit}
        >
          Press here to confirm delete
        </Button>
      </Box>
    </Container>
  );
};

export default DeleteGrant;
