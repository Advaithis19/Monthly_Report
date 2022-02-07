import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

//MUI
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";

import { publicationYears } from "../../constants/years";

const PublicationsHome = () => {
  const navigate = useNavigate();
  const [yearobj, setYear] = useState({
    startYear: publicationYears[7],
    endYear: publicationYears[7],
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

  const submitChangedDates = (e) => {
    navigate("filter/year/" + yearobj.startYear + "/" + yearobj.endYear);
  };

  return (
    <Container
      maxWidth="lg"
      component="main"
      className="text-center border-solid border-1 border-[#27447e] shadow-xl shadow-blue-500/50 p-5"
      style={{ margin: "2% auto" }}
    >
      <Grid container rowSpacing={2} columnSpacing={2}>
        <Grid container rowSpacing={2} columnSpacing={2} className="">
          <Grid item xs={12} className="text-3xl font-semibold">
            <h3>Filter by year</h3>
          </Grid>
          <Grid item xs={6}>
            <FormControl className="w-[50%]">
              <InputLabel id="syear-select-label">
                Select start year to filter by
              </InputLabel>
              <Select
                // basic
                name="start_year"
                value={yearobj.startYear}
                onChange={handleStartYearChange}
                // mui
                labelId="syear-select-label"
                label="Select start year to filter by"
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

          <Grid item xs={6} className="">
            <FormControl className="w-[50%]">
              <InputLabel id="eyear-select-label">
                Select end year to filter by
              </InputLabel>
              <Select
                // basic
                name="end_year"
                value={yearobj.endYear}
                onChange={handleEndYearChange}
                // styles={{
                //   // Fixes the overlapping problem of the component
                //   menu: (provided) => ({ ...provided, zIndex: 9999 }),
                // }}
                // mui
                labelId="eyear-select-label"
                label="Select end year to filter by"
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
          <Grid item xs={12} className="">
            <Button variant="outlined" onClick={submitChangedDates}>
              Click here to submit
            </Button>
          </Grid>
        </Grid>

        <div className="sm:w-[90%] w-full h-[0.25px] bg-gray-400 mx-auto my-4" />

        <Grid item xs={12}>
          <div className="text-3xl font-semibold mb-3">
            <h1>Publications</h1>
          </div>
          <Outlet />
        </Grid>
      </Grid>
    </Container>
  );
};

export default PublicationsHome;
