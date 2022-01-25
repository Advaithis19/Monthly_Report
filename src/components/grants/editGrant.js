import React, { useState, useEffect, useRef } from "react";
import useAxios from "../../utils/axios";
import { useNavigate, useParams } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { Form, Button } from "react-bootstrap";

// Material UI
// import Button from "@material-ui/core/Button";
// import CssBaseline from "@material-ui/core/CssBaseline";
// import TextField from "@material-ui/core/TextField";
// import Grid from "@material-ui/core/Grid";
// import Typography from "@material-ui/core/Typography";
// import { makeStyles } from "@material-ui/core/styles";
// import Container from "@material-ui/core/Container";

import Select from "react-select";
import { getGrantInstance } from "../../services/grants";
import { getUsers } from "../../services/users";
import { trackPromise } from "react-promise-tracker";

// const useStyles = makeStyles((theme) => ({
//   paper: {
//     marginTop: theme.spacing(8),
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//   },
//   form: {
//     width: "100%", // Fix IE 11 issue.
//     marginTop: theme.spacing(3),
//   },
//   submit: {
//     margin: theme.spacing(3, 0, 2),
//   },
// }));

const EditGrant = () => {
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
  const initialFormData = Object.freeze({
    title: "",
    agency: "",
    sanc_amt: "",
    year: "",
    remarks: "",
    slug: "",
    PI: "",
    CO_PI: "",
  });

  const [formData, updateFormData] = useState(initialFormData);
  const [users, setUsers] = useState([]);
  const userlist = [];
  const usersRef = useRef();

  useEffect(() => {
    let mounted = true;
    trackPromise(
      getUsers(api)
        .then((response) => {
          if (mounted) {
            usersRef.current = response.data;
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
      getGrantInstance(api, id)
        .then((res) => {
          if (mounted) {
            updateFormData({
              ...formData,
              ["title"]: res.data.title,
              ["agency"]: res.data.agency,
              ["sanc_amt"]: res.data.sanc_amt,
              ["year"]: res.data.year,
              ["remarks"]: res.data.remarks,
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
    let result = userResponseArray.filter((userResponseInstance) => {
      return (
        userInstance ===
        userResponseInstance.first_name + " " + userResponseInstance.last_name
      );
    })[0];
    let resObj = {
      label: result.first_name + " " + result.last_name,
      value: result.id,
    };
    return resObj;
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

  const handlePISelect = (obj) => {
    updateFormData({
      ...formData,
      ["PI"]: obj,
    });
  };

  const handleCO_PISelect = (obj) => {
    updateFormData({
      ...formData,
      ["CO_PI"]: obj,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let postData = new FormData();
    postData.append("title", formData.title);
    postData.append("agency", formData.agency);
    postData.append("sanc_amt", formData.sanc_amt);
    postData.append("year", formData.year);
    postData.append("remarks", formData.remarks);
    postData.append("slug", formData.slug);
    postData.append("PI", formData.PI.value);
    postData.append("CO_PI", formData.CO_PI.value);

    api
      .put(`grants/edit/` + id + "/", postData)
      .then(() => {
        navigate("/grants");
        // window.location.reload();
      })
      .catch((error) => {
        if (error.response.status === 401) {
          alert("Authentication has expired! Please re-login");
          navigate("/logout");
        } else if (error.response.status === 403) {
          alert("You do not have permission to perform this action!");
          navigate("/grants");
        } else {
          alert("Error! Please check the values entered for any mistakes....");
        }
      });
  };

  // const classes = useStyles();

  return (
    // <Container component="main" maxWidth="sm">
    //   {users.forEach((user) => {
    //     userlist.push({
    //       label: user.first_name + " " + user.last_name,
    //       value: user.id,
    //     });
    //   })}
    //   <CssBaseline />
    //   <div className={classes.paper}>
    //     <Typography component="h1" variant="h5">
    //       Edit Grant
    //     </Typography>
    //     <form className={classes.form} noValidate>
    //       <Grid container spacing={2}>
    //         <Grid item xs={12}>
    //           <TextField
    //             variant="outlined"
    //             required
    //             fullWidth
    //             id="title"
    //             label="Grant Title"
    //             name="title"
    //             autoComplete="title"
    //             value={formData.title}
    //             onChange={handleChange}
    //           />
    //         </Grid>
    //         <Grid item xs={12}>
    //           <TextField
    //             variant="outlined"
    //             required
    //             fullWidth
    //             id="agency"
    //             label="Agency"
    //             name="agency"
    //             autoComplete="agency"
    //             value={formData.agency}
    //             onChange={handleChange}
    //             multiline
    //           />
    //         </Grid>
    //         <Grid item xs={12}>
    //           <TextField
    //             variant="outlined"
    //             required
    //             fullWidth
    //             id="sanc_amt"
    //             label="Sanctioned Amount"
    //             name="sanc_amt"
    //             autoComplete="sanc_amt"
    //             value={formData.sanc_amt}
    //             onChange={handleChange}
    //           />
    //         </Grid>
    //         <Grid item xs={12}>
    //           <TextField
    //             variant="outlined"
    //             required
    //             fullWidth
    //             id="year"
    //             label="Year"
    //             name="year"
    //             autoComplete="year"
    //             value={formData.year}
    //             onChange={handleChange}
    //           />
    //         </Grid>
    //         <Grid item xs={12}>
    //           <TextField
    //             variant="outlined"
    //             required
    //             fullWidth
    //             id="remarks"
    //             label="Remarks"
    //             name="remarks"
    //             autoComplete="remarks"
    //             value={formData.remarks}
    //             onChange={handleChange}
    //             multiline
    //             rows={8}
    //           />
    //         </Grid>
    //         <Grid item xs={12}>
    //           <Select
    //             required
    //             id="PI"
    //             label="Principal Investigator"
    //             name="PI"
    //             autoComplete="PI"
    //             value={formData.PI}
    //             options={userlist}
    //             onChange={handlePISelect}
    //           />
    //         </Grid>
    //         <Grid item xs={12}>
    //           <Select
    //             required
    //             id="PI"
    //             label="Co-Principal Investigator"
    //             name="CO_PI"
    //             autoComplete="CO_PI"
    //             value={formData.CO_PI}
    //             options={userlist}
    //             onChange={handleCO_PISelect}
    //           />
    //         </Grid>
    //       </Grid>
    //       <Button
    //         type="submit"
    //         fullWidth
    //         variant="contained"
    //         color="primary"
    //         className={classes.submit}
    //         onClick={handleSubmit}
    //       >
    //         Update Grant
    //       </Button>
    //     </form>
    //   </div>
    // </Container>

    <div>Hi this is the edit grant route</div>
  );
};

export default EditGrant;
