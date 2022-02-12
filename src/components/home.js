import React, { useState } from "react";
import dayjs from "dayjs";
import { Outlet, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

//MUI
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import DatePicker from "@mui/lab/DatePicker";
import TextField from "@mui/material/TextField";

const Home = () => {
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
    navigate(
      "/reports/" +
        pathList[1] +
        "/filter/date/" +
        iso_startDate +
        "/" +
        iso_endDate
    );
  };

  const pathList = window.location.pathname.split("/").slice(1);
  if (pathList[1] === "") return <Outlet />;

  return (
    <Container
      maxWidth="lg"
      component="main"
      className="text-center border-solid border-1 border-[#27447e] shadow-xl shadow-blue-500/50 p-5"
      style={{ margin: "2% auto" }}
    >
      <Grid container rowSpacing={2}>
        <Grid container rowSpacing={2} columnSpacing={2} className="">
          <Grid item xs={12} className="text-3xl font-semibold pb-3">
            <h3>Filter by date</h3>
          </Grid>
          <Grid item xs={6} className="grid justify-items-end pb-3">
            <DatePicker
              label="Select start date to filter by"
              value={dateobj.startDate}
              onChange={handleStartDateChange}
              renderInput={(params) => <TextField {...params} />}
            />
          </Grid>
          <Grid item xs={6} className="grid justify-items-start pb-3">
            <DatePicker
              label="Select end date to filter by"
              value={dateobj.endDate}
              onChange={handleEndDateChange}
              renderInput={(params) => <TextField {...params} />}
            />
          </Grid>
          <Grid item xs={12}>
            <button
              variant="outlined"
              onClick={submitChangedDates}
              className="w-[20%] border-1 border-[#27447e] rounded-2xl py-2 px-1 text-md text-semibold bg-[#b6def2] hover:bg-[#27447e] hover:text-white hover:bg-[#] transition duration-300"
            >
              Click here to submit
            </button>
          </Grid>
        </Grid>

        <div className="sm:w-[90%] w-full h-[0.25px] bg-gray-400 mx-auto my-5" />

        <Grid item xs={12}>
          <div className="text-3xl font-semibold mb-3">
            <h1>{pathList[1][0].toUpperCase() + pathList[1].slice(1)}</h1>
          </div>
          <Outlet />
        </Grid>

        <div className="w-[60%] h-[0.25px] bg-gray-400 mx-auto my-5" />

        <Grid item xs={12} className="">
          <Link to={"/reports/" + pathList[1]}>
            <button className="w-[30%] border-1 border-[#27447e] rounded-2xl py-2 px-1 text-lg text-bold bg-[#b6def2] hover:bg-[#27447e] hover:text-white hover:bg-[#] transition duration-300">
              All {pathList[1][0].toUpperCase() + pathList[1].slice(1)}
            </button>
          </Link>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;
