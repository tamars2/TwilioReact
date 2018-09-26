import React, { Component } from "react";
import AppBar from 'material-ui/AppBar';
import { render } from "react-dom";
import "./styles/boilerplate.css";
import "./styles/styles.css";
import injectTapEventPlugin from "react-tap-event-plugin";
import { CookiesProvider, Cookies } from 'react-cookie';
import VideoComponent from './VideoComponent'
import Chat from './Chat'
// injectTapEventPlugin();

let dom = document.getElementById("app");
render(
    <CookiesProvider>
      <VideoComponent />
      <Chat />
    </CookiesProvider>
    ,
    dom
);
