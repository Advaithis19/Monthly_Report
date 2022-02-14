import React from "react";

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
          {type} Lecture
        </Typography>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicTopic">
            <TextField
              // basic
              type="text"
              name="topic"
              value={values.topic}
              //mui
              label="Lecture Topic"
              variant="outlined"
              fullWidth
              //to override onChange
              onChange={handleChange}
            />
            <small className="text-danger">
              {errors.topic ? errors.topic : <span></span>}
            </small>
          </Form.Group>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Form.Group className="mb-3" controlId="formBasicResourcePerson">
                <TextField
                  // basic
                  type="text"
                  name="res_person"
                  value={values.res_person}
                  //mui
                  label="Resource Person"
                  variant="outlined"
                  fullWidth
                  //to override onChange
                  onChange={handleChange}
                />
                <small className="text-danger">
                  {errors.res_person ? errors.res_person : <span></span>}
                </small>
              </Form.Group>
            </Grid>
            <Grid item xs={12} md={6}>
              <Form.Group className="mb-3" controlId="formBasicOrganisation">
                <TextField
                  // basic
                  type="text"
                  name="organisation"
                  value={values.organisation}
                  //mui
                  label="Organisation"
                  variant="outlined"
                  fullWidth
                  //to override onChange
                  onChange={handleChange}
                />
                <small className="text-danger">
                  {errors.organisation ? errors.organisation : <span></span>}
                </small>
              </Form.Group>
            </Grid>
            <Grid item xs={12} md={4}>
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
            <Grid item xs={12} md={4}>
              <Form.Group className="mb-3" controlId="formBasicFaculty">
                <TextField
                  // basic
                  type="number"
                  name="n_fac"
                  value={values.n_fac}
                  //mui
                  label="No. of Faculty"
                  variant="outlined"
                  fullWidth
                  //hook form

                  //to override onChange
                  onChange={handleChange}
                />
                <small className="text-danger">
                  {errors.n_fac ? errors.n_fac : <span></span>}
                </small>
              </Form.Group>
            </Grid>
            <Grid item xs={12} md={4}>
              <Form.Group className="mb-3" controlId="formBasicIndustry">
                <TextField
                  // basic
                  type="number"
                  name="n_ind"
                  value={values.n_ind}
                  //mui
                  label="No. from Industry"
                  variant="outlined"
                  fullWidth
                  //to override onChange
                  onChange={handleChange}
                />
                <small className="text-danger">
                  {errors.n_ind ? errors.n_ind : <span></span>}
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
                labelId="f_id-select-label"
                label="Faculty Involved"
                inputProps={{ MenuProps: { disableScrollLock: true } }}
              >
                {users.map((user) => {
                  return (
                    <MenuItem key={user.value} value={user.value}>
                      {user.label}
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
