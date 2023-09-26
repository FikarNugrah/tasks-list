import React from "react";
import "./index.css";
import { createRoot } from "react-dom/client"; // Ganti impor ini
import { Provider } from "react-redux";
import store from "./store"; // Impor store Redux Anda
// import App from "./App";
import TasksList from "./page/tasksList";
import TasksList_v2 from "./page/tasksList_v2";

const root = createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    {/* <TasksList /> */}
    <TasksList_v2 />
  </Provider>
);
