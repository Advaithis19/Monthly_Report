import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

//MaterialUI
// import Avatar from "@material-ui/core/Avatar";
// import Button from "@material-ui/core/Button";
// import CssBaseline from "@material-ui/core/CssBaseline";
// import TextField from "@material-ui/core/TextField";
// import FormControlLabel from "@material-ui/core/FormControlLabel";
// import Checkbox from "@material-ui/core/Checkbox";
// import Link from "@material-ui/core/Link";
// import Grid from "@material-ui/core/Grid";
// import Typography from "@material-ui/core/Typography";
// import { makeStyles } from "@material-ui/core/styles";
// import Container from "@material-ui/core/Container";

// import Alert from "../alert";
// import { render } from "@testing-library/react";

// const useStyles = makeStyles((theme) => ({
//   paper: {
//     marginTop: theme.spacing(8),
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//   },
//   avatar: {
//     margin: theme.spacing(1),
//     backgroundColor: theme.palette.secondary.main,
//   },
//   form: {
//     width: "100%", // Fix IE 11 issue.
//     marginTop: theme.spacing(1),
//   },
//   submit: {
//     margin: theme.spacing(3, 0, 2),
//   },
// }));

const SignIn = () => {
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    let postData = new FormData();
    postData.append("email", formData.email);
    postData.append("password", formData.password);

    axios
      .post(`http://127.0.0.1:8000/api/token/`, postData)
      .then((response) => {
        localStorage.setItem("authTokens", JSON.stringify(response.data));
        navigate("/grants");
        window.location.reload();
      })
      .catch((err) => {
        alert("Something went wrong!");

        //for account activation
        // alert(
        //   "Something went wrong! Perhaps entered details are wrong....have you tried activating your account?"
        // );
      });
  };

  // const classes = useStyles();

  return (
    // <Container component="main" maxWidth="xs">
    //   <CssBaseline />
    //   <div className={classes.paper}>
    //     <Avatar className={classes.avatar}></Avatar>
    //     <Typography component="h1" variant="h5">
    //       Sign in
    //     </Typography>
    //     <form className={classes.form} noValidate>
    //       <TextField
    //         variant="outlined"
    //         margin="normal"
    //         required
    //         fullWidth
    //         id="email"
    //         label="Email Address"
    //         name="email"
    //         autoComplete="email"
    //         autoFocus
    //         onChange={handleChange}
    //       />
    //       <TextField
    //         variant="outlined"
    //         margin="normal"
    //         required
    //         fullWidth
    //         name="password"
    //         label="Password"
    //         type="password"
    //         id="password"
    //         autoComplete="current-password"
    //         onChange={handleChange}
    //       />
    //       <FormControlLabel
    //         control={<Checkbox value="remember" color="primary" />}
    //         label="Remember me"
    //       />
    //       <Button
    //         type="submit"
    //         fullWidth
    //         variant="contained"
    //         color="primary"
    //         className={classes.submit}
    //         onClick={handleSubmit}
    //       >
    //         Sign In
    //       </Button>
    //       <Grid container>
    //         {/* for password reset submission */}
    //         {/* <Grid item xs>
    //           <p onClick={handlePasswordResetSubmit}>Forgot password?</p>
    //         </Grid> */}
    //         <Grid item>
    //           <Link to="/register" variant="body2">
    //             {"Don't have an account? Sign Up"}
    //           </Link>
    //         </Grid>
    //       </Grid>
    //     </form>
    //   </div>
    // </Container>

    <div>Hi this is the login route</div>
  );
};

export default SignIn;
