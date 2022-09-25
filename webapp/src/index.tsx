/* istanbul ignore file */
import App from "./App";
import React from "react";
import ReactDOM from "react-dom";

const { protocol, hostname } = window.location;

if (
  !(
    (protocol === "https:" && hostname === "www.muz-box.com") ||
    hostname === "localhost"
  )
) {
  window.location.replace("https://www.muz-box.com");
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("./sw.js");
}
