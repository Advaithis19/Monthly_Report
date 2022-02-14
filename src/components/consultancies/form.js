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
          {type} Consultancy
        </Typography>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicTitle">
            <TextField
              // basic
              type="text"
              name="title"
              value={values.title}
              //mui
              label="Consultancy Title"
              variant="outlined"
              fullWidth
              //to override onChange
              onChange={handleChange}
            />
            <small className="text-danger">
              {errors.title ? errors.title : <span></span>}
            </small>
          </Form.Group>

          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Form.Group className="mb-3" controlId="formBasicFundingAgency">
                <TextField
                  // basic
                  type="text"
                  name="fund_agency"
                  value={values.fund_agency}
                  //mui
                  label="Funding Agency"
                  variant="outlined"
                  fullWidth
                  multiline
                  //hook form

                  //to override onChange
                  onChange={handleChange}
                />
                <small className="text-danger">
                  {errors.fund_agency ? errors.fund_agency : <span></span>}
                </small>
              </Form.Group>
            </Grid>
            <Grid item xs={12} md={6}>
              <Form.Group className="mb-3" controlId="formBasicAmount">
                <TextField
                  // basic
                  type="number"
                  name="rec_amt"
                  value={values.rec_amt}
                  //mui
                  label="Received Amount"
                  variant="outlined"
                  fullWidth
                  //hook form

                  //to override onChange
                  onChange={handleChange}
                />
                <small className="text-danger">
                  {errors.rec_amt ? errors.rec_amt : <span></span>}
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
