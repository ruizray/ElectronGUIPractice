import React, { Component } from 'react';
import Sidenav from './Sidenav';


class App extends Component {
    state = {
        navToggled: false
    }

    handleToggle = () => {
        this.setState({ navToggled: !this.state.navToggled })
    };

    render() {
        return (
            <React.Fragment>
                <div className={this.state.navToggled === true ? "sb-nav-fixed sb-sidenav-toggled" : "sb-nav-fixed"}>


                    <Sidenav onToggle={this.handleToggle} />
                </div>

            </React.Fragment>
        );
    }
}

export default App;