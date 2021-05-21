import React, { useState, useEffect, Component } from "react";


class Report extends Component {

    formatDate(date) {
        return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
    }
    componentDidMount() {

       

    }

    state = {
        data: [],
        nextSaturday: '',


    }

    displayResults = (response) => {

        const queryResult = response.result.reports[0].data.rows;
        const result = queryResult.map((row) => {
            const dateSting = row.dimensions[0];
            const formattedDate = `${dateSting.substring(0, 4)}
        -${dateSting.substring(4, 6)}-${dateSting.substring(6, 8)}`;
            return {
                date: formattedDate,
                visits: row.metrics[0].values[0],
            };
        });
        this.setState({ data: response.result });

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
            .then(this.displayResults, console.error.bind(console));
    };

    handleClick = () => {
        var d = new Date();
        d.setDate(d.getDate() + (1 + 5 - d.getDay()) % 5);
        const nextFriday = this.formatDate(d);

        var weekAgo = new Date(d)
        weekAgo.setDate(d.getDate() - 6)
        const lastSunday = this.formatDate(weekAgo)

        console.log(lastSunday, nextFriday)

        this.queryReport()
    }


    render() {
        return (<div>
            <button className="demo-button" onClick={this.handleClick}>Send Request</button></div>);
    }



}

export default Report;


// const Report = () => {
//     const [data, setData] = useState([]);

//     useEffect(() => {
//         const queryReport = () => 

//         const displayResults = (response) => {//(2)
//             console.log(JSON.stringify(response.result, null, 2))
//             console.log(response.result)
//             const queryResult = response.result.reports[0].data.rows;
//             const result = queryResult.map((row) => {
//                 const dateSting = row.dimensions[0];
//                 const formattedDate = `${dateSting.substring(0, 4)}
//         -${dateSting.substring(4, 6)}-${dateSting.substring(6, 8)}`;
//                 return {
//                     date: formattedDate,
//                     visits: row.metrics[0].values[0],
//                 };
//             });
//             setData(result);
//         };

//             queryReport();
//         }, []);

//     return data.map((row) => (

//         <div key={row.date}>{`${row.date}: ${row.visits} visits`}</div>//(3)
//     ));
// };



