import React, { useState } from "react";
import DatePickerComponent from "../dateComponent";
import dayjs from "dayjs";
import { Outlet, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

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
    <div>
      <p>Filter by date</p>
      Start date:
      <DatePickerComponent
        onDateChange={handleStartDateChange}
        selectedDate={dateobj.startDate}
      />
      End date:
      <DatePickerComponent
        onDateChange={handleEndDateChange}
        selectedDate={dateobj.endDate}
      />
      <p onClick={submitChangedDates}>Click here to submit</p>
      <Outlet />
      <Link to={"/grants"}>All grants</Link>
    </div>
  );
};

export default GrantsHome;
