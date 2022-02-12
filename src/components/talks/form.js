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
import DatePicker from "@mui/lab/DatePicker";

const CustomForm = ({
  formData,
  updateFormData,
  date,
  setDate,
  users,
  onSubmit,
  type,
}) => {
  // form validation rules
  const validationSchema = Yup.object().shape({
    topic: Yup.string().required("Topic is required"),
    venue: Yup.string().required("Resource Person is required"),
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
    if ([e.target.name] == "topic") {
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

  const handleFacultySelect = (e) => {
    updateFormData({
      ...formData,
      ["f_id"]: e.target.value,
    });
  };

  const handleDateChange = (e) => {
    setDate(e);
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
          {type} Talk
        </Typography>
        <Form.Group className="mb-3" controlId="formBasicTopic">
          <TextField
            // basic
            type="text"
            name="topic"
            value={formData.topic}
            //mui
            label="Talk Topic"
            variant="outlined"
            fullWidth
            //hook form
            {...register("topic")}
            //to override onChange
            onChange={handleChange}
          />
          <small className="text-danger">
            {errors.topic ? errors.topic.message : <span></span>}
          </small>
        </Form.Group>
        <Grid container spacing={2}>
          <Grid item sm={12} md={6}>
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
                //hook form
                {...register("venue")}
                //to override onChange
                onChange={handleChange}
              />
              <small className="text-danger">
                {errors.venue ? errors.venue.message : <span></span>}
              </small>
            </Form.Group>
          </Grid>
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
        </Grid>
        <Form onSubmit={handleSubmit(onSubmit)}>
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
                  //hook form
                  {...register("n_stud")}
                  //to override onChange
                  onChange={handleChange}
                />
                <small className="text-danger">
                  {errors.n_stud ? errors.n_stud.message : <span></span>}
                </small>
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
                  //hook form
                  {...register("n_fac")}
                  //to override onChange
                  onChange={handleChange}
                />
                <small className="text-danger">
                  {errors.n_fac ? errors.n_fac.message : <span></span>}
                </small>
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
                  //hook form
                  {...register("n_ind")}
                  //to override onChange
                  onChange={handleChange}
                />
                <small className="text-danger">
                  {errors.n_ind ? errors.n_ind.message : <span></span>}
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
                value={formData.f_id}
                {...register("f_id")}
                //overriding onChange
                onChange={handleFacultySelect}
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
