import React from "react";
import ReactDOM from "react-dom";

import Sidenav from "./components/Sidenav.jsx";

import './css/nav.css'
import './index.css'
import './css/demo.css'
import './css/section.css'
import './css/variables.css'
import './css/global.css'
import './css/print.css'
ReactDOM.render(
    <React.StrictMode>
        <Sidenav />
    </React.StrictMode>,
    document.getElementById("root")
);
