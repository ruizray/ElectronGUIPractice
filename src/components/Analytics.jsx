import React, { Component } from "react";
import Graph from "../common/Graph";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import DataRequestForm from "./Database/DataRequestForm";
import WbIncandescentIcon from '@material-ui/icons/WbIncandescent';
import UserContext, { UserConsumer } from "./../contexts/UserContext";
import { Card, CardHeader,  CardContent } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
class Analytics extends Component {
	state = {
		data1: [],
		data2: [],
		rows1: [],
		rows2: [],
		type: "bar",
		type2: "bar",
		label1: "Total Site Visits from - to - ",
		label2: "Top Pages",
		startDate: "",
		endDate: "",
		pagecount: 0,
		errors: {},
	};

	componentDidMount() {}

	formatDate(date) {
		var day = date.getDate();
		var month = date.getMonth() + 1;

		if (day < 10) {
			day = "0" + day;
		}
		if (month < 10) {
			month = "0" + month;
		}
		return date.getFullYear() + "-" + month + "-" + day;
	}

	parseReject = (response) => {
		if (response.result.error.code === 401) {
			alert(
				"Request is missing required authentication credential\nExpected OAuth 2 access token, login cookie or other valid authentication credential."
			);
		}
		//message: "Request is missing required authentication credential. Expected OAuth 2 access token, login cookie or other valid authentication credential. See https://developers.google.com/identity/sign-in/web/devconsole-project."
	};

	parseResults = (response) => {
		const queryResult = response.result.reports[0].data.rows;
		const queryResult2 = response.result.reports[1].data.rows;
		let counter = 0;
		let rows1 = [];
		let rows2 = [];
		let data1 = queryResult.map((row) => {
			const dateSting = row.dimensions[0];
			const formattedDate = `${dateSting.substring(0, 4).trim().split("\n")}-${dateSting.substring(4, 6).split("\n")}-${dateSting
				.substring(6, 8)
				.split("\n")}`;
			rows1.push({ id: counter, col1: formattedDate, col2: row.metrics[0].values[0].trim() });
			counter++;
			return { x: formattedDate, y: row.metrics[0].values[0].trim() };
		});
		counter = 1;
		console.log(queryResult2)
		let data2 = queryResult2.map((row) => {
			const dateSting = row.dimensions[0].replace("- Bolingbrook, IL", "").trim();
			rows2.push({ id: counter, col1: counter, col2: dateSting, col3: row.metrics[0].values[0].trim() });
			counter++;
			return { x: dateSting, y: row.metrics[0].values[0].trim() };
		});
		const label2 = "Top " + this.state.pagecount + " Pages";
		rows2 = rows2.splice(0, this.state.pagecount)
		data2 = data2.splice(0, this.state.pagecount);
		this.setState({ data1, data2, label2, rows1, rows2 });
	};

	queryReport = () => {
		window.gapi.client
			.request({
				path: "/v4/reports:batchGet",
				root: "https://analyticsreporting.googleapis.com/",
				method: "POST",
				body: {
					reportRequests: [
						{
							viewId: "138961309", //enter your view ID here
							dateRanges: [
								{
									startDate: this.state.startDate,
									endDate: this.state.endDate,
								},
							],
							metrics: [
								{
									expression: "ga:users",
								},
							],
							dimensions: [
								{
									name: "ga:date",
								},
							],
						},
						{
							viewId: "138961309", //enter your view ID here
							dateRanges: [
								{
									startDate: this.state.startDate,
									endDate: this.state.endDate,
								},
							],
							metrics: [
								{
									expression: "ga:pageviews",
								},
							],
							orderBys: [
								
								{ fieldName: "ga:pageviews", sortOrder: "DESCENDING" },
							],
							dimensions: [
								{
									name: "ga:pageTitle",
								},
							],
						},
					],
				},
			})
			.then(this.parseResults, this.parseReject);
	};

	handleSubmit = (pagecount) => {
		if (!this.state.startDate || !this.state.endDate) {
			alert("Must selected date ranges to request data");
		}
		this.setState({ pagecount });

		this.queryReport();
	};

	handleDownload = () => {
		var input = document.querySelector("#pdf");
		html2canvas(input, { scrollY: -window.scrollY }).then((canvas) => {
			const imgData = canvas.toDataURL("image/png");
			const pdf = new jsPDF({});
			const imgProps = pdf.getImageProperties(imgData);
			const pdfWidth = pdf.internal.pageSize.getWidth();
			const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
			pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
			pdf.save("download.pdf");
		});
	};

	columns1 = [
		{ field: "col1", headerName: "Date", width: 150 },
		{ field: "col2", headerName: "Total Visits", width: 150 },
	];

	columns2 = [
		{ field: "col1", headerName: "Page Rank", width: 150 },
		{ field: "col2", headerName: "Page Title", width: 150 },
		{ field: "col3", headerName: "Page Visits", width: 150 },
	];

	handleDate = (e) => {
		var date1 = this.formatDate(e[0]);
		var date2 = this.formatDate(e[1]);
		const label1 = "Total site visits from: " + date1 + " to " + date2;
		this.setState({ startDate: date1, endDate: date2, label1 }, () => {});
	};

