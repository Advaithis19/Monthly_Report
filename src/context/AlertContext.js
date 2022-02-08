import React, { createContext, useState } from "react";

const AlertContext = createContext();

export default AlertContext;

export const AlertProvider = ({ children }) => {
  let [showAlert, setShowAlert] = useState(false);
  let [alertProps, setAlertProps] = useState({
    type: "",
    title: "",
    message: "",
    action: "",
  });

  return (
    <AlertContext.Provider
      value={{ showAlert, setShowAlert, alertProps, setAlertProps }}
    >
      {children}
    </AlertContext.Provider>
  );
};
