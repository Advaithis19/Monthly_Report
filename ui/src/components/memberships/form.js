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
          {type} Membership
        </Typography>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicMembership">
            <TextField
              // basic
              type="text"
              name="membership"
              value={values.membership}
              //mui
              label="Membership Details"
              variant="outlined"
              fullWidth
              multiline
              //hook form

              //to override onChange
              onChange={handleChange}
            />
            <small className="text-danger">
              {errors.membership ? errors.membership : <span></span>}
            </small>
          </Form.Group>

          <Grid container spacing={2}>
            <Grid item sm={12} md={6}>
              <Form.Group className="mb-3" controlId="formBasicAssociation">
                <TextField
                  // basic
                  type="text"
                  name="association"
                  value={values.association}
                  //mui
                  label="Association"
                  variant="outlined"
                  fullWidth
                  //hook form

                  //to override onChange
                  onChange={handleChange}
                />
                <small className="text-danger">
                  {errors.association ? errors.association : <span></span>}
                </small>
              </Form.Group>
            </Grid>
            <Grid item sm={12} md={6}>
              <Form.Group className="mb-3" controlId="formBasicTerm">
                <TextField
                  // basic
                  type="number"
                  name="term"
                  value={values.term}
                  //mui
                  label="Term (in years)"
                  variant="outlined"
                  fullWidth
                  //hook form

                  //to override onChange
                  onChange={handleChange}
                />
                <small className="text-danger">
                  {errors.term ? errors.term : <span></span>}
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
