import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

const PublicationsHome = () => {
  const years = [
    2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026,
    2027, 2028, 2029,
  ];
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
    window.location.reload();
  };
  return (
    <div>
      <p>Filter by date</p>
      Start year:
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={yearobj.startYear}
        label="Year"
        name="syear_select"
        onChange={handleStartYearChange}
      >
        {years.map((year) => (
          <MenuItem key={year} value={year}>
            {year}
          </MenuItem>
        ))}
      </Select>
      End year:
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={yearobj.endYear}
        label="Year"
        name="eyear_select"
        onChange={handleEndYearChange}
      >
        {years.map((year) => (
          <MenuItem key={year} value={year}>
            {year}
          </MenuItem>
        ))}
      </Select>
      <p onClick={submitChangedDates}>Click here to submit</p>
      <Outlet />
    </div>
  );
};

export default PublicationsHome;
