import "materialize-css/dist/css/materialize.min.css";
import "materialize-css/dist/js/materialize.min.js";
import M from "materialize-css";

import { createListeners } from "./lib/createListeners";
import { createComponents } from "./lib/createComponents";

window.onload = () => {
  localStorage.setItem("canvasWidth", "600");
  localStorage.setItem("canvasHeight", "600");

  M.AutoInit();
  createComponents();
  createListeners();
};
