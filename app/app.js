import React, { Component } from "react";
import { render } from "react-dom";
import "./styles/boilerplate.css";
import "./styles/styles.css";
import injectTapEventPlugin from "react-tap-event-plugin";
import Identity from './Identity'
// injectTapEventPlugin();

let dom = document.getElementById("app");
render(<Identity />, dom);
