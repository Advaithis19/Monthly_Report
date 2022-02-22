import React from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import useForm from "../../validation/signup/useForm";
import validate from "../../validation/signup/validateInfo";
import { trackPromise } from "react-promise-tracker";

import departments from "../../constants/departments";
import roles from "../../constants/roles";

// Bootstrap UI
import { Form } from "react-bootstrap";

// MUI
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

const SignUp = () => {
  const navigate = useNavigate();

  const submitForm = () => {
    let postData = new FormData();
    postData.append("email", values.email);
    postData.append("username", values.username);
    postData.append("password", values.password);
    postData.append("password2", values.password2);
    postData.append("first_name", values.first_name);
    postData.append("last_name", values.last_name);
    postData.append("is_teacher", values.is_teacher);
    postData.append("is_admin", values.is_admin);
    postData.append("is_superadmin", values.is_superadmin);
    postData.append("department", values.department);

    trackPromise(
      axios
        .post(`http://127.0.0.1:8000/api/users/create/`, postData)
        .then(() => {
          alert(
            "To complete the registration process, please activate your account through the link that has been sent to your mail....."
          );
          navigate("/login");
        })
        .catch((error) => {
          if (error.response.status === 400) {
            alert(error.response.data.non_field_errors[0]);
          }
        })
    );
  };

  const {
    handleChange,
    handleSubmit,
    values,
    errors,
    type,
    departmentSelect,
    handleRoleSelect,
  } = useForm(submitForm, validate);

  return (
    <Container
      maxWidth="sm"
      className="border-solid border-1 border-[#27447e] my-5 shadow-xl shadow-blue-500/50"
    >
      <Box mt={3} mb={3}>
        <Typography
          component="h1"
          variant="h5"
          gutterBottom
          className="text-center mb-4"
        >
          Sign up
        </Typography>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicRole">
            <FormControl fullWidth>
              <InputLabel id="role-select-label">Role</InputLabel>
              <Select
                labelId="role-select-label"
                value={type}
                label="Role"
                onChange={handleRoleSelect}
                inputProps={{ MenuProps: { disableScrollLock: true } }}
              >
                {roles.map((role) => {
                  return (
                    <MenuItem key={role.key} value={role.key}>
                      {role.value}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Form.Group>

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

          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <TextField
                  // basic
                  type="password"
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
            </Grid>
            <Grid item xs={12} md={6}>
              <Form.Group className="mb-3" controlId="formBasicPasswordConfirm">
                <TextField
                  // basic
                  type="password"
                  name="password2"
                  //mui
                  label="Confirm Password"
                  variant="outlined"
                  fullWidth
                  //to override onChange
                  onChange={handleChange}
                />
                <small className="text-danger">
                  {errors.password2 ? errors.password2 : <span></span>}
                </small>
              </Form.Group>
            </Grid>
          </Grid>

          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <Form.Group className="mb-3" controlId="formBasicUsername">
                <TextField
                  // basic
                  type="text"
                  name="username"
                  //mui
                  label="Username"
                  variant="outlined"
                  fullWidth
                  //to override onChange
                  onChange={handleChange}
                />
                <small className="text-danger">
                  {errors.username ? errors.username : <span></span>}
                </small>
              </Form.Group>
            </Grid>
            <Grid item xs={12} md={4}>
              <Form.Group className="mb-3" controlId="formBasicFirstname">
                <TextField
                  // basic
                  type="text"
                  name="first_name"
                  //mui
                  label="First Name"
                  variant="outlined"
                  fullWidth
                  //to override onChange
                  onChange={handleChange}
                />
                <small className="text-danger">
                  {errors.first_name ? errors.first_name : <span></span>}
                </small>
              </Form.Group>
            </Grid>
            <Grid item xs={12} md={4}>
              <Form.Group className="mb-3" controlId="formBasicLastname">
                <TextField
                  // basic
                  type="text"
                  name="last_name"
                  //mui
                  label="Last Name"
                  variant="outlined"
                  fullWidth
                  //to override onChange
                  onChange={handleChange}
                />
                <small className="text-danger">
                  {errors.last_name ? errors.last_name : <span></span>}
                </small>
              </Form.Group>
            </Grid>
          </Grid>

          {departmentSelect && (
            <Form.Group className="mb-3" controlId="formBasicDepartment">
              <FormControl fullWidth>
                <InputLabel id="department-select-label">Department</InputLabel>
                <Select
                  name="department"
                  labelId="department-select-label"
                  value={values.department}
                  label="Department"
                  onChange={handleChange}
                  inputProps={{ MenuProps: { disableScrollLock: true } }}
                >
                  {departments.map((department, index) => {
                    return (
                      <MenuItem key={index} value={department.short}>
                        {department.full}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Form.Group>
          )}

          <Button variant="contained" color="primary" type="submit" fullWidth>
            Sign Up
          </Button>
        </Form>
        <Grid container justifyContent="flex-end" className="mt-2">
          <Grid item>
            <Link to="/login" variant="body2">
              Already have an account? Sign in
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default SignUp;
