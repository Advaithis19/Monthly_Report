import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

//MUI
import Button from "@material-ui/core/Button";
import Grid from "@mui/material/Grid";
import Container from "@material-ui/core/Container";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";

import { publicationYears } from "../../constants/years";

//custom css
import "../../static/stylings.css";

const PublicationsHome = () => {
  const navigate = useNavigate();
  const [yearobj, setYear] = useState({
    startYear: 2022,
    endYear: 2022,
  });

  const handleStartYearChange = (e) => {
    setYear({
      ...yearobj,
      ["startYear"]: e.target.value,
    });
  };

  const handleEndYearChange = (e) => {
    setYear({
      ...yearobj,
      ["endYear"]: e.target.value,
    });
  };

  const submitChangedDates = () => {
    navigate("filter/year/" + yearobj.startYear + "/" + yearobj.endYear);
    // window.location.reload();
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
            {/* Start year:
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={yearobj.startYear}
            label="Year"
            name="syear_select"
            onChange={handleStartYearChange}
          >
            {publicationYears.map((year) => (
              <MenuItem key={year} value={year}>
                {year}
              </MenuItem>
            ))}
          </Select> */}
            <FormControl fullWidth>
              <InputLabel id="syear-select-label">
                Select start-year to filter by
              </InputLabel>
              <Select
                // basic
                name="syear_select"
                value={yearobj.startYear}
                onChange={handleStartYearChange}
                // mui
                labelId="syear-select-label"
                label="Select start-year to filter by"
              >
                {publicationYears.map((year) => {
                  return (
                    <MenuItem key={year} value={year}>
                      {year}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6} className="filterItem2">
            {/* End year:
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={yearobj.endYear}
            label="Year"
            name="eyear_select"
            onChange={handleEndYearChange}
          >
            {publicationYears.map((year) => (
              <MenuItem key={year} value={year}>
                {year}
              </MenuItem>
            ))}
          </Select> */}
            <FormControl fullWidth>
              <InputLabel id="eyear-select-label">
                Select end-year to filter by
              </InputLabel>
              <Select
                // basic
                name="eyear_select"
                value={yearobj.endYear}
                onChange={handleEndYearChange}
                // mui
                labelId="eyear-select-label"
                label="Select end-year to filter by"
              >
                {publicationYears.map((year) => {
                  return (
                    <MenuItem key={year} value={year}>
                      {year}
                    </MenuItem>
                  );
                })}
              </Select>
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
