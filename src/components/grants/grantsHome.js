import React, { useState } from "react";
import DatePickerComponent from "../dateComponent";
import dayjs from "dayjs";
import { Outlet, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

//custom css
import "../../static/stylings.css";

//MUI
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import DatePicker from "@mui/lab/DatePicker";
import TextField from "@mui/material/TextField";

const GrantsHome = () => {
  const navigate = useNavigate();
  const [dateobj, setDate] = useState({
    startDate: new Date(),
    endDate: new Date(),
  });

  const handleStartDateChange = (e) => {
    setDate({
      ...dateobj,
      ["startDate"]: e,
    });
  };

  const handleEndDateChange = (e) => {
    setDate({
      ...dateobj,
      ["endDate"]: e,
    });
  };

  const submitChangedDates = () => {
    let iso_startDate = dayjs(dateobj.startDate).format("YYYY-MM-DD");
    let iso_endDate = dayjs(dateobj.endDate).format("YYYY-MM-DD");
    navigate("filter/date/" + iso_startDate + "/" + iso_endDate);
  };

  return (
    <Container maxWidth="lg" component="main" className="main">
      <Grid container rowSpacing={2}>
        <Grid
          container
          rowSpacing={2}
          columnSpacing={2}
          className="filterContainer"
        >
          <Grid item xs={12} className="filterHeading">
            <h3>Filter by date</h3>
          </Grid>
          <Grid item xs={6} className="filterItem1">
            <DatePicker
              label="Select start date to filter by"
              value={dateobj.startDate}
              onChange={handleStartDateChange}
              renderInput={(params) => <TextField {...params} />}
            />
          </Grid>
          <Grid item xs={6} className="filterItem2">
            <DatePicker
              label="Select end date to filter by"
              value={dateobj.endDate}
              onChange={handleEndDateChange}
              renderInput={(params) => <TextField {...params} />}
            />
          </Grid>
          <Grid item xs={12} className="filterSubmit">
            <Button variant="outlined" onClick={submitChangedDates}>
              Click here to submit
            </Button>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <div className="tableHeading">
            <h1>Grants</h1>
          </div>
          <Outlet />
        </Grid>
        <Grid item xs={12} className="newGrant">
          <Link to={"/grants"}>
            <Button variant="contained" color="primary" style={{ height: 40 }}>
              All grants
            </Button>
          </Link>
        </Grid>
      </Grid>
    </Container>
  );
};

export default GrantsHome;
