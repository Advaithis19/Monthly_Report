import React, { useState } from "react";
import dayjs from "dayjs";
import { Outlet, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

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
    <Container
      maxWidth="lg"
      component="main"
      className="text-center border-solid border-1 border-[#27447e] shadow-xl shadow-blue-500/50 p-5"
      style={{ margin: "2% auto" }}
    >
      <Grid container rowSpacing={2}>
        <Grid container rowSpacing={2} columnSpacing={2} className="">
          <Grid item xs={12} className="text-3xl font-semibold">
            <h3>Filter by date</h3>
          </Grid>
          <Grid item xs={6} className="">
            <DatePicker
              label="Select start date to filter by"
              value={dateobj.startDate}
              onChange={handleStartDateChange}
              renderInput={(params) => <TextField {...params} />}
            />
          </Grid>
          <Grid item xs={6} className="">
            <DatePicker
              label="Select end date to filter by"
              value={dateobj.endDate}
              onChange={handleEndDateChange}
              renderInput={(params) => <TextField {...params} />}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="outlined"
              onClick={submitChangedDates}
              className=""
            >
              Click here to submit
            </Button>
          </Grid>
        </Grid>

        <div className="sm:w-[90%] w-full h-[0.25px] bg-gray-400 mx-auto my-5" />

        <Grid item xs={12}>
          <div className="text-3xl font-semibold mb-3">
            <h1>Grants</h1>
          </div>
          <Outlet />
        </Grid>

        <div className="w-[60%] h-[0.25px] bg-gray-400 mx-auto my-5" />

        <Grid item xs={12} className="">
          <Link to={"/grants"}>
            <Button
              variant="outlined"
              color="primary"
              style={{ height: 40 }}
              className="w-[30%]"
            >
              All grants
            </Button>
          </Link>
        </Grid>
      </Grid>
    </Container>
  );
};

export default GrantsHome;
