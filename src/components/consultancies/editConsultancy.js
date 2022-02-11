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

import { getConsultancyInstance } from "../../services/consultancies";
import { getUsers } from "../../services/users";
import { trackPromise } from "react-promise-tracker";

//yup
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

const EditConsultancy = () => {
  const initialFormData = Object.freeze({
    title: "",
    fund_agency: "",
    rec_amt: "",
    slug: "",
    f_id: "",
  });

  const [formData, updateFormData] = useState(initialFormData);

  // form validation rules
  const validationSchema = Yup.object().shape({
    title: Yup.string().test(
      "len",
      "Title is required",
      (val) => val.length > 0
    ),
    fund_agency: Yup.string().test(
      "len",
      "Funding agency is required",
      (val) => val.length > 0
    ),
    rec_amt: Yup.string().test(
      "len",
      "Received amount field is required",
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
      getConsultancyInstance(api, id)
        .then((res) => {
          if (mounted) {
            updateFormData({
              ...formData,
              ["title"]: res.data.title,
              ["fund_agency"]: res.data.fund_agency,
              ["rec_amt"]: res.data.rec_amt,
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

  const onSubmit = async (e) => {
    // console.log(formData);
    let postData = new FormData();
    postData.append("title", formData.title);
    postData.append("fund_agency", formData.fund_agency);
    postData.append("rec_amt", formData.rec_amt);
    postData.append("slug", formData.slug);
    postData.append("f_id", formData.f_id);

    api
      .put(`consultancies/edit/` + id + "/", postData)
      .then(() => {
        navigate("/consultancies/" + id);
      })
      .catch((error) => {
        if (error.response.status === 401) {
          alert("Authentication has expired! Please re-login");
          navigate("/logout");
        } else if (error.response.status === 403) {
          alert("You do not have permission to perform this action!");
          navigate("/consultancies/" + id);
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
          Edit Consultancy
        </Typography>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3" controlId="formBasicTitle">
            <TextField
              // basic
              type="text"
              name="title"
              value={formData.title}
              //mui
              label="Consultancy Title"
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

          <Form.Group className="mb-3" controlId="formBasicFundingAgency">
            <TextField
              // basic
              type="text"
              name="fund_agency"
              value={formData.fund_agency}
              //mui
              label="Funding Agency"
              variant="outlined"
              fullWidth
              multiline
              //hook form
              {...register("fund_agency")}
              //to override onChange
              onChange={handleChange}
            />
            <small className="text-danger">
              {errors.fund_agency ? errors.fund_agency.message : <span></span>}
            </small>
          </Form.Group>

          <Grid container spacing={2}>
            <Grid item sm={12}>
              <Form.Group className="mb-3" controlId="formBasicAmount">
                <TextField
                  // basic
                  type="text"
                  name="rec_amt"
                  value={formData.rec_amt}
                  //mui
                  label="Received Amount"
                  variant="outlined"
                  fullWidth
                  //hook form
                  {...register("rec_amt")}
                  //to override onChange
                  onChange={handleChange}
                />
                <small className="text-danger">
                  {errors.rec_amt ? errors.rec_amt.message : <span></span>}
                </small>
              </Form.Group>
            </Grid>
          </Grid>

          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Form.Group className="mb-3" controlId="formBasicFacultyInvolved">
                <FormControl fullWidth>
                  <InputLabel id="f_id-select-label">
                    Faculty Involved
                  </InputLabel>
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

export default EditConsultancy;
