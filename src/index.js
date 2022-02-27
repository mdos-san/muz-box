/* istanbul ignore file */
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import "@sharpmds/core/index.css"
import "./index.css";

const { protocol, hostname } = window.location;

if (
  !((protocol === "https:" && (hostname === "www.muz-box.com")) || hostname === "localhost")
) {
  window.location.replace("https://www.muz-box.com");
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
