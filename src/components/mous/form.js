import React from "react";
import { useForm } from "react-hook-form";

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
import DatePicker from "@mui/lab/DatePicker";

const CustomForm = ({
  formData,
  updateFormData,
  date,
  setDate,
  facultySelected,
  setFacultySelected,
  users,
  onSubmit,
  type,
}) => {
  // form validation rules
  const validationSchema = Yup.object().shape({
    organisation: Yup.string().required("Organisation is required"),
    mod_col: Yup.string().required("Mode of Collaboration field is required"),
    validity: Yup.string().required("Validity is required"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  // get functions to build form with useForm() hook
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;

  const handleChange = (e) => {
    updateFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleDateChange = (e) => {
    setDate(e);
  };

  const handleFacultySelect = (e) => {
    const {
      target: { value },
    } = e;
    setFacultySelected(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

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
          {type} MoU
        </Typography>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3" controlId="formBasicorganisation">
            <TextField
              // basic
              type="text"
              name="organisation"
              value={formData.organisation}
              //mui
              label="MoU organisation"
              variant="outlined"
              fullWidth
              //hook form
              {...register("organisation")}
              //to override onChange
              onChange={handleChange}
            />
            <small className="text-danger">
              {errors.organisation ? (
                errors.organisation.message
              ) : (
                <span></span>
              )}
            </small>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicModeOfCollaboration">
            <TextField
              // basic
              type="text"
              name="mod_col"
              value={formData.mod_col}
              //mui
              label="Mode Of Collaboration"
              variant="outlined"
              fullWidth
              //hook form
              {...register("mod_col")}
              //to override onChange
              onChange={handleChange}
            />
            <small className="text-danger">
              {errors.mod_col ? errors.mod_col.message : <span></span>}
            </small>
          </Form.Group>

          <Grid container spacing={2}>
            <Grid item xs={4}>
              <FormControl>
                <DatePicker
                  label="Date of procurement"
                  value={date}
                  onChange={handleDateChange}
                  renderInput={(params) => <TextField {...params} />}
                />
              </FormControl>
            </Grid>
            <Grid item sm={12} md={8}>
              <Form.Group className="mb-3" controlId="formBasicValidity">
                <TextField
                  // basic
                  type="text"
                  name="validity"
                  value={formData.validity}
                  //mui
                  label="Validity (in years)"
                  variant="outlined"
                  fullWidth
                  //hook form
                  {...register("validity")}
                  //to override onChange
                  onChange={handleChange}
                />
                <small className="text-danger">
                  {errors.validity ? errors.validity.message : <span></span>}
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
                value={facultySelected}
                {...register("f_id")}
                //overriding onChange
                onChange={handleFacultySelect}
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
                      <Checkbox checked={facultySelected.indexOf(user) > -1} />
                      <ListItemText primary={user.name} />
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            <small className="text-danger">
              {errors.f_id ? errors.f_id.message : <span></span>}
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
