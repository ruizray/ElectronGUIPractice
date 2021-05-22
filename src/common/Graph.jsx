import React, { Component } from "react";
import { Line, Bar, Pie } from 'react-chartjs-2';




class Graph extends Component {
    buildData(graphData, pieValues) {

       let temp = []
        if (pieValues !== undefined) {
            temp = [...pieValues]
        }else{}
        let data = {
            datasets: [{
                data: graphData,
                labels: [],
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
            }],
            labels: (temp === undefined ? [] : temp)
        }
        return data;
    }

    buildOptions(title) {
        let options = {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: title
                },
            },
            tooltips: {
                callbacks: {
                    label: function (tooltipItem) {
                        console.log(tooltipItem)
                        return tooltipItem.yLabel;
                    }
                }
            },
            animation: {
                // general animation time
            },
        };
        return options;
    }


    render() {
        const { type, data, title } = this.props;

        console.log(this.props)
        if (type === 'line') {

            return (
                <div >
                    <Line data={this.buildData(data)} options={this.buildOptions(title)} />
                </div>
            );
        } else if (type === 'bar') {
            return (
                <div >
                    <Bar id={title} data={this.buildData(data)} options={this.buildOptions(title)} />
                </div>
            )
        }
        else if (type === 'pie') {
            let pieLabels = data.map(x => Object.values(x)[0]);
            let pieData = data.map(x => Object.values(x)[1]);
            console.log(pieData, pieLabels)
            return (
                <div >
                    <Pie id={title} data={this.buildData(pieData, pieLabels)} options={this.buildOptions(title)} />
                </div>
            )
        }

    }
}

export default Graph;

