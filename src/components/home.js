import React, { useState } from "react";
import dayjs from "dayjs";
import { Outlet, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { publicationYears } from "../constants/years";

//MUI
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import DatePicker from "@mui/lab/DatePicker";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

import jwt_decode from "jwt-decode";

const Home = () => {
  const navigate = useNavigate();

  //for regular tables
  const [dateobj, setDate] = useState({
    startDate: new Date(),
    endDate: new Date(),
  });

  //for publications
  const [yearobj, setYear] = useState({
    startYear: 2022,
    endYear: 2022,
    startYear: publicationYears[7],
    endYear: publicationYears[7],
  });

  //for regular tables
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
  // -------------------------------------

  //for publications
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

  const submitChangedYears = () => {
    navigate(
      "/reports/publications/filter/year/" +
        yearobj.startYear +
        "/" +
        yearobj.endYear
    );
  };
  //---------------------------------

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
        {!(pathList[1] === "publications") ? (
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
        ) : (
          <Grid container rowSpacing={2} columnSpacing={5} className="">
            <Grid item xs={12} className="text-3xl font-semibold pb-3">
              <h3>Filter by year</h3>
            </Grid>
            <Grid item xs={6} className="grid justify-items-end pb-3">
              <FormControl className="w-[50%]">
                <InputLabel id="syear-select-label">
                  Select start-year to filter by
                </InputLabel>
                <Select
                  // basic
                  name="syear_select"
                  options={publicationYears}
                  value={yearobj.startYear}
                  onChange={handleStartYearChange}
                  // mui
                  labelId="syear-select-label"
                  label="Select start-year to filter by"
                  inputProps={{ MenuProps: { disableScrollLock: true } }}
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
            <Grid item xs={6} className="grid justify-items-start pb-3">
              <FormControl className="w-[50%]">
                <InputLabel id="eyear-select-label">
                  Select end-year to filter by
                </InputLabel>
                <Select
                  // basic
                  name="eyear_select"
                  options={publicationYears}
                  value={yearobj.endYear}
                  onChange={handleEndYearChange}
                  // mui
                  labelId="eyear-select-label"
                  label="Select end-year to filter by"
                  inputProps={{ MenuProps: { disableScrollLock: true } }}
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
            <Grid item xs={12}>
              <button
                variant="outlined"
                onClick={submitChangedYears}
                className="w-[20%] border-1 border-[#27447e] rounded-2xl py-2 px-1 text-md text-semibold bg-[#b6def2] hover:bg-[#27447e] hover:text-white hover:bg-[#] transition duration-300"
              >
                Click here to submit
              </button>
            </Grid>
          </Grid>
        )}
      </Grid>

      <div className="sm:w-[90%] w-full h-[0.25px] bg-gray-400 mx-auto my-5" />

      <Grid container>
        <Grid item xs={12}>
          <div className="text-3xl font-semibold mb-3">
            <h1>
              {pathList[1][0].toUpperCase() +
                pathList[1].slice(1).split("_").join(" ")}
            </h1>
          </div>
        </Grid>
        <Grid item xs={12}>
          <Outlet />
        </Grid>
      </Grid>

      <div className="w-[60%] h-[0.25px] bg-gray-400 mx-auto my-5" />

      {jwt_decode(JSON.parse(localStorage.getItem("authTokens")).access)
        .is_teacher && !(pathList[1] === "publications") ? (
        <Grid container spacing={2}>
          <Grid item xs={12} md={6} className="text-right">
            <Link to={"/reports/" + pathList[1]}>
              <button className="w-[50%] border-1 border-[#27447e] rounded-2xl py-2 px-1 text-lg text-bold bg-[#b6def2] hover:bg-[#27447e] hover:text-white hover:bg-[#] transition duration-300 mr-5">
                All{" "}
                {pathList[1][0].toUpperCase() +
                  pathList[1].slice(1).split("_").join(" ")}
              </button>
            </Link>
          </Grid>
          <Grid item xs={12} md={6} className="text-left">
            <Link to={"/" + pathList[1] + "/create"}>
              <button className="w-[50%] border-1 border-[#27447e] rounded-2xl py-2 px-1 text-lg text-bold bg-[#b6def2] hover:bg-[#27447e] hover:text-white hover:bg-[#] transition duration-300 ml-5">
                New
              </button>
            </Link>
          </Grid>
        </Grid>
      ) : (
        <Link to={"/reports/" + pathList[1]}>
          <button className="w-[30%] border-1 border-[#27447e] rounded-2xl py-2 px-1 text-lg text-bold bg-[#b6def2] hover:bg-[#27447e] hover:text-white hover:bg-[#] transition duration-300">
            All {pathList[1][0].toUpperCase() + pathList[1].slice(1)}
          </button>
        </Link>
      )}
    </Container>
  );
};

export default Home;
