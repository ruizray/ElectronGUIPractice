import React, { useState, useEffect, Component } from "react";


class Report extends Component {


    componentDidMount() {
        this.queryReport()
    }

    state = { data: [] }

    displayResults = (response) => {
        console.log(JSON.stringify(response.result, null, 2))
        console.log(response.result)
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
            })
            .then(this.displayResults, console.error.bind(console));
    };



    render() {
        return (<div></div>);
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



