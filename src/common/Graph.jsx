import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Component } from "react";
import { Line, Bar, Pie } from "react-chartjs-2";
import * as fa from "@fortawesome/free-solid-svg-icons";
import { Card, CardHeader, CardContent,  } from "@material-ui/core";
class Graph extends Component {
	state = {
		type: "bar",
		icon: "",
	};
	buildData(graphData, pieValues) {
		let temp = [];
		if (pieValues !== undefined) {
			temp = [...pieValues];
		} else {
		}
		let data = {
			type: this.state.type,
			datasets: [
				{
					data: graphData,
					labels: [],
					backgroundColor: [
						"rgba(255, 99, 132, 0.2)",
						"rgba(54, 162, 235, 0.2)",
						"rgba(255, 206, 86, 0.2)",
						"rgba(75, 192, 192, 0.2)",
						"rgba(153, 102, 255, 0.2)",
						"rgba(255, 159, 64, 0.2)",
					],
					borderColor: [
						"rgba(255, 99, 132, 1)",
						"rgba(54, 162, 235, 1)",
						"rgba(255, 206, 86, 1)",
						"rgba(75, 192, 192, 1)",
						"rgba(153, 102, 255, 1)",
						"rgba(255, 159, 64, 1)",
					],
					borderWidth: 1,
				},
			],
			labels: temp === undefined ? [] : temp,
		};
		return data;
	}

	buildOptions(title) {
		let options = {
			legend: { display: false },
			responsive: true,
			scales: {
				y: {
					beginAtZero: true,
				},
			},
			animation: {
				// general animation time
			},
		};
		return options;
	}

	handleTypeClick = (e) => {
		this.setState({ type: e.currentTarget.id });
	};

	renderIcon = () => {
		const { type } = this.state;
		if (type === "bar") {
			return <FontAwesomeIcon icon={fa.faChartBar} />;
		} else if (type === "line") {
			return <FontAwesomeIcon icon={fa.faChartLine} />;
		} else if (type === "pie") {
			return <FontAwesomeIcon icon={fa.faChartPie} />;
		}
	};

	renderType = (data, title) => {
		var { type } = this.state;
		if (type === "bar") {
			return <Bar id={title} data={this.buildData(data)} options={this.buildOptions(title)} />;
		} else if (type === "line") {
			return <Line data={this.buildData(data)} options={this.buildOptions(title)} />;
		} else if (type === "pie") {
			let pieLabels = data.map((x) => Object.values(x)[0]);
			let pieData = data.map((x) => Object.values(x)[1]);
			return <Pie id={title} data={this.buildData(pieData, pieLabels)} options={this.buildOptions(title)} />;
		}
	};
	render() {
		const { data, title } = this.props;

		return (
			<React.Fragment>
				<Card>
					<CardHeader
						className='bg-dark text-white'
						title={
							<>
								<span>{this.renderIcon()}</span> <span>{title}</span>
							</>
						}>
						{" "}
					</CardHeader>
					<CardContent>
						<div className='row mb-4 justify-content-start'>
							<div className='btn-group' role='group' aria-label='Basic mixed styles example'>
								<button className={" btn btn-dark "} id='line' onClick={this.handleTypeClick}>
									Line
								</button>
								<button className={" btn btn-dark"} id='bar' onClick={this.handleTypeClick}>
									Bar
								</button>
								<button className={" btn btn-dark"} id='pie' onClick={this.handleTypeClick}>
									Pie
								</button>
							</div>
						</div>
						{this.renderType(data, title)}
					</CardContent>
				</Card>
			</React.Fragment>
		);
	}
}

export default Graph;
