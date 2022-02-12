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
    title: Yup.string().required("Title is required"),
    venue: Yup.string().required("Venue is required"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  //https://gist.github.com/hagemann/382adfc57adbd5af078dc93feef01fe1
  function slugify(string) {
    const a =
      "àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;";
    const b =
      "aaaaaaaaaacccddeeeeeeeegghiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz------";
    const p = new RegExp(a.split("").join("|"), "g");

    return string
      .toString()
      .toLowerCase()
      .replace(/\s+/g, "-") // Replace spaces with -
      .replace(p, (c) => b.charAt(a.indexOf(c))) // Replace special characters
      .replace(/&/g, "-and-") // Replace & with 'and'
      .replace(/[^\w\-]+/g, "") // Remove all non-word characters
      .replace(/\-\-+/g, "-") // Replace multiple - with single -
      .replace(/^-+/, "") // Trim - from start of text
      .replace(/-+$/, ""); // Trim - from end of text
  }

  // get functions to build form with useForm() hook
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;

  const handleChange = (e) => {
    if ([e.target.name] == "title") {
      updateFormData({
        ...formData,
        [e.target.name]: e.target.value,
        ["slug"]: slugify(e.target.value.trim()),
      });
    } else {
      updateFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
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
          {type} Event
        </Typography>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3" controlId="formBasicTitle">
            <TextField
              // basic
              type="text"
              name="title"
              value={formData.title}
              //mui
              label="Event Title"
              variant="outlined"
              fullWidth
              //hook form
              {...register("title")}
              //to override onChange
              onChange={handleChange}
            />
            <small className="text-danger">
              {errors.title ? errors.title.message : <span></span>}
            </small>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicVenue">
            <TextField
              // basic
              type="text"
              name="venue"
              value={formData.venue}
              //mui
              label="Venue"
              variant="outlined"
              fullWidth
              multiline
              //hook form
              {...register("venue")}
              //to override onChange
              onChange={handleChange}
            />
            <small className="text-danger">
              {errors.venue ? errors.venue.message : <span></span>}
            </small>
          </Form.Group>

          <Grid container spacing={2}>
            <Grid item sm={12} md={4}>
              <Form.Group className="mb-3" controlId="formBasicStudents">
                <TextField
                  // basic
                  type="text"
                  name="n_stud"
                  value={formData.n_stud}
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
                  type="text"
                  name="n_fac"
                  value={formData.n_fac}
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
                  type="text"
                  name="n_ind"
                  value={formData.n_ind}
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
                  label="Date of Event"
                  value={date}
                  onChange={handleDateChange}
                  renderInput={(params) => <TextField {...params} />}
                />
              </FormControl>
            </Grid>
            <Grid item xs={8}>
              <Form.Group className="mb-3" controlId="formBasicFacultyInvolved">
                <FormControl fullWidth>
                  <InputLabel id="u_id-select-label">
                    Faculty Involved
                  </InputLabel>
                  <Select
                    // basic
                    name="u_id"
                    value={facultySelected}
                    {...register("u_id")}
                    //overriding onChange
                    onChange={handleFacultySelect}
                    // mui
                    multiple
                    labelId="u_id-select-label"
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
                          <Checkbox
                            checked={facultySelected.indexOf(user) > -1}
                          />
                          <ListItemText primary={user.name} />
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
                <small className="text-danger">
                  {errors.u_id ? errors.u_id.message : <span></span>}
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
