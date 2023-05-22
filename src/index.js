import React from "react";
import ReactDOM from "react-dom";
import "i18n";

import App from "./App";
import "./scss/index.scss";

import { Provider } from "react-redux";
import { BrowserRouter as Router, HashRouter } from "react-router-dom";

import store from "./store";

ReactDOM.render(
  <Provider store={store}>
    <HashRouter>
      <App />
    </HashRouter>
  </Provider>,
  // <React.StrictMode>
  // </React.StrictMode>,
  document.getElementById("root")
);
