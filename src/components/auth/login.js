import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";

// import Alert from "../alert";
// import { render } from "@testing-library/react";

// Bootstrap UI
import { Form } from "react-bootstrap";

// MUI
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

//yup
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

const SignIn = () => {
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

  const handleChange = (e) => {
    updateFormData({
      ...formData,
      [e.target.name]: e.target.value.trim(),
    });
  };

  //for password reset submission
  // const handlePasswordResetSubmit = async () => {
  //   axios
  //     .post(`http://127.0.0.1:8000/api/users/password_reset/`, {
  //       email: formData.email,
  //     })
  //     .then(() => {
  //       console.log("done");
  //     })
  //     .catch((err) => {
  //       console.log("error", err);
  //     });
  // };

  const onSubmit = async (e) => {
    let postData = new FormData();
    postData.append("email", formData.email);
    postData.append("password", formData.password);

    axios
      .post(`http://127.0.0.1:8000/api/token/`, postData)
      .then((response) => {
        localStorage.setItem("authTokens", JSON.stringify(response.data));
        navigate("/grants");
        // window.location.reload();
      })
      .catch((err) => {
        alert("Something went wrong!");

        //for account activation
        // alert(
        //   "Something went wrong! Perhaps entered details are wrong....have you tried activating your account?"
        // );
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
            <Grid item>
              <Link to="/register" variant="body2">
                Don't have an account? Sign up
              </Link>
            </Grid>
          </Grid>
        </Form>
      </Box>
    </Container>
  );
};

export default SignIn;
