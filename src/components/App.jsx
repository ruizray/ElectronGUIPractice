import React, { Component } from 'react';
import Sidenav from './Sidenav';




const App = () => {

    const [toggled, handleNavtoggled] = React.useState(false)

    const handleNavToggle = () => {
        handleNavtoggled(!toggled)
        
    };
    return (<React.Fragment>
        <div className={toggled === true ? "sb-nav-fixed sb-sidenav-toggled" : "sb-nav-fixed"}>


            <Sidenav onToggle={handleNavToggle} />
        </div>

    </React.Fragment>);
}

export default App;

