import React, { Component } from 'react';

class Checkbox extends Component {
   



    render() {
        return (
           <React.Fragment>
               <input type="checkbox" id={this.props.checkbox.id} name={this.props.checkbox.id} onChange={() => this.props.onCheck(this.props.checkbox)} ></input>
                                        <label htmlFor={this.props.checkbox.id}> {this.props.checkbox.label}</label>
            </React.Fragment>

        );
    }


}

export default Checkbox;