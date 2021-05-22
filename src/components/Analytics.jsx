import React, { Component } from 'react'
import GoogleAuth from './GoogleAuth'
import Graph from '../common/Graph';
import Table from '../common/Table';


class Analytics extends Component {
  state = {
    data: [],
    type: 'bar',
    buttonState: true,
    label: "Weekly Page Visits",
    nextSaturday: '',
  }
  formatDate(date) {
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
  }

  parseResults = (response) => {
    const queryResult = response.result.reports[0].data.rows;
    let data = [];
    const result = queryResult.map((row) => {
      const dateSting = row.dimensions[0];
      const formattedDate = `${dateSting.substring(0, 4).trim().split('\n')}-${dateSting.substring(4, 6).split('\n')}-${dateSting.substring(6, 8).split('\n')}`;
      console.log(formattedDate)
      data.push({ x: formattedDate, y: row.metrics[0].values[0].trim() })



    });
    console.log(data)
    this.setState({ data });
  };



  queryReport = () => {
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
                    startDate: "10daysAgo",
                    endDate: "today",
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
            ],
          },
        }
      )
      .then(this.parseResults, console.error.bind(console));
  };

  handleClick = () => {
    var d = new Date();
    d.setDate(d.getDate() + (1 + 5 - d.getDay()) % 5);
    const nextFriday = this.formatDate(d);
    var weekAgo = new Date(d)
    weekAgo.setDate(d.getDate() - 6)
    const lastSunday = this.formatDate(weekAgo)

    this.setState({ nextFriday, lastSunday })
    console.log(this.state)
    this.queryReport()
  }

  handleTypeClick = e => {
    this.setState({ type: e.currentTarget.id })
  }
  columns = [{ path: 'x', label: 'Column1' }, { path: 'y', label: 'Column2' }]
  render() {
    return (
      <div>
        <div className="Button">
          <GoogleAuth /><br />
          <button onClick={this.handleClick}>Send Request</button>
          <button id="line" onClick={this.handleTypeClick}>Change To Line</button>
          <button id="bar" onClick={this.handleTypeClick}>Change To Bar</button>
        </div>
        <div> <Table columns={this.columns} data={this.state.data} />
          <Graph title={this.state.label} type={this.state.type} data={this.state.data} />

        </div>
      </div>
    );
  }
}

export default Analytics;


