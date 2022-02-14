import React from "react";
import { years } from "../../constants/years";

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
          {type} Grant
        </Typography>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicTitle">
            <TextField
              // basic
              type="text"
              name="title"
              value={values.title}
              //mui
              label="Grant Title"
              variant="outlined"
              fullWidth
              //to override onChange
              onChange={handleChange}
            />
            <small className="text-danger">
              {errors.title ? errors.title : <span></span>}
            </small>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicAgency">
            <TextField
              // basic
              type="text"
              name="agency"
              value={values.agency}
              //mui
              label="Agency"
              variant="outlined"
              fullWidth
              //to override onChange
              onChange={handleChange}
            />
            <small className="text-danger">
              {errors.agency ? errors.agency : <span></span>}
            </small>
          </Form.Group>

          <Grid container spacing={2}>
            <Grid item sm={12} md={8}>
              <Form.Group className="mb-3" controlId="formBasicAmount">
                <TextField
                  // basic
                  type="number"
                  name="sanc_amt"
                  value={values.sanc_amt}
                  //mui
                  label="Sanctioned Amount"
                  variant="outlined"
                  fullWidth
                  //to override onChange
                  onChange={handleChange}
                />
                <small className="text-danger">
                  {errors.sanc_amt ? errors.sanc_amt : <span></span>}
                </small>
              </Form.Group>
            </Grid>
            <Grid item sm={12} md={4}>
              <Form.Group className="mb-3" controlId="formBasicYear">
                <FormControl fullWidth>
                  <InputLabel id="year-select-label">Select Year</InputLabel>
                  <Select
                    // basic
                    name="year"
                    value={values.year}
                    onChange={handleChange}
                    // mui
                    labelId="year-select-label"
                    label="Select Year"
                    inputProps={{ MenuProps: { disableScrollLock: true } }}
                  >
                    {years.map((year) => {
                      return (
                        <MenuItem key={year} value={year}>
                          {year}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </Form.Group>
            </Grid>
          </Grid>

          <Form.Group className="mb-3" controlId="formBasicRemarks">
            <TextField
              // basic
              type="text"
              name="remarks"
              //mui
              label="Remarks"
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              onChange={handleChange}
            />
          </Form.Group>

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
