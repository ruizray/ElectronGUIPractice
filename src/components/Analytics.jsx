import React, { Component } from 'react'
import GoogleAuth from './GoogleAuth'
import Graph from '../common/Graph';
import Table from '../common/Table';


class Analytics extends Component {
  state = {
    data1: [],
    data2: [],
    type: 'bar',
    type2: 'bar',
    label: "",
    nextSaturday: '',
  }
  formatDate(date) {
    return date.getFullYear() + '-' + '0' + (date.getMonth() + 1) + '-' + date.getDate()
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
    data2 = data2.splice(1, 8);
    console.log(data2)
    this.setState({ data1, data2 });
  };



  queryReport = (sat) => {
    console.log(sat)
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
                    startDate: "6daysAgo",
                    endDate: this.state.nextSaturday,
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
                    startDate: "6daysAgo",
                    endDate: this.state.nextSaturday,
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
    var d = new Date();
    d.setDate(d.getDate() + (1 + 5 - d.getDay()) % 5);
    const nextSaturday = this.formatDate(d);
    var weekAgo = new Date(d)
    weekAgo.setDate(d.getDate() - 6)
    const lastSunday = this.formatDate(weekAgo)
    const label = 'Total site visits from: ' + lastSunday + " to " + nextSaturday
    this.setState({ nextSaturday, lastSunday, label }, () => {
      console.log(this.state.nextSaturday);
      this.queryReport()
    });



  }

  handleTypeClick = e => {
    this.setState({ type: e.currentTarget.id })
  }
  handleTypeClick2 = e => {
    this.setState({ type2: e.currentTarget.id })
  }
  columns = [{ path: 'x', label: 'Date' }, { path: 'y', label: 'Total Visits' }]
  columns2 = [{ path: 'x', label: 'Page Title' }, { path: 'y', label: 'Page Visits' }]
  render() {
    return (
      <div>
        <div className="Button">
          <GoogleAuth /><br />
          <button onClick={this.handleClick}>Send Request</button>
          <button id="line" onClick={this.handleTypeClick}>Change To Line</button>
          <button id="bar" onClick={this.handleTypeClick}>Change To Bar</button>
        </div>
        <div className="row">
          <div className="col-md-8">
            <Graph title={this.state.label} type={this.state.type} data={this.state.data1} />
          </div>
          <div style={{ alignSelf: 'center' }} className="col-md-4">
            <Table columns={this.columns} data={this.state.data1} />
          </div>
        </div>

        <div>
          <button id="line" onClick={this.handleTypeClick2}>Change To Line</button>
          <button id="bar" onClick={this.handleTypeClick2}>Change To Bar</button>
          <button id="pie" onClick={this.handleTypeClick2}>Change To Pie</button>
        </div>
        <div className="row">
          <div className="col-md-8">
            <Graph title={this.state.label2} type={this.state.type2} data={this.state.data2} />
          </div>

          <div style={{ alignSelf: 'center' }} className="col-md-4">
            <Table columns={this.columns2} data={this.state.data2} />
          </div>
        </div>
      </div>
    );
  }
}

export default Analytics;


