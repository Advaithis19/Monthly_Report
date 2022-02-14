import React from "react";
import status_options from "../../constants/statusOptions";

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
          {type} Proposal
        </Typography>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicTitle">
            <TextField
              // basic
              type="text"
              name="title"
              value={values.title}
              //mui
              label="Proposal Title"
              variant="outlined"
              fullWidth
              //to override onChange
              onChange={handleChange}
            />
            <small className="text-danger">
              {errors.title ? errors.title : <span></span>}
            </small>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicSubmitted_To">
            <TextField
              // basic
              type="text"
              name="submitted_to"
              value={values.submitted_to}
              //mui
              label="Submitted to"
              variant="outlined"
              fullWidth
              //to override onChange
              onChange={handleChange}
            />
            <small className="text-danger">
              {errors.submitted_to ? errors.submitted_to : <span></span>}
            </small>
          </Form.Group>

          <Grid container spacing={2}>
            <Grid item sm={12} md={8}>
              <Form.Group className="mb-3" controlId="formBasicAmount">
                <TextField
                  // basic
                  type="number"
                  name="budg_amt"
                  value={values.budg_amt}
                  //mui
                  label="Budgetted Amount"
                  variant="outlined"
                  fullWidth
                  //to override onChange
                  onChange={handleChange}
                />
                <small className="text-danger">
                  {errors.budg_amt ? errors.budg_amt : <span></span>}
                </small>
              </Form.Group>
            </Grid>
            <Grid item sm={12} md={4}>
              <Form.Group className="mb-3" controlId="formBasicStatus">
                <FormControl fullWidth>
                  <InputLabel id="status-select-label">Status</InputLabel>
                  <Select
                    // basic
                    name="status"
                    value={values.status}
                    onChange={handleChange}
                    // mui
                    labelId="status-select-label"
                    label="Status"
                    inputProps={{ MenuProps: { disableScrollLock: true } }}
                  >
                    {status_options.map((status, index) => {
                      return (
                        <MenuItem key={index} value={status.short}>
                          {status.full}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </Form.Group>
            </Grid>
          </Grid>

          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Form.Group
                className="mb-3"
                controlId="formBasicPrincipleInvestigator"
              >
                <FormControl fullWidth>
                  <InputLabel id="pi-select-label">
                    Principal Investigator
                  </InputLabel>
                  <Select
                    // basic
                    name="PI"
                    value={values.PI}
                    //overriding onChange
                    onChange={handleChange}
                    // mui
                    labelId="pi-select-label"
                    label="Principal Investigator"
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
                  {errors.PI ? errors.PI : <span></span>}
                </small>
              </Form.Group>
            </Grid>
            <Grid item xs={12} md={6}>
              <Form.Group
                className="mb-3"
                controlId="formBasicCoPrincipleInvestigator"
              >
                <FormControl fullWidth>
                  <InputLabel id="co_pi-select-label">
                    Co-Principal Investigator
                  </InputLabel>
                  <Select
                    // basic
                    name="CO_PI"
                    value={values.CO_PI}
                    //overriding onChange
                    onChange={handleChange}
                    // mui
                    labelId="co_pi-select-label"
                    label="Co-Principal Investigator"
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
                  {errors.CO_PI ? errors.CO_PI : <span></span>}
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
