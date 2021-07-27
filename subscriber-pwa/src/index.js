import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

navigator.serviceWorker
  .register("/service-worker.js", { type: "module" })
  .then((registration) => {
    console.log(registration);
    // now lets delete some keys in local storage so that we
    // can get a new subscription for ourselves from backend
    if (serviceWorkerRegistration.isLocalhost) {
      localStorage.removeItem("PUSH_NOTIFICATION_SUBSCRIBED");
    }
  });

// serviceWorkerRegistration.register();
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
