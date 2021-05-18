import React, { Component } from "react";

class Navitem extends Component {

    state = {

        items: this.props.values
    };
    render() {
        return (

            <React.Fragment>

                {this.state.items.map(category =>
                 <button type="button" id={this.getCategoryClass(category)} data-section={category} className="nav-button">Open <em>{category}</em></button>)}
                   

            </React.Fragment>
        )
    };
    getNavLinkTo(item){
        let slash = "/"
        slash += this.state.category
        return slash
    }

    getCategoryClass(item) {
        let ids = "button-";
        ids += this.state.category
        return ids;
    }
}

export default Navitem