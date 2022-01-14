import React, { useState, useEffect } from "react";
import axiosInstance from "../../utils/axios";
import { useNavigate, useParams } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { Form, Button } from "react-bootstrap";

import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const EditGrant = () => {
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
    // PI: "",
    // CO_PI: "",
  });

  const [formData, updateFormData] = useState(initialFormData);

  let getEditInstance = async () => {
    let res = await axiosInstance.get("grants/" + id);
    if (res.status === 200) {
      updateFormData({
        ...formData,
        ["title"]: res.data.title,
        ["agency"]: res.data.agency,
        ["sanc_amt"]: res.data.sanc_amt,
        ["year"]: res.data.year,
        ["remarks"]: res.data.remarks,
        ["slug"]: res.data.slug,
      });
    }
  };

  useEffect(() => {
    getEditInstance();
  }, [updateFormData]);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);

    axiosInstance.put(`grants/edit/` + id + "/", {
      title: formData.title,
      agency: formData.agency,
      sanc_amt: formData.sanc_amt,
      year: formData.year,
      remarks: formData.remarks,
      slug: formData.slug,
    });
    navigate("/grants");
    window.location.reload();
  };

  const classes = useStyles();

  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Edit Grant
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="title"
                label="Grant Title"
                name="title"
                autoComplete="title"
                value={formData.title}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="agency"
                label="Agency"
                name="agency"
                autoComplete="agency"
                value={formData.agency}
                onChange={handleChange}
                multiline
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="sanc_amt"
                label="Sanctioned Amount"
                name="sanc_amt"
                autoComplete="sanc_amt"
                value={formData.sanc_amt}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="year"
                label="Year"
                name="year"
                autoComplete="year"
                value={formData.year}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="remarks"
                label="Remarks"
                name="remarks"
                autoComplete="remarks"
                value={formData.remarks}
                onChange={handleChange}
                multiline
                rows={8}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSubmit}
          >
            Update Grant
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default EditGrant;
