import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";

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
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

//yup
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

const SignUp = () => {
  // form validation rules
  const validationSchema = Yup.object().shape({
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters"),
    password2: Yup.string()
      .required("Confirm Password is required")
      .oneOf([Yup.ref("password")], "Passwords must match"),
    email: Yup.string()
      .matches(
        /[a-zA-Z]+[0-9]*[a-zA-Z]*@rvce\.edu\.in/i,
        "Please enter RVCE email address"
      )
      .required("Email is required"),
    username: Yup.string()
      .required("Username is required")
      .max(20, "Password must be within 20 characters"),
    first_name: Yup.string()
      .required("First name is required")
      .max(20, "Password must be within 20 characters"),
    last_name: Yup.string()
      .required("Last name is required")
      .max(20, "Password must be within 20 characters"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  // get functions to build form with useForm() hook
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;

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
    updateFormData({
      ...formData,
      // Trimming any whitespace
      [e.target.name]: e.target.value.trim(),
    });
  };

  const handleRoleSelect = (e) => {
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
  };

  const handleDepartmentSelect = (e) => {
    setDepartment(e.target.value);
    updateFormData({
      ...formData,

      ["department"]: e.target.value,
    });
  };

  const onSubmit = () => {
    let postData = new FormData();
    postData.append("email", formData.email);
    postData.append("username", formData.username);
    postData.append("password", formData.password);
    postData.append("password2", formData.password2);
    postData.append("first_name", formData.first_name);
    postData.append("last_name", formData.last_name);
    postData.append("is_teacher", formData.is_teacher);
    postData.append("is_admin", formData.is_admin);
    postData.append("is_superadmin", formData.is_superadmin);
    postData.append("department", formData.department);

    axios
      .post(`http://127.0.0.1:8000/api/users/create/`, postData)
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

  return (
    <Container maxWidth="sm">
      <Box mt={3} mb={3}>
        <Typography component="h1" variant="h5" gutterBottom>
          Sign up
        </Typography>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3" controlId="formBasicRole">
            <FormControl fullWidth>
              <InputLabel id="role-select-label">Role</InputLabel>
              <Select
                labelId="role-select-label"
                value={type}
                label="Role"
                onChange={handleRoleSelect}
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
              //hook form
              {...register("email")}
              //to override onChange
              onChange={handleChange}
            />
            {errors.email?.message}
          </Form.Group>

          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
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
            </Grid>
            <Grid item xs={12} md={6}>
              <Form.Group className="mb-3" controlId="formBasicPasswordConfirm">
                <TextField
                  // basic
                  type="password"
                  onChange={handleChange}
                  name="password2"
                  //mui
                  label="Confirm Password"
                  variant="outlined"
                  fullWidth
                  //hook form
                  {...register("password2")}
                  //to override onChange
                  onChange={handleChange}
                />
                {errors.password2?.message}
              </Form.Group>
            </Grid>
          </Grid>

          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <Form.Group className="mb-3" controlId="formBasicUsername">
                <TextField
                  // basic
                  type="text"
                  onChange={handleChange}
                  name="username"
                  //mui
                  label="Username"
                  variant="outlined"
                  fullWidth
                  //hook form
                  {...register("username")}
                  //to override onChange
                  onChange={handleChange}
                />
                {errors.username?.message}
              </Form.Group>
            </Grid>
            <Grid item xs={12} md={4}>
              <Form.Group className="mb-3" controlId="formBasicFirstname">
                <TextField
                  // basic
                  type="text"
                  onChange={handleChange}
                  name="first_name"
                  //mui
                  label="First Name"
                  variant="outlined"
                  fullWidth
                  //hook form
                  {...register("first_name")}
                  //to override onChange
                  onChange={handleChange}
                />
                {errors.first_name?.message}
              </Form.Group>
            </Grid>
            <Grid item xs={12} md={4}>
              <Form.Group className="mb-3" controlId="formBasicLastname">
                <TextField
                  // basic
                  type="text"
                  onChange={handleChange}
                  name="last_name"
                  //mui
                  label="Last Name"
                  variant="outlined"
                  fullWidth
                  //hook form
                  {...register("last_name")}
                  //to override onChange
                  onChange={handleChange}
                />
                {errors.last_name?.message}
              </Form.Group>
            </Grid>
          </Grid>

          {departmentSelect && (
            <Form.Group className="mb-3" controlId="formBasicDepartment">
              <FormControl fullWidth>
                <InputLabel id="department-select-label">Department</InputLabel>
                <Select
                  labelId="department-select-label"
                  value={department}
                  label="Department"
                  onChange={handleDepartmentSelect}
                >
                  {departments.map((department) => {
                    return (
                      <MenuItem key={department.short} value={department.short}>
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
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link to="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Form>
      </Box>
    </Container>
  );
};

export default SignUp;
