import React from "react";
import { useForm } from "react-hook-form";
import semester_options from "../../constants/semesters";

//yup
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

// Bootstrap UI
import { Form } from "react-bootstrap";

// MUI
import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import ListItemText from "@mui/material/ListItemText";

const CustomForm = ({
  values,
  handleChange,
  users,
  handleSubmit,
  type,
  errors,
}) => {
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
          className="text-3xl font-semibold mb-3 text-center"
        >
          {type} Industrial-visit
        </Typography>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicPurpose">
            <TextField
              // basic
              type="text"
              name="purpose"
              value={values.purpose}
              //mui
              label="Purpose of Visit"
              variant="outlined"
              fullWidth
              //hook form

              //to override onChange
              onChange={handleChange}
            />
            <small className="text-danger">
              {errors.purpose ? errors.purpose : <span></span>}
            </small>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicIndustry">
            <TextField
              // basic
              type="text"
              name="industry"
              value={values.industry}
              //mui
              label="Industry Visited"
              variant="outlined"
              fullWidth
              //hook form

              //to override onChange
              onChange={handleChange}
            />
            <small className="text-danger">
              {errors.industry ? errors.industry : <span></span>}
            </small>
          </Form.Group>

          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Form.Group className="mb-3" controlId="formBasicSemester">
                <FormControl fullWidth>
                  <InputLabel id="semester-select-label">Semester</InputLabel>
                  <Select
                    // basic
                    name="semester"
                    value={values.semester}
                    onChange={handleChange}
                    // mui
                    labelId="semester-select-label"
                    label="Semester"
                    inputProps={{ MenuProps: { disableScrollLock: true } }}
                  >
                    {semester_options.map((semester, index) => {
                      return (
                        <MenuItem key={index} value={semester.short}>
                          {semester.full}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </Form.Group>
            </Grid>
            <Grid item xs={12} md={6}>
              <Form.Group className="mb-3" controlId="formBasicStudents">
                <TextField
                  // basic
                  type="number"
                  name="n_stud"
                  value={values.n_stud}
                  //mui
                  label="No. of Students"
                  variant="outlined"
                  fullWidth
                  //hook form

                  //to override onChange
                  onChange={handleChange}
                />
                <small className="text-danger">
                  {errors.n_stud ? errors.n_stud : <span></span>}
                </small>
              </Form.Group>
            </Grid>
          </Grid>

          <Form.Group className="mb-3" controlId="formBasicFacultyInvolved">
            <FormControl fullWidth>
              <InputLabel id="f_id-select-label">Faculty Involved</InputLabel>
              <Select
                // basic
                name="f_id"
                value={values.f_id}
                //overriding onChange
                onChange={handleChange}
                // mui
                multiple
                labelId="f_id-select-label"
                label="Faculty Involved"
                renderValue={(selected) => {
                  let selectedItems = selected.map(
                    (selectedObj) => selectedObj.name
                  );
                  return selectedItems.join(", ");
                }}
                inputProps={{ MenuProps: { disableScrollLock: true } }}
              >
                {users.map((user) => {
                  return (
                    <MenuItem key={user.id} value={user}>
                      <Checkbox checked={values.f_id.indexOf(user) > -1} />
                      <ListItemText primary={user.name} />
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            <small className="text-danger">
              {errors.f_id ? errors.f_id : <span></span>}
            </small>
          </Form.Group>

          <Button variant="contained" color="primary" type="submit" fullWidth>
            {type}
          </Button>
        </Form>
      </Box>
    </Container>
  );
};

export default CustomForm;
