import React, { Component } from "react";
import Chart from "chartjs";
import { Line } from 'react-chartjs-2';





class Main extends Component {
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
    componentDidMount() {
        this.chart = document.getElementById('myChart')
        console.log(this.chart.attributes )
        this.myChart = new Chart(this.chart ,{
            type: "bar",
            data: {
                datasets: [{
                    data: [12,],
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
        });
        console.log(this.chartRef);
        console.log(this.myChart);
    
    }
    render() {
        return (
            <div >hello
                <canvas style={{width:'100%', height:'200px'}} id="myChart"  ref={this.chartRef}></canvas>
            </div>
            

            

        );
    }
}

export default Main;

