import React, { Component } from "react";


import Itemcat from './itemCat';

class Sidenav extends Component {

    state = {
        categories: [
            { header: "Menu Sample", category: "windows", items: ["Graph", "Crash-Hang"] },
            { header: "Mapper", category: "mapper", items: ["Mapper"] },
        ]
    };
    render() {
        return (
            <React.Fragment>
                <nav className="nav js-nav">
                    <header class="nav-header">
                        <h1 className="nav-title">Electron <strong>API Demos</strong></h1>
                    </header>
                    {this.state.categories.map(category =>
                        <Itemcat header={category.header} keys={category.category} values={category.items} />)}

                </nav>
            </React.Fragment>
        )
    };

}

export default Sidenav