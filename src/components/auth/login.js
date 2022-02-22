import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import useForm from "../../validation/login/useForm";
import validate from "../../validation/login/validateInfo";

import AuthContext from "../../context/AuthContext";

// Bootstrap UI
import { Form } from "react-bootstrap";

// MUI
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

const SignIn = () => {
  //context api consumption - declaration
  let { setAuthTokens } = useContext(AuthContext);

  const HOST_SERVER_URL = "http://127.0.0.1:8000/";

  const navigate = useNavigate();

  const submitForm = async (e) => {
    let postData = new FormData();
    postData.append("email", values.email);
    postData.append("password", values.password);

    axios
      .post(`http://127.0.0.1:8000/api/token/`, postData)
      .then((response) => {
        localStorage.setItem("authTokens", JSON.stringify(response.data));
        setAuthTokens(response.data);
        navigate("/home");
      })
      .catch((error) => {
        if (error.response.status === 401) {
          alert(
            "Something went wrong! Entered details may be incorrect... Have you tried activating your account?"
          );
        } else {
          alert("Something went wrong!");
        }
      });
  };

  const { handleChange, handleSubmit, values, errors } = useForm(
    submitForm,
    validate
  );

  return (
    <Container
      maxWidth="sm"
      className="border-solid border-1 border-[#27447e] my-5 shadow-xl shadow-blue-500/50"
      color="default"
    >
      <Box mt={3} mb={3}>
        <Typography
          component="h1"
          variant="h5"
          gutterBottom
          className="text-center mb-4"
        >
          Sign in
        </Typography>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <TextField
              // basic
              type="email"
              name="email"
              //mui
              label="Email address"
              variant="outlined"
              fullWidth
              //to override onChange
              onChange={handleChange}
            />
            <small className="text-danger">
              {errors.email ? errors.email : <span></span>}
            </small>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <TextField
              // basic
              type="password"
              onChange={handleChange}
              name="password"
              //mui
              label="Password"
              variant="outlined"
              fullWidth
              //to override onChange
              onChange={handleChange}
            />
            <small className="text-danger">
              {errors.password ? errors.password : <span></span>}
            </small>
          </Form.Group>

          <Button variant="contained" color="primary" type="submit" fullWidth>
            Sign In
          </Button>
        </Form>
        <Grid container className="mt-3">
          <Grid item xs={6} className="text-left">
            <a
              href={HOST_SERVER_URL + "api/users/password_reset/"}
              target="_blank"
            >
              Forgot password?
            </a>
          </Grid>
          <Grid item xs={6} className="text-right">
            <Link to="/register">Don't have an account? Sign up</Link>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default SignIn;
