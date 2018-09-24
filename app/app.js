import React, { Component } from "react";
import AppBar from 'material-ui/AppBar';
import { render } from "react-dom";
import "./styles/styles.css";
import injectTapEventPlugin from "react-tap-event-plugin";
import VideoComponent from './VideoComponent'
// injectTapEventPlugin();

let dom = document.getElementById("app");
render(
    <VideoComponent />
    ,
    dom
);
