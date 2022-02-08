import React, { useContext } from "react";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import AlertContext from "../context/AlertContext";

const CustomAlert = ({ type, title, message, action }) => {
  let { setShowAlert } = useContext(AlertContext);

  return (
    <Alert
      severity={type}
      onClose={setShowAlert(null)}
      sx={{ position: "fixed" }}
    >
      <AlertTitle>{title}</AlertTitle>
      {message} — <strong>{action}</strong>
    </Alert>
  );
};

export default CustomAlert;
