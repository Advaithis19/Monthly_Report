import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import LoadingIndicator from "./utils/loadingIndicator";
// import "semantic-ui-css/semantic.min.css";

ReactDOM.render(
  <React.StrictMode>
    <App />
    <LoadingIndicator />
  </React.StrictMode>,
  document.getElementById("root")
);
