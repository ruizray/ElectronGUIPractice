import React, { Component } from 'react'
import Graph from '../common/Graph'
import Table from '../common/Table/Table'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import html2canvas from 'html2canvas'
import { jsPDF } from 'jspdf'
import DataRequestForm from './DataRequestForm'

class Analytics extends Component {
  state = {
    data1: [],
    data2: [],
    type: 'bar',
    type2: 'bar',
    label1: 'Total Site Visits from - to - ',
    label2: 'Top Pages',
    startDate: '',
    endDate: '',
    pagecount: 0,
    errors: {}
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

  parseReject = response => {
    if (response.result.error.code === 401) {
      alert(
        'Request is missing required authentication credential\nExpected OAuth 2 access token, login cookie or other valid authentication credential.'
      )
    }
    //message: "Request is missing required authentication credential. Expected OAuth 2 access token, login cookie or other valid authentication credential. See https://developers.google.com/identity/sign-in/web/devconsole-project."
  }

  parseResults = response => {
    console.log(response)
    const queryResult = response.result.reports[0].data.rows
    const queryResult2 = response.result.reports[1].data.rows
    let data1 = []
    let data2 = []
    queryResult.map(row => {
      const dateSting = row.dimensions[0]
      const formattedDate = `${dateSting
        .substring(0, 4)
        .trim()
        .split('\n')}-${dateSting.substring(4, 6).split('\n')}-${dateSting
        .substring(6, 8)
        .split('\n')}`
      data1.push({ x: formattedDate, y: row.metrics[0].values[0].trim() })
    })
    queryResult2.map(row => {
      const dateSting = row.dimensions[0]
        .replace('- Bolingbrook, IL', '')
        .trim()
      data2.push({ x: dateSting, y: row.metrics[0].values[0].trim() })
    })
    const label2 = 'Top ' + this.state.pagecount + ' Pages'
    data2.sort((firstItem, secondItem) => secondItem.y - firstItem.y)
    data2 = data2.splice(1, this.state.pagecount)
    this.setState({ data1, data2, label2 })
  }

  queryReport = () => {
    window.gapi.client
      .request({
        path: '/v4/reports:batchGet',
        root: 'https://analyticsreporting.googleapis.com/',
        method: 'POST',
        body: {
          reportRequests: [
            {
              viewId: '138961309', //enter your view ID here
              dateRanges: [
                {
                  startDate: this.state.startDate,
                  endDate: this.state.endDate
                }
              ],
              metrics: [
                {
                  expression: 'ga:users'
                }
              ],
              dimensions: [
                {
                  name: 'ga:date'
                }
              ]
            },
            {
              viewId: '138961309', //enter your view ID here
              dateRanges: [
                {
                  startDate: this.state.startDate,
                  endDate: this.state.endDate
                }
              ],
              metrics: [
                {
                  expression: 'ga:pageviews'
                }
              ],
              dimensions: [
                {
                  name: 'ga:pageTitle'
                }
              ]
            }
          ]
        }
      })
      .then(this.parseResults, this.parseReject)
  }

  handleSubmit = pagecount => {
    if(!this.state.startDate || !this.state.endDate){
      alert("Must selected date ranges to request data")
    }
    this.setState({ pagecount })
    
    this.queryReport()
  }

  handleDownload = () => {
    var input = document.querySelector('#pdf')
    html2canvas(input, { scrollY: -window.scrollY }).then(canvas => {
      const imgData = canvas.toDataURL('image/png')
      const pdf = new jsPDF({})
      const imgProps = pdf.getImageProperties(imgData)
      const pdfWidth = pdf.internal.pageSize.getWidth()
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight)
      pdf.save('download.pdf')
    })
  }

  columns = [
    { path: 'x', label: 'Date' },
    { path: 'y', label: 'Total Visits' }
  ]

  columns2 = [
    { path: 'z', label: 'Page Ranking' },
    { path: 'x', label: 'Page Title' },
    { path: 'y', label: 'Page Visits' }
  ]

  handleDate = e => {
    console.log(e[0], e[1])
    var date1 = this.formatDate(e[0])
    var date2 = this.formatDate(e[1])
    const label1 = 'Total site visits from: ' + date1 + ' to ' + date2
    this.setState({ startDate: date1, endDate: date2, label1 }, () => {})
  }

  render() {
    console.log(this.today);
    return (
      <main id="pdf">
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

          <div className="row" >
            <div  className="col-md-3 mb-4">
              <Calendar
                onChange={this.handleDate}
                selectRange
                returnValue="range"
                maxDate={new Date().today}
              />
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
      </main>
    )
  }
}

export default Analytics
