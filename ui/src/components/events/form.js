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
import Checkbox from "@mui/material/Checkbox";
import ListItemText from "@mui/material/ListItemText";
import DatePicker from "@mui/lab/DatePicker";

const CustomForm = ({
  values,
  handleChange,
  users,
  handleSubmit,
  errors,
  type,
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
          {type} Event
        </Typography>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicTitle">
            <TextField
              // basic
              type="text"
              name="title"
              value={values.title}
              //mui
              label="Event Title"
              variant="outlined"
              fullWidth
              //hook form

              //to override onChange
              onChange={handleChange}
            />
            <small className="text-danger">
              {errors.title ? errors.title : <span></span>}
            </small>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicVenue">
            <TextField
              // basic
              type="text"
              name="venue"
              value={values.venue}
              //mui
              label="Venue"
              variant="outlined"
              fullWidth
              //hook form

              //to override onChange
              onChange={handleChange}
            />
            <small className="text-danger">
              {errors.venue ? errors.venue : <span></span>}
            </small>
          </Form.Group>

          <Grid container spacing={2}>
            <Grid item sm={12} md={4}>
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
                  onChange={handleChange}
                />
              </Form.Group>
            </Grid>
            <Grid item sm={12} md={4}>
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
                  onChange={handleChange}
                />
              </Form.Group>
            </Grid>

            <Grid item sm={12} md={4}>
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
                  onChange={handleChange}
                />
              </Form.Group>
            </Grid>
          </Grid>

          <Grid container spacing={2}>
            <Grid item xs={4}>
              <FormControl>
                <DatePicker
                  name="date"
                  label="Date of Event"
                  value={values.date}
                  onChange={handleChange}
                  renderInput={(params) => <TextField {...params} />}
                />
              </FormControl>
            </Grid>
            <Grid item xs={8}>
              <Form.Group className="mb-3" controlId="formBasicFacultyInvolved">
                <FormControl fullWidth>
                  <InputLabel id="f_id-select-label">
                    Faculty Involved
                  </InputLabel>
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
            </Grid>
          </Grid>

          <Button variant="contained" color="primary" type="submit" fullWidth>
            {type}
          </Button>
        </Form>
      </Box>
    </Container>
  );
};

export default CustomForm;