	render() {
		return (
			<UserConsumer>
				{(UserContext) => (
					<main id='pdf'>
						<header className='bg-dark'>
							<div className='container-xl px-'>
								<div className='d-flex justify-content-between align-items-center'>
									<h1 className='text-white py-3 mb-0 display-6'>Analytics Overview</h1>
									<div className='ms-4'>
										<button className='btn btn-text-white btn sm me-2' type='button'>
											<WbIncandescentIcon></WbIncandescentIcon>Learning
										</button>
										
									</div>
								</div>
							</div>
						</header>
						<div className='container-xxl pt-5'>
							<div className='alert alert-primary alert-dismissible fade show p-4 mb-5' role='alert'>
								<div className='d-flex align-items-center'>
									<i className='material-icons-outlined me-3'>info</i>
									<div className='me-4'>
										One of your properties is now receiving data.
										<a className='alert-link' href='#!'>
											Check it now.
										</a>
									</div>
								</div>
								<button
									className='btn-close p-4'
									type='button'
									data-bs-dismiss='alert'
									aria-label='Close'
									style={{ top: "4px" }}></button>
							</div>
							<div className='row gx-5'>
								<div className='col-lg-4 mb-5'>
									<Card className='card'>
										<CardHeader className='card-header bg-dark text-white' title='Date Range'></CardHeader>
										<CardContent className='text-align:center'>
											<div style={{ textAlign: "-webkit-center" }}>
												<Calendar onChange={this.handleDate} selectRange returnValue='range' maxDate={new Date().today} />
											</div>
										</CardContent>
									</Card>
								</div>
								<div className='col-lg-8 mb-5'>
									<DataRequestForm onSubmit={this.handleSubmit} onDownloadClick={this.handleDownload} />
								</div>
							</div>

							<div className='row gx-5'>
								<div className='col-xl-9 mb-5'>
									<Graph title={this.state.label1} data={this.state.data1} />
								</div>
								<div className='col-xl-3 mb-5'>
									<Card>
										<CardHeader className='card-header bg-dark text-white' title={this.state.label1}></CardHeader>

										<CardContent>
											<DataGrid
												style={{ width: "100%" }}
												disableExtendRowFullWidth={true}
												autoHeight
												pageSize={7}
												rows={this.state.rows1}
												columns={this.columns1}
											/>
										</CardContent>
									</Card>
								</div>
							</div>

							<div className='row gx-5'>
								<div className='col-xl-7 mb-5'>
									<Graph title={this.state.label2} data={this.state.data2} />
								</div>

								<div className='col-xl-5 mb-5'>
									<Card>
										<CardHeader className='card-header bg-dark text-white' title={this.state.label2}></CardHeader>

										<CardContent>
											<DataGrid autoHeight pageSize={10} rows={this.state.rows2} columns={this.columns2} />
										</CardContent>
									</Card>
								</div>
							</div>
						</div>
					</main>
				)}
			</UserConsumer>
		);
	}
}

Analytics.contextType = UserContext;
export default Analytics;

{
	/* <main id="pdf">
        <div className="container-fluid px-4">
          <h1 className="mt-4">Google Analytics Data For VOB Website</h1>
          <ol className="breadcrumb mb-4">
            <li className="breadcrumb-item">
              <a href="index.html">Dashboard</a>
            </li>
            <li className="breadcrumb-item active">Google Analytics</li>
          </ol>
          
          <div className="card mb-4">
            <div className="card-body">
              This application gets Google Analytics Data using Google Analytics
              Reporting API v4. In order to retrieve data, users must sign into
              a Google account that is allowed to retrieve data from the server.
              Currently, only Ray and James are the only available users.
              <ol>
                <li>Select Date range on calendar</li>
                <li>Fill out other request options</li>
                <li>Click Send Request Button</li>
                <li>Click Download Report Button</li>
              </ol>
            </div>
          </div>

          <div className="row">
            <div className="col-md-3 mb-4">
             <Card className="card">
            <CardHeader className="card-header bg-primary text-white" title="Date Range"></CardHeader>
            <CardContent className="text-align:center">
               <Calendar
                onChange={this.handleDate}
                selectRange
                returnValue="range"
                maxDate={new Date().today}
              />
            </CardContent>
            
          </Card>
            </div>
            <div className="col-md-9">
            
              <DataRequestForm
                onSubmit={this.handleSubmit}
                onDownloadClick={this.handleDownload}
              />
            </div>
          </div>
          <div className="row my-4">
            <div className="col-md-6">
              <Graph title={this.state.label1} data={this.state.data1} />
            </div>
            <div className="col-md-6">
              <Graph title={this.state.label2} data={this.state.data2} />
            </div>
          </div>

          <div className="row  my-4">
            <div className="col-md-6">
              <Table columns={this.columns} data={this.state.data1} />
            </div>
            <div className="col-md-6">
              <Table columns={this.columns2} data={this.state.data2} />
            </div>
          </div>
        </div>
      </main> */
}
