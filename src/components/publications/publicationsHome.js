import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Select from "react-select";

//MUI
// import Select from "@mui/material/Select";
import Button from "@material-ui/core/Button";
import Grid from "@mui/material/Grid";
import Container from "@material-ui/core/Container";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";

import { publicationYears } from "../../constants/years";

//custom css
import "../../static/stylings.css";

const PublicationsHome = () => {
  const navigate = useNavigate();
  const [yearobj, setYear] = useState({
    startYear: publicationYears[7],
    endYear: publicationYears[7],
  });

  const handleStartYearChange = (e) => {
    setYear({
      ...yearobj,
      ["startYear"]: e,
    });
  };

  const handleEndYearChange = (e) => {
    setYear({
      ...yearobj,
      ["endYear"]: e,
    });
  };

  const submitChangedDates = () => {
    navigate(
      "filter/year/" + yearobj.startYear.value + "/" + yearobj.endYear.value
    );
  };

  return (
    <Container maxWidth="lg" component="main" className="main">
      <Grid container rowSpacing={2} columnSpacing={2}>
        <Grid
          container
          rowSpacing={2}
          columnSpacing={2}
          className="filterContainer"
        >
          <Grid item xs={12} className="filterHeading">
            <h3>Filter by year</h3>
          </Grid>
          <Grid item xs={6} className="filterItem1">
            <FormControl fullWidth>
              <Select
                options={publicationYears}
                value={yearobj.startYear}
                onChange={handleStartYearChange}
                styles={{
                  // Fixes the overlapping problem of the component
                  menu: (provided) => ({ ...provided, zIndex: 9999 }),
                }}
              />
            </FormControl>
          </Grid>

          <Grid item xs={6} className="filterItem2">
            <FormControl fullWidth>
              <Select
                options={publicationYears}
                value={yearobj.endYear}
                onChange={handleEndYearChange}
                styles={{
                  // Fixes the overlapping problem of the component
                  menu: (provided) => ({ ...provided, zIndex: 9999 }),
                }}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} className="filterSubmit">
            <Button variant="outlined" onClick={submitChangedDates}>
              Click here to submit
            </Button>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <div className="tableHeading">
            <h1>Publications</h1>
          </div>
          <Outlet />
        </Grid>
      </Grid>
    </Container>
  );
};

export default PublicationsHome;
