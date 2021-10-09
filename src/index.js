/* istanbul ignore file */
import "./AuthService";

import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import "./index.css";
import ServiceLoader from "./ServiceLoader";

ReactDOM.render(
  <React.StrictMode>
    <ServiceLoader app={App}/>
  </React.StrictMode>,
  document.getElementById("root")
);
