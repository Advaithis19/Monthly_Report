import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";
import AuthContext from "../../context/AuthContext";

// import Alert from "../alert";
// import { render } from "@testing-library/react";

// Bootstrap UI
import { Form } from "react-bootstrap";

// MUI
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

//yup
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

const SignIn = () => {
  //context api consumption - declaration
  let { setAuthTokens } = useContext(AuthContext);

  // form validation rules
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .matches(
        /[a-zA-Z]+[0-9]*[a-zA-Z]*@rvce\.edu\.in/i,
        "Please enter RVCE email address"
      )
      .required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  // get functions to build form with useForm() hook
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;

  const navigate = useNavigate();
  const initialFormData = Object.freeze({
    email: "",
    password: "",
  });

  const [formData, updateFormData] = useState(initialFormData);

  const HOST_SERVER_URL = "http://127.0.0.1:8000/";

  const handleChange = (e) => {
    updateFormData({
      ...formData,
      [e.target.name]: e.target.value.trim(),
    });
  };

  let goToRegister = () => {
    navigate("/register");
  };

  const onSubmit = async (e) => {
    let postData = new FormData();
    postData.append("email", formData.email);
    postData.append("password", formData.password);

    axios
      .post(`http://127.0.0.1:8000/api/token/`, postData)
      .then((response) => {
        localStorage.setItem("authTokens", JSON.stringify(response.data));
        setAuthTokens(response.data);
        navigate("/grants");
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

  return (
    <Container maxWidth="sm">
      <Box mt={3} mb={3}>
        <Typography component="h1" variant="h5" gutterBottom>
          Sign in
        </Typography>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <TextField
              // basic
              type="email"
              name="email"
              //mui
              label="Email address"
              variant="outlined"
              fullWidth
              //hook form
              {...register("email")}
              //to override onChange
              onChange={handleChange}
            />
            {errors.email?.message}
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
              //hook form
              {...register("password")}
              //to override onChange
              onChange={handleChange}
            />
            {errors.password?.message}
          </Form.Group>

          <Button variant="contained" color="primary" type="submit" fullWidth>
            Sign In
          </Button>
          <Grid container>
            <Grid item></Grid>
          </Grid>
          <Grid container className="mt-2">
            <Grid item xs>
              <Button variant="outlined" style={{ height: 40 }} color="primary">
                <a
                  href={HOST_SERVER_URL + "api/users/password_reset/"}
                  target="_blank"
                >
                  Forgot password?
                </a>
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="outlined"
                style={{ height: 40 }}
                color="primary"
                onClick={goToRegister}
              >
                Don't have an account? Sign up
              </Button>
            </Grid>
          </Grid>
        </Form>
      </Box>
    </Container>
  );
};

export default SignIn;
