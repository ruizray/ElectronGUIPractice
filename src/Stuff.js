import React, { Component } from "react";
import ScriptTag from 'react-script-tag'

class Stuff extends Component {
    componentDidMount() {
        const script = document.createElement("script");
        script.src = "./renderChart.js";
        script.async = true;


        document.body.appendChild(script);
    }

    constructor() {
        super();
        this.state = {
            active: true
        }

    }
    isOpen = () => {
        console.log("Test")
        // this.setState({ active: !this.state.active })
    }
    render() {
        //let btn_class = this.state.isOpen ? "button-graph" : "button-graph is-open";

        return (
            <React.Fragment>
                <section id="windows-section" class="section js-section u-category-windows">
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
                                <div className="row">
                                    <div className="col-md-12">
                                        <canvas style={{ width: '100%' }} id="myChart" height="200"></canvas>
                                    </div>

                                </div>

                                <div id="fileSelectorContainer" style={{ marginBottom: '20px' }, { marginLeft: '2px' }} className="row">
                                    <input type="file" id="file-selector"></input>
                                </div>

                                <div style={{ marginBottom: '10px' }, { marginLeft: '2px' }} id="graphTitleContainer" className="row">
                                    <label style={{ marginright: '10px' }} for="graphTitle">Graph Title: </label>
                                    <input type="text" id="graphTitle" name="graphTitle" value=""></input>
                                </div>




                                <h5>Sort Graph</h5>
                                <div id="sortGraphBox" className="row">
                                    <div className="col-md-3">
                                        <input type="checkbox" id="sortedBox" name="sortedBox" value="false"></input>
                                        <label for="sortedBox"> Sorted</label>
                                    </div>

                                </div>


                                <h5>Chart Type</h5>
                                <div id="chartTypeBoxes" style={{ marginBottom: '10px' }} className="row">
                                    <div className="col-md-3">
                                        <input type="checkbox" class="chartType" id="barBox" ></input>
                                        <label for="barBox">Bar Chart</label>
                                    </div>
                                    <div className="col-md-3">
                                        <input type="checkbox" className="chartType" id="lineBox" ></input>
                                        <label for="barBox">Line Chart</label>
                                    </div>
                                    <div className="col-md-3">
                                        <input type="checkbox" className="chartType" id="pieBox" ></input>
                                        <label for="pieBox">Pie Chart</label>
                                    </div>
                                </div>

                                <h5>Graph Controls</h5>
                                <div id="GraphControls" style={{ marginBottom: '10px' }} className="row">
                                    <div className="col-md-12">
                                        <button style={{ width: '100%' }} className="demo-button button-group" id="graphStart" disabled>Start Graph</button>
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
                                        <button style={{ width: '100%' }} className="demo-button button-group" id="nextGraph" disabled>Next Graph</button>
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

                    <div class="demo">
                        <div class="demo-wrapper">
                            <button id="new-window-hangs-demo-toggle" class="js-container-target demo-toggle-button">Relaunch window after
                            the process hangs
          <div className="demo-meta u-avoid-clicks">Supports: Win, macOS, Linux <span className="demo-meta-divider">|</span>
            Process: Main</div>
                            </button>
                            <div class="demo-box">
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

                                <div class="demo-protip">
                                    <h2>ProTip</h2>
                                    <strong>Wait for the process to become responsive again.</strong>
                                    <p>A third option in the case of a process that is hanging is to wait and see if the problem resolves,
                                    allowing the process to become
              responsive again. To do this, use the <code>BrowserWindow</code> event 'responsive' as shown below.</p>
                                    <pre><code class="language-js">win.on('responsive', function () {
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