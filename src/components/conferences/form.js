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

const CustomForm = ({ formData, updateFormData, users, onSubmit, type }) => {
  // form validation rules
  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    conference: Yup.string().required("Conference is required"),
    volume: Yup.string().required("Volume # is required"),
    issue: Yup.string().required("Issue # is required"),
    n_page: Yup.string().required("Page # is required"),
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

  const handleFacultySelect = (e) => {
    updateFormData({
      ...formData,
      ["f_id"]: e.target.value,
    });
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
          {type} Conference
        </Typography>

        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3" controlId="formBasicTitle">
            <TextField
              // basic
              type="text"
              name="title"
              value={formData.title}
              //mui
              label="Conference Title"
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

          <Form.Group className="mb-3" controlId="formBasicConference">
            <TextField
              // basic
              type="text"
              name="conference"
              value={formData.conference}
              //mui
              label="Conference"
              variant="outlined"
              fullWidth
              //hook form
              {...register("conference")}
              //to override onChange
              onChange={handleChange}
            />
            <small className="text-danger">
              {errors.conference ? errors.conference.message : <span></span>}
            </small>
          </Form.Group>
          <Grid container spacing={2}>
            <Grid item sm={12} md={4}>
              <Form.Group className="mb-3" controlId="formBasicVolume">
                <TextField
                  // basic
                  type="text"
                  name="volume"
                  value={formData.volume}
                  //mui
                  label="Volume #"
                  variant="outlined"
                  fullWidth
                  //hook form
                  {...register("volume")}
                  //to override onChange
                  onChange={handleChange}
                />
                <small className="text-danger">
                  {errors.volume ? errors.volume.message : <span></span>}
                </small>
              </Form.Group>
            </Grid>
            <Grid item sm={12} md={4}>
              <Form.Group className="mb-3" controlId="formBasicIssue">
                <TextField
                  // basic
                  type="text"
                  name="issue"
                  value={formData.issue}
                  //mui
                  label="Issue #"
                  variant="outlined"
                  fullWidth
                  //hook form
                  {...register("issue")}
                  //to override onChange
                  onChange={handleChange}
                />
                <small className="text-danger">
                  {errors.issue ? errors.issue.message : <span></span>}
                </small>
              </Form.Group>
            </Grid>
            <Grid item sm={12} md={4}>
              <Form.Group className="mb-3" controlId="formBasicPageNumber">
                <TextField
                  // basic
                  type="text"
                  name="n_page"
                  value={formData.n_page}
                  //mui
                  label="Page #"
                  variant="outlined"
                  fullWidth
                  //hook form
                  {...register("n_page")}
                  //to override onChange
                  onChange={handleChange}
                />
                <small className="text-danger">
                  {errors.n_page ? errors.n_page.message : <span></span>}
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
