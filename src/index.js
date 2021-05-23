import React from "react";
import ReactDOM from "react-dom";


import './css/styles.css'
// import './css/demo.css'
// import './css/section.css'
// import './css/variables.css'
// import './css/global.css'
// import './css/print.css'
// import './css/bootstrap-grid.css'
import App from "./components/App.jsx";
import { HashRouter } from "react-router-dom";



ReactDOM.render(
    <HashRouter>
        <App />
        </HashRouter>,
    document.getElementById("root")
);
