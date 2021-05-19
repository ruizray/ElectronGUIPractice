import React, { Component } from "react";
import Graph from './components/Graph'


class Stuff extends Component {
    
    constructor() {
        super();
        
        this.state = {
            lines: [],
            graphStart: "",
            nextGraph: "",
            previousGraph: "",
            dataSets: [],
            sendGraph: [],
            graphs: 0,
            graphPos: 0,
        }
    }
    
    enableButtons = (button) => {
        button.disabled = false;
        console.log(button)
    }
    fileSelectHandler = async (e) => {
        e.preventDefault();
        console.log(e)
        var reader = new FileReader();
        var file = e.target.files[0];
        var liness;

        reader.onload = (e) => {
            liness = e.target.result.split('\n');
            this.setState({ lines: liness })
            this.setState({ graphStart: "true" })
            this.setState({ nextGraph: "true" })
            console.log(liness)

        };


        reader.readAsText(file);
    }

    graphStart = (e) => {
        if (this.checkBoxes(document.querySelectorAll(".chartType:checked")) == false) {
            return;
        }

        // settings.set('graph', {
        //     state: this.state    ,
        // })
        
        this.CreateGraphs()
        console.log(this.state)
        var firstGraph = this.state.dataSets[this.state.graphPos].data;
        console.log(firstGraph)
        this.wrapState(firstGraph)
        console.log(this.state)
    }

    graphNext= (e) => {
        console.log(this.state)
        var temp = this.state.graphPos;
        temp++;
        console.log(this.state)

        this.setState({graphPos: temp})
        var firstGraph = this.state.dataSets[temp].data;
        this.wrapState(firstGraph)
    }

