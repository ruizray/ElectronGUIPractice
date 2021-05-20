import React, { Component } from 'react';
import Counter from './Counter'

class Counters extends Component {
  state = {
    counters: [
      { id: 1, value: 0 },
      { id: 2, value: 0 },
      { id: 3, value: 0 },
      { id: 4, value: 0 },
    ]

  };


  handleDelete = (counterId) => {
    console.log('Event Handler Called', counterId)
    const counters = this.state.counters.filter(c => c.id !== counterId);
    this.setState({ counters })
  };
 
handleIncrement = counter =>{
  console.log(counter)
  const counters = [...this.state.counters];
  const index = counters.indexOf(counter)
  counters[index] = {...counter};
  counters[index].value++;
  this.setState({counters})

}

  // Single source of truth
  handleReset = () =>{
   const counters =  this.state.counters.map(c=>{
      c.value = 0;
      return c;
    })

    this.setState ({counters})
  }

  render() {
    return (<React.Fragment>
      <section
        id="windows-section"
        className="section js-section u-category-windows"
      >
        <header className="section-header">
          <div className="section-wrapper">
            <h1>Counter App</h1>
          </div>
        </header>

        <div className="demo">
          <div className="demo-wrapper is-open">
            <button
              id="new-graph-toggle"
              onClick={() => this.isOpen}
              className="js-container-target demo-toggle-button"
            >
              Just Testing
                    <div className="demo-meta u-avoid-clicks">
                Supports: Win, macOS, Linux{' '}
                <span className="demo-meta-divider">|</span>
                      Process: Main
                    </div>
            </button>
            <p>
              In this demo we create a new Graph (via the{' '}
              <code>renderChart.js</code> script) and provide a source file
                    <code>input.txt</code> that will generate the graph
                  </p>

            <button onClick={this.handleReset} style={{ color: 'blue' }} className="demo-button">Reset</button>
            {this.state.counters.map(counter =>
              <Counter key={counter.id} onDelete={this.handleDelete} onIncrement={this.handleIncrement} counter={counter}>
                {/* Testing passing CHildren */}
                <h1>Counter number: {counter.id}</h1>
              </Counter>
            )}

          </div>
        </div>
      </section>
    </React.Fragment>);
  }
}

export default Counters; 