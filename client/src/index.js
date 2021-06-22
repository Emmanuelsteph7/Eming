import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "./App";
import Context from "./store/Context";
// import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <Context>
      <App />
    </Context>
  </React.StrictMode>,
  document.getElementById("root")
);
