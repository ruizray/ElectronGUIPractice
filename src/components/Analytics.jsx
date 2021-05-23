import React, { Component } from 'react'
import GoogleAuth from './GoogleAuth'
import Graph from '../common/Graph';
import Table from '../common/Table';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Input from './../common/Input';
import html2canvas from 'html2canvas';
import { saveAs } from 'file-saver';
import { jsPDF } from 'jspdf'

class Analytics extends Component {
  state = {
    data1: [],
    data2: [],
    type: 'bar',
    type2: 'bar',
    label1: "Total Site Visits from - to - ",
    label2: "Top Pages",
    startDate: '',
    endDate: '',
  }
  formatDate(date) {
    var day = date.getDate()
    var month = date.getMonth() + 1

    if (day < 10) {
      day = '0' + day
    }
    if (month < 10) {
      month = '0' + month
    }


    return date.getFullYear() + '-' + month + '-' + day
  }

  parseResults = (response) => {
    console.log(response)
    const queryResult = response.result.reports[0].data.rows;
    const queryResult2 = response.result.reports[1].data.rows;
    let data1 = [];
    let data2 = [];
    const result = queryResult.map((row) => {
      const dateSting = row.dimensions[0];
      const formattedDate = `${dateSting.substring(0, 4).trim().split('\n')}-${dateSting.substring(4, 6).split('\n')}-${dateSting.substring(6, 8).split('\n')}`;
      console.log(formattedDate)
      data1.push({ x: formattedDate, y: row.metrics[0].values[0].trim() })
    });
    const result1 = queryResult2.map((row) => {
      const dateSting = row.dimensions[0].replace('- Bolingbrook, IL', '').trim();
      data2.push({ x: dateSting, y: row.metrics[0].values[0].trim() })
    });
    console.log(data1)
    console.log(data2)
    data2.sort((firstItem, secondItem) => (secondItem.y - firstItem.y));
    data2 = data2.splice(1, 7);
    console.log(data2)
    this.setState({ data1, data2 });
  };



  queryReport = (sat) => {

    window.gapi.client
      .request(
        {
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
                    name: "ga:date"
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
                dimensions: [
                  {
                    name: "ga:pageTitle"
                  },
                ],

              },
            ],

          },
        }
      )
      .then(this.parseResults, console.error.bind(console));
  };

  handleClick = () => {
    this.queryReport()
  }

  handleDownload = () => {
    var input = document.querySelector("#pdf")
    html2canvas(input, {scrollY: -window.scrollY})
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF({
         
        });
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save('download.pdf');
      });
  }



  columns = [{ path: 'x', label: 'Date' }, { path: 'y', label: 'Total Visits' }]
  columns2 = [{ path: 'z', label: 'Page Ranking' }, { path: 'x', label: 'Page Title' }, { path: 'y', label: 'Page Visits' }]

  handleDate = (e) => {
    console.log(e[0], e[1])
    var date1 = this.formatDate(e[0])
    var date2 = this.formatDate(e[1])
    const label1 = 'Total site visits from: ' + date1 + " to " + date2
    this.setState({ startDate: date1, endDate: date2, label1 }, () => {
    })


  }

  render() {
    return (

      <main id="pdf">

        <div class="container-fluid px-4">

          <GoogleAuth />
          <h1 className="mt-4">Tables</h1>
          <ol className="breadcrumb mb-4">
            <li className="breadcrumb-item"><a href="index.html">Dashboard</a></li>
            <li className="breadcrumb-item active">Tables</li>
          </ol>
          <div class="card mb-4">
            <div class="card-body">
              DataTables is a third party plugin that is used to generate the demo table below. For more information about DataTables, please visit the
                      <a target="_blank" href="https://datatables.net/">official DataTables documentation</a>
                      .
                  </div>
          </div>



          <div className="row mx-4 ">
            <div className="col-md-3 mb-4">
              <Calendar onChange={this.handleDate} selectRange returnValue='range' />

            </div>
            <div className="col-md-9">
              <div class="card mb-4">
                <div class="card-header">
                  <i class="fas fa-table me-1"></i>
                      Request Settings
                  </div>
                <div className="row mx-4 my-4">


                  <form onSubmit={this.handleSubmit} >

                    <Input name="username" label="Username" />
                    <Input name="password" label="Password" />

                    <button onClick={this.handleClick} className="btn btn-primary mt-2">Send Request</button>
                    <button onClick={this.handleDownload} className="btn btn-primary mt-2">Download Report</button>
                  </form>
                </div>
              </div>



            </div>
          </div>
          <div className="row mx-4 my-4">
            <div className="col-md-6">
              <Graph title={this.state.label1} data={this.state.data1} />
            </div>
            <div className="col-md-6">
              <Graph title={this.state.label2} data={this.state.data2} />
            </div>
          </div>

          <div className="row mx-4 my-4">
            <div className="col-md-6">
              <Table columns={this.columns} data={this.state.data1} />
            </div>
            <div className="col-md-6">
              <Table columns={this.columns2} data={this.state.data2} />
            </div>
          </div>
        </div>
      </main>


    );
  }
}

export default Analytics;


