import React, { Component } from "react";
import equal from 'fast-deep-equal'
import { Line } from 'react-chartjs-2';



class Graph extends Component {
    constructor(props) {
        super(props);
        this.chartRef = React.createRef();
        
        this.state = {

            data: {
                datasets: [{
                    data: [],
                    label: '',
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                },
                plugins: {
                    title: {
                        display: true,
                        text: ''
                    },
                },
                animation: {
                    duration: 0 // general animation time
                },
            }

        }



    }
    componentDidUpdate(prevProps) {
        console.log(this.props, prevProps)
        if(!equal(this.props.data, prevProps.data)) // Check if it's a new user, you can also use some unique property, like the ID  (this.props.user.id !== prevProps.user.id)
        {
          this.setState({data:this.props.data})
          console.log(this.state)
        }
      } 
      
    render() {
        return (
            <div >

                <Line data={this.state.data} options={this.state.options} />
            </div>
            

            

        );
    }
}

export default Graph;

