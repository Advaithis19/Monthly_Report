import React, { useState, useEffect, useRef } from "react";
import useAxios from "../../utils/axios";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";

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

import { getLectureInstance } from "../../services/lectures";
import { getUsers } from "../../services/users";
import { trackPromise } from "react-promise-tracker";

//yup
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

const EditLecture = () => {
  const initialFormData = Object.freeze({
    topic: "",
    res_person: "",
    organisation: "",
    n_stud: "",
    n_fac: "",
    n_ind: "",
    slug: "",
    f_id: "",
  });

  const [formData, updateFormData] = useState(initialFormData);

  // form validation rules
  const validationSchema = Yup.object().shape({
    topic: Yup.string().test(
      "len",
      "topic is required",
      (val) => val.length > 0
    ),
    res_person: Yup.string().test(
      "len",
      "Resource Person is required",
      (val) => val.length > 0
    ),
    organisation: Yup.string().test(
      "len",
      "Organisation is required",
      (val) => val.length > 0
    ),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  // get functions to build form with useForm() hook
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;

  let api = useAxios();
  api.defaults.xsrfCookieName = "csrftoken";
  api.defaults.xsrfHeaderName = "X-CSRFToken";

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

  const navigate = useNavigate();
  const { id } = useParams();
  const [users, setUsers] = useState([]);
  const usersRef = useRef();

  useEffect(() => {
    let mounted = true;
    trackPromise(
      getUsers(api)
        .then((response) => {
          if (mounted) {
            usersRef.current = response.data.map((user) => {
              return {
                label: user.first_name + " " + user.last_name,
                value: user.id,
              };
            });
            setUsers(usersRef.current);
          }
        })
        .catch((error) => {
          if (mounted) {
            if (error.response.status === 401) {
              alert("Authentication has expired! Please re-login");
              navigate("/logout");
            } else {
              alert("Something went wrong! Please logout and try again");
            }
          }
        })
    );
    trackPromise(
      getLectureInstance(api, id)
        .then((res) => {
          if (mounted) {
            updateFormData({
              ...formData,
              ["topic"]: res.data.topic,
              ["res_person"]: res.data.res_person,
              ["organisation"]: res.data.organisation,
              ["n_stud"]: res.data.n_stud,
              ["n_fac"]: res.data.n_fac,
              ["n_ind"]: res.data.n_ind,
              ["slug"]: res.data.slug,
              ["f_id"]: findMatchingUser(res.data.f_id, usersRef.current),
            });
          }
        })
        .catch((error) => {
          if (mounted) {
            if (error.response.status === 401) {
              alert("Authentication has expired! Please re-login");
              navigate("/logout");
            } else {
              alert("Something went wrong! Please logout and try again");
            }
          }
        })
    );

    return () => {
      mounted = false;
    };
  }, [setUsers, updateFormData]);

  const findMatchingUser = (userInstance, userResponseArray) => {
    return userResponseArray.filter((userResponseInstance) => {
      return userInstance === userResponseInstance.label;
    })[0].value;
  };

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

  const onSubmit = async (e) => {
    let postData = new FormData();
    postData.append("topic", formData.topic);
    postData.append("res_person", formData.res_person);
    postData.append("organisation", formData.organisation);
    postData.append("n_stud", formData.n_stud);
    postData.append("n_fac", formData.n_fac);
    postData.append("n_ind", formData.n_ind);
    postData.append("slug", formData.slug);
    postData.append("f_id", formData.f_id);

    api
      .put(`lectures/edit/` + id + "/", postData)
      .then(() => {
        navigate("/lectures/" + id);
        // window.location.reload();
      })
      .catch((error) => {
        if (error.response.status === 401) {
          alert("Authentication has expired! Please re-login");
          navigate("/logout");
        } else if (error.response.status === 403) {
          alert("You do not have permission to perform this action!");
          navigate("/lectures/" + id);
        } else {
          alert("Error! Please check the values entered for any mistakes....");
        }
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
          Edit Lecture
        </Typography>
        <Form.Group className="mb-3" controlId="formBasicTopic">
          <TextField
            // basic
            type="text"
            name="topic"
            value={formData.topic}
            //mui
            label="Lecture Topic"
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
            <Form.Group className="mb-3" controlId="formBasicResourcePerson">
              <TextField
                // basic
                type="text"
                name="res_person"
                value={formData.res_person}
                //mui
                label="Resource Person"
                variant="outlined"
                fullWidth
                //hook form
                {...register("res_person")}
                //to override onChange
                onChange={handleChange}
              />
              <small className="text-danger">
                {errors.res_person ? errors.res_person.message : <span></span>}
              </small>
            </Form.Group>
          </Grid>
          <Grid item sm={12} md={6}>
            <Form.Group className="mb-3" controlId="formBasicOrganisation">
              <TextField
                // basic
                type="text"
                name="organisation"
                value={formData.organisation}
                //mui
                label="Organisation"
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

          <Form.Group
            className="mb-3"
            controlId="formBasicPrincipleInvestigator"
          >
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
            Edit
          </Button>
        </Form>
      </Box>
    </Container>
  );
};

export default EditLecture;
