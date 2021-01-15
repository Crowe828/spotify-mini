import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { DataLayer } from "../src/Data/DataLayer";
import App from "./App";
import reducer, { initialState } from "../src/Data/Reducer";

ReactDOM.render(
  <React.StrictMode>
    <DataLayer initialState={initialState} reducer={reducer}>
      <App />
    </DataLayer>
  </React.StrictMode>,
  document.getElementById("root")
);

