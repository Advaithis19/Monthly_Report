import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DatePickerComponent = (props) => {
  return (
    <DatePicker
      selected={props.selectedDate}
      onChange={(date) => props.onDateChange(date)}
    />
  );
};

export default DatePickerComponent;
