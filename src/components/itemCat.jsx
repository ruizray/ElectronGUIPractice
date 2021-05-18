import React, { Component } from "react";
import Navitem from './navItem';
class Itemcat extends Component {
    constructor(prop) {
        super(prop)
        this.state = {
            header: this.props.header,
            category: this.props.keys,
            items: this.props.values
        };
    }


    render() {
        console.log(this.state.category)
        return (
            <div className={this.getCategoryClass()}>
                <h5 className="nav-category"> {this.state.header} </h5>
                <Navitem values={this.state.items} />

            </div >
        )
    };

    getCategoryClass() {
        let classes = "nav-item u-category-";
        classes += this.state.category
        return classes;
    }

}

export default Itemcat