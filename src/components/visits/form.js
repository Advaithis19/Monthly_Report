import React from "react";
import { useForm } from "react-hook-form";
import semester_options from "../../constants/semesters";

//yup
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

// Bootstrap UI
import { Form } from "react-bootstrap";

// MUI
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
  formData,
  updateFormData,
  facultySelected,
  setFacultySelected,
  users,
  onSubmit,
  type,
}) => {
  // form validation rules
  const validationSchema = Yup.object().shape({
    purpose: Yup.string().required("Purpose field is required"),
    industry: Yup.string().required("Industry field is required"),
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
    if ([e.target.name] == "purpose") {
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

  const handleSemesterSelect = (e) => {
    updateFormData({
      ...formData,
      ["semester"]: e.target.value,
    });
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
          {type} Industrial-visit
        </Typography>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3" controlId="formBasicPurpose">
            <TextField
              // basic
              type="text"
              name="purpose"
              value={formData.purpose}
              //mui
              label="Purpose of Visit"
              variant="outlined"
              fullWidth
              //hook form
              {...register("purpose")}
              //to override onChange
              onChange={handleChange}
            />
            <small className="text-danger">
              {errors.purpose ? errors.purpose.message : <span></span>}
            </small>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicIndustry">
            <TextField
              // basic
              type="text"
              name="industry"
              value={formData.industry}
              //mui
              label="Industry Visited"
              variant="outlined"
              fullWidth
              //hook form
              {...register("industry")}
              //to override onChange
              onChange={handleChange}
            />
            <small className="text-danger">
              {errors.industry ? errors.industry.message : <span></span>}
            </small>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicSemester">
            <FormControl fullWidth>
              <InputLabel id="semester-select-label">Semester</InputLabel>
              <Select
                // basic
                name="semester"
                value={formData.semester}
                onChange={handleSemesterSelect}
                // mui
                labelId="semester-select-label"
                label="Semester"
                inputProps={{ MenuProps: { disableScrollLock: true } }}
              >
                {semester_options.map((semester, index) => {
                  return (
                    <MenuItem key={index} value={semester.short}>
                      {semester.full}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Form.Group>

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
