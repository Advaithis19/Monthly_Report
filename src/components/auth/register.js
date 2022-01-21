import React, { useState } from "react";
// import axiosInstance from "../../utils/axios";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
//MaterialUI
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
// import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const SignUp = () => {
  const departments = [
    {
      full: "Aerospace Engineering",
      short: "AE",
    },
    {
      full: "Biotechnology",
      short: "BT",
    },
    {
      full: "Chemical Engineering",
      short: "CE",
    },
    {
      full: "Civil Engineering",
      short: "CIV",
    },
    {
      full: "Computer Science and Engineering",
      short: "CSE",
    },
    {
      full: "Electrical and Electronics Engineering",
      short: "EEE",
    },
    {
      full: "Electronics and Communication Engineering",
      short: "ECE",
    },
    {
      full: "Electronics and Instrumentation Engineering",
      short: "EIE",
    },
    {
      full: "Industrial Engineering and Management",
      short: "IEM",
    },
    {
      full: "Information Science and Engineering",
      short: "ISE",
    },
    {
      full: "Master of Computer Applications",
      short: "MCA",
    },
    {
      full: "Mechanical Engineering",
      short: "ME",
    },
    {
      full: "Electronics and Telecommunication Engineering (Telecommunication Engineering)",
      short: "ETE",
    },
    {
      full: "Basic Sciences",
      short: "BSC",
    },
  ];

  const navigate = useNavigate();
  const initialFormData = Object.freeze({
    email: "",
    username: "",
    password: "",
    password2: "",
    first_name: "",
    last_name: "",
    is_teacher: true,
    is_admin: false,
    is_superadmin: false,
    department: "ISE",
  });

  const [formData, updateFormData] = useState(initialFormData);
  const [type, setType] = useState("teacher");
  const [department, setDepartment] = useState("ISE");
  const [departmentSelect, setDepartmentSelect] = useState(true);

  const handleChange = (e) => {
    if ([e.target.name] == "type_select") {
      setType(e.target.value);
      if ([e.target.value] == "super_admin") {
        updateFormData({
          ...formData,

          ["is_superadmin"]: true,
          ["is_teacher"]: false,
          ["is_admin"]: false,
        });
        setDepartmentSelect(false);
      } else if ([e.target.value] == "teacher") {
        updateFormData({
          ...formData,

          ["is_superadmin"]: false,
          ["is_teacher"]: true,
          ["is_admin"]: false,
        });
        setDepartmentSelect(true);
      } else {
        updateFormData({
          ...formData,

          ["is_superadmin"]: false,
          ["is_teacher"]: false,
          ["is_admin"]: true,
        });
        setDepartmentSelect(true);
      }
    } else if ([e.target.name] == "department_select") {
      setDepartment(e.target.value);
      updateFormData({
        ...formData,

        ["department"]: e.target.value,
      });
    } else {
      updateFormData({
        ...formData,
        // Trimming any whitespace
        [e.target.name]: e.target.value.trim(),
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(`http://127.0.0.1:8000/api/users/create/`, {
        email: formData.email,
        username: formData.username,
        password: formData.password,
        password2: formData.password2,
        first_name: formData.first_name,
        last_name: formData.last_name,
        is_teacher: formData.is_teacher,
        is_admin: formData.is_admin,
        is_superadmin: formData.is_superadmin,
        department: formData.department,
      })
      .then(() => {
        alert("Registration completed! Redirecting you to login page...");
        // alert(
        //   "To complete the registration process, please activate your account through the link that has been sent to your mail....."
        // );
        navigate("/login");
      })
      .catch((error) => {
        if (error.response.status === 400) {
          alert(error.response.data.non_field_errors[0]);
        }
      });
  };

  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}></Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Box sx={{ width: 500 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Select type of user
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={type}
                  label="Type of user"
                  name="type_select"
                  onChange={handleChange}
                >
                  <MenuItem value={"teacher"}>Teacher</MenuItem>
                  <MenuItem value={"admin"}>Admin/HoD</MenuItem>
                  <MenuItem value={"super_admin"}>Principal/Dean</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password2"
                label="Confirm Password"
                type="password"
                id="password2"
                autoComplete="confirm-password"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="first_name"
                label="First Name"
                id="first_name"
                autoComplete="first-name"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="last_name"
                label="Last Name"
                id="last_name"
                autoComplete="last-name"
                onChange={handleChange}
              />
            </Grid>
            {departmentSelect && (
              <Box sx={{ width: 500 }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Select Department
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={department}
                    label="Department"
                    name="department_select"
                    onChange={handleChange}
                  >
                    {departments.map((department) => (
                      <MenuItem key={department.short} value={department.short}>
                        {department.full}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            )}
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSubmit}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link to="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default SignUp;
