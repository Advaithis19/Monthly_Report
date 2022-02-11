import React, { useState, useEffect, useRef } from "react";
import useAxios from "../../utils/axios";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
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

import { getProposalInstance } from "../../services/proposals";
import { getUsers } from "../../services/users";
import { trackPromise } from "react-promise-tracker";

//yup
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

const EditProposal = () => {
  const initialFormData = Object.freeze({
    title: "",
    submitted_to: "",
    budg_amt: "",
    status: "ON",
    slug: "",
    PI: "",
    CO_PI: "",
  });

  const [formData, updateFormData] = useState(initialFormData);

  // form validation rules
  const validationSchema = Yup.object().shape({
    title: Yup.string().test(
      "len",
      "Title is required",
      (val) => val.length > 0
    ),
    submitted_to: Yup.string().test(
      "len",
      "This field is required",
      (val) => val.length > 0
    ),
    budg_amt: Yup.string().test(
      "len",
      "Amount is required",
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
      getProposalInstance(api, id)
        .then((res) => {
          if (mounted) {
            updateFormData({
              ...formData,
              ["title"]: res.data.title,
              ["submitted_to"]: res.data.submitted_to,
              ["budg_amt"]: res.data.budg_amt,
              ["status"]: res.data.status,
              ["slug"]: res.data.slug,
              ["PI"]: findMatchingUser(res.data.PI, usersRef.current),
              ["CO_PI"]: findMatchingUser(res.data.CO_PI, usersRef.current),
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

  const handlePISelect = (e) => {
    updateFormData({
      ...formData,
      ["PI"]: e.target.value,
    });
  };

  const handleCO_PISelect = (e) => {
    updateFormData({
      ...formData,
      ["CO_PI"]: e.target.value,
    });
  };

  const handleStatusSelect = (e) => {
    updateFormData({
      ...formData,
      ["status"]: e.target.value,
    });
  };

  const onSubmit = async (e) => {
    // console.log(formData);
    let postData = new FormData();
    postData.append("title", formData.title);
    postData.append("submitted_to", formData.submitted_to);
    postData.append("budg_amt", formData.budg_amt);
    postData.append("status", formData.status);
    postData.append("slug", formData.slug);
    postData.append("PI", formData.PI);
    postData.append("CO_PI", formData.CO_PI);

    api
      .put(`proposals/edit/` + id + "/", postData)
      .then(() => {
        navigate("/proposals/" + id);
        // window.location.reload();
      })
      .catch((error) => {
        if (error.response.status === 401) {
          alert("Authentication has expired! Please re-login");
          navigate("/logout");
        } else if (error.response.status === 403) {
          alert("You do not have permission to perform this action!");
          navigate("/proposals/" + id);
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
          Edit Proposal
        </Typography>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3" controlId="formBasicTitle">
            <TextField
              // basic
              type="text"
              name="title"
              value={formData.title}
              //mui
              label="Proposal Title"
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

          <Form.Group className="mb-3" controlId="formBasicSubmitted_To">
            <TextField
              // basic
              type="text"
              name="submitted_to"
              value={formData.submitted_to}
              //mui
              label="Submitted to"
              variant="outlined"
              fullWidth
              multiline
              //hook form
              {...register("submitted_to")}
              //to override onChange
              onChange={handleChange}
            />
            <small className="text-danger">
              {errors.submitted_to ? (
                errors.submitted_to.message
              ) : (
                <span></span>
              )}
            </small>
          </Form.Group>

          <Grid container spacing={2}>
            <Grid item sm={12} md={8}>
              <Form.Group className="mb-3" controlId="formBasicAmount">
                <TextField
                  // basic
                  type="text"
                  name="budg_amt"
                  value={formData.budg_amt}
                  //mui
                  label="Budgetted Amount"
                  variant="outlined"
                  fullWidth
                  //hook form
                  {...register("budg_amt")}
                  //to override onChange
                  onChange={handleChange}
                />
                <small className="text-danger">
                  {errors.budg_amt ? errors.budg_amt.message : <span></span>}
                </small>
              </Form.Group>
            </Grid>
            <Grid item sm={12} md={4}>
              <Form.Group className="mb-3" controlId="formBasicStatus">
                <FormControl fullWidth>
                  <InputLabel id="status-select-label">
                    Select Status
                  </InputLabel>
                  <Select
                    // basic
                    name="status"
                    value={formData.status}
                    onChange={handleStatusSelect}
                    // mui
                    labelId="status-select-label"
                    label="Select Status"
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
                    value={formData.PI}
                    {...register("PI")}
                    //overriding onChange
                    onChange={handlePISelect}
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
                  {errors.PI ? errors.PI.message : <span></span>}
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
                    value={formData.CO_PI}
                    {...register("CO_PI")}
                    //overriding onChange
                    onChange={handleCO_PISelect}
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
                  {errors.CO_PI ? errors.CO_PI.message : <span></span>}
                </small>
              </Form.Group>
            </Grid>
          </Grid>

          <Button variant="contained" color="primary" type="submit" fullWidth>
            Edit
          </Button>
        </Form>
      </Box>
    </Container>
  );
};

export default EditProposal;
