import React, { useState } from "react";
import DatePickerComponent from "../dateComponent";
import dayjs from "dayjs";
import { Outlet, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

//MUI
import Button from "@material-ui/core/Button";
import Grid from "@mui/material/Grid";
import Container from "@material-ui/core/Container";

const GrantsHome = () => {
  const navigate = useNavigate();
  const [dateobj, setDate] = useState({
    startDate: new Date(),
    endDate: new Date(),
  });

  const handleStartDateChange = (date) => {
    setDate({
      ...dateobj,
      ["startDate"]: date,
    });
  };

  const handleEndDateChange = (date) => {
    setDate({
      ...dateobj,
      ["endDate"]: date,
    });
  };

  const submitChangedDates = () => {
    let iso_startDate = dayjs(dateobj.startDate).format("YYYY-MM-DD");
    let iso_endDate = dayjs(dateobj.endDate).format("YYYY-MM-DD");
    navigate("filter/date/" + iso_startDate + "/" + iso_endDate);
    // window.location.reload();
  };

  return (
    <Container maxWidth="lg" component="main">
      <Grid container rowSpacing={2}>
        <Grid item xs={12}>
          <h3>Filter by date</h3>
        </Grid>
        <Grid item xs={6}>
          Start date:
          <DatePickerComponent
            onDateChange={handleStartDateChange}
            selectedDate={dateobj.startDate}
          />
        </Grid>
        <Grid item xs={6}>
          End date:
          <DatePickerComponent
            onDateChange={handleEndDateChange}
            selectedDate={dateobj.endDate}
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="outlined" onClick={submitChangedDates}>
            Click here to submit
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Outlet />
        </Grid>
        <Grid item xs={12}>
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
