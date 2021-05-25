import React, { Component } from 'react'
import Counter from '../common/Counter'

class Counters extends Component {
  state = {
    counters: [
      { id: 1, value: 0 },
      { id: 2, value: 0 },
      { id: 3, value: 0 },
      { id: 4, value: 0 }
    ]
  }

  handleDelete = counterId => {
    console.log('Event Handler Called', counterId)
    const counters = this.state.counters.filter(c => c.id !== counterId)
    this.setState({ counters })
  }

  handleIncrement = counter => {
    console.log(counter)
    const counters = [...this.state.counters]
    const index = counters.indexOf(counter)
    counters[index] = { ...counter }
    counters[index].value++
    this.setState({ counters })
  }

  // Single source of truth
  handleReset = () => {
    const counters = this.state.counters.map(c => {
      c.value = 0
      return c
    })

    this.setState({ counters })
  }

  render() {
    return (
      <React.Fragment>
        <div class="container-fluid px-4">
          <h1 class="mt-4">Counters</h1>
          <ol class="breadcrumb mb-4">
            <li class="breadcrumb-item">
              <a href="index.html">Dashboard</a>
            </li>
            <li class="breadcrumb-item active">Counters</li>
          </ol>

          <div class="card mb-4">
            <div class="card-header">
              <i class="fas fa-table me-1"></i>
              Counter Example
            </div>
            <div className="col-md-5 mx-4 my-4">
              <button
                onClick={this.handleReset}
                className="btn btn-primary btn-sm m-2 "
              >
                Reset
              </button>
              {this.state.counters.map(counter => (
                <Counter
                  key={counter.id}
                  onDelete={this.handleDelete}
                  onIncrement={this.handleIncrement}
                  counter={counter}
                >
                  {/* Testing passing CHildren */}
                  <h1>Counter number: {counter.id}</h1>
                </Counter>
              ))}
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default Counters
