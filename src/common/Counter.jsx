import React, { Component } from 'react';

class Counter extends Component {
   



    render() {
        return (
            <div>
                {this.props.children}
                <span style={{  marginRight:10}} className={this.getBadgeClasses()}>{this.formatCount()}</span>
                <button onClick={() => this.props.onIncrement(this.props.counter)} className="btn btn-primary btn-sm m-2">Increment</button>
             
             {/* Handled by parent. ANY MODIFICATIONS TO CHILDREN SHOULD BE HANDLED BY PARENTS */}
               <button onClick={() => this.props.onDelete(this.props.counter.id)} className="btn btn-danger btn-sm m-2">Delete</button>
            </div>

        );
    }

    getBadgeClasses() {
        let classes = "badge bg-dark m-2 bg-";
        //If count is 0 set warning else primary
        classes += this.props.counter.value === 0 ? "warning" : "primary";
        return classes;
    }

    formatCount(){
        const {value} = this.props.counter;
        return value === 0 ? "Zero" : value;
    }
}

export default Counter;