    wrapState = (state) => {
        let
            data = {
                datasets: [{
                    data: state,
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
            };

        this.setState({ sendGraph: data });
    }



    CreateGraphs = () => {
        var lines = this.state.lines
        console.log(lines)
        this.state.lines.shift();
        this.state.lines.shift();
        this.state.lines.shift();
        this.state.lines.shift();
        while (this.state.lines.length != 0) {
            var groupNum = this.state.lines.shift();
            var group = this.state.lines.splice(0, groupNum);
            this.readLines(group)
            this.state.lines.shift();
            let temp = this.state.graphs + 1;
            this.setState({graphs: temp});
        }
    }
    readLines = (group) => {
        var line;
        var tempdata = { data: [], label: "", sortedData: [] }

        for (var i = 0; i < group.length; i++) {
            line = group[i].split(',');
            tempdata.data.push({ x: line[1] + ", " + line[2], y: line[3] })
        }
        tempdata.label = line[0]
        var temp = this.state.dataSets.push(tempdata)
        console.log(temp)
        this.setState({ dataSets: temp })
      
    }

    checkBoxes = (boxes) => {
        if (boxes.length > 1) {
            alert("Too many boxes checked");
            return false;
        } else if (boxes.length == 0) {
            alert("No boxes checked!");
            return false;
        }
        return true
    }



    render() {
        //let btn_class = this.state.isOpen ? "button-graph" : "button-graph is-open";

        return (
            <React.Fragment>
                <section id="windows-section" className="section js-section u-category-windows">
                    <header className="section-header">
                        <div className="section-wrapper">
                            <h1>

                                Graphing Data
        </h1>

                        </div>
                    </header>

                    <div className="demo">
                        <div className="demo-wrapper is-open">
                            <button id="new-graph-toggle" onClick={() => this.isOpen} className="js-container-target demo-toggle-button">Create a graph
          <div className="demo-meta u-avoid-clicks">Supports: Win, macOS, Linux <span className="demo-meta-divider">|</span>
            Process: Main</div>
                            </button>
                            <p>In this demo we create a new Graph (via the <code>renderChart.js</code> script) and provide a source file
          <code>input.txt</code> that will
          generate the graph
        </p>
                            <div className="demo-box">
                                <div style={{ marginBottom: '20px' }} className="row">
                                    <div className="col-md-12">
                                        <Graph data={this.state.sendGraph} />

                                    </div>

                                </div>

                                <div id="fileSelectorContainer" style={{ marginBottom: '20px', marginLeft: '2px' }} className="row">
                                    <input type="file" id="file-selector" onChange={(e) => this.fileSelectHandler(e)}></input>
                                </div>

                                <div style={{ marginBottom: '10px' }, { marginLeft: '2px' }} id="graphTitleContainer" className="row">
                                    <label style={{ marginright: '10px' }} htmlFor="graphTitle">Graph Title: </label>
                                    <input type="text" id="graphTitle" name="graphTitle" value=""></input>
                                </div>




                                <h5>Sort Graph</h5>
                                <div id="sortGraphBox" className="row">
                                    <div className="col-md-3">
                                        <input type="checkbox" id="sortedBox" name="sortedBox" onChange={(e) => this.checkBoxes(e)} value="false"></input>
                                        <label htmlFor="sortedBox"> Sorted</label>
                                    </div>

                                </div>


                                <h5>Chart Type</h5>
                                <div id="chartTypeBoxes" style={{ marginBottom: '10px' }} className="row">
                                    <div className="col-md-3">
                                        <input type="checkbox" className="chartType" id="barBox" ></input>
                                        <label htmlFor="barBox">Bar Chart</label>
                                    </div>
                                    <div className="col-md-3">
                                        <input type="checkbox" className="chartType" id="lineBox" ></input>
                                        <label htmlFor="barBox">Line Chart</label>
                                    </div>
                                    <div className="col-md-3">
                                        <input type="checkbox" className="chartType" id="pieBox" ></input>
                                        <label htmlFor="pieBox">Pie Chart</label>
                                    </div>
                                </div>

                                <h5>Graph Controls</h5>
                                <div id="GraphControls" style={{ marginBottom: '10px' }} className="row">
                                    <div className="col-md-12">
                                        <button style={{ width: '100%' }} className="demo-button button-group" onClick={(e) => this.graphStart(e)} id="graphStart" disabled={!this.state.graphStart}>Start Graph</button>
                                    </div>
                                </div>
                                <div style={{ marginBottom: '10px' }} className="row">
                                    <div className="col-md-4">
                                        <button style={{ width: '100%' }} className="demo-button button-group" id="prevGraph" disabled>Previous Graph</button>
                                    </div>
                                    <div className="col-md-4"><button style={{ marginBottom: '10px' }, { width: '100%' }} className="demo-button " id="sortGraph"
                                        disabled>Sort
              Graph</button></div>
                                    <div className="col-md-4">
                                        <button style={{ width: '100%' }} className="demo-button button-group" onClick={(e) => this.graphNext(e)} id="nextGraph" disabled={!this.state.nextGraph}>Next Graph</button>
                                    </div>
                                </div>


                                <h5>Animation Controls</h5>
                                <div id="animationControls" style={{ marginbottom: '10px' }} className="row">
                                    <div className="col-md-6">
                                        <button style={{ marginBottom: '10px' }, { width: '100%' }} className="demo-button " id="startAnimation" disabled>Start Animation</button>
                                    </div>


                                    <div className="col-md-6"><button style={{ marginBottom: '10px' }, { width: '100%' }} className="demo-button " id="endAnimation"
                                        disabled>End Animation</button></div>
                                </div>


                                <h5>input.txt</h5>
                                <pre><code data-path="\test\input.txt"></code></pre>
                            </div>
                        </div>
                    </div>

                    <div className="demo">
                        <div className="demo-wrapper">
                            <button id="new-window-hangs-demo-toggle" className="js-container-target demo-toggle-button">Relaunch window after
                            the process hangs
          <div className="demo-meta u-avoid-clicks">Supports: Win, macOS, Linux <span className="demo-meta-divider">|</span>
            Process: Main</div>
                            </button>
                            <div className="demo-box">
                                <div className="demo-controls">
                                    <button className="demo-button" id="process-hang">View Demo</button>
                                </div>
                                <p>In this demo we create a new window (via the <code>remote</code> module) and provide a link that will force
            the process to hang using
            <code>process.hang()</code>.
          </p>
                                <p>The window is listening for the process to become officially unresponsive (this can take up to 30 seconds).
                                When this event occurs it
            prompts the user with two options: reload or close.</p>

                                <h5>Renderer Process</h5>
                                <pre><code data-path="renderer-process/windows/renderChart.js"></code></pre>

                                <div className="demo-protip">
                                    <h2>ProTip</h2>
                                    <strong>Wait for the process to become responsive again.</strong>
                                    <p>A third option in the case of a process that is hanging is to wait and see if the problem resolves,
                                    allowing the process to become
              responsive again. To do this, use the <code>BrowserWindow</code> event 'responsive' as shown below.</p>
                                    <pre><code className="language-js">win.on('responsive', function () {
                                        // Do something when the window is responsive again
                                    })</code></pre>
                                </div>
                            </div>
                        </div>
                    </div>

                </section>
            </React.Fragment>


        );
    }
}

export default Stuff;