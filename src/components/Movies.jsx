import React, { Component } from 'react'
import { getMovies } from './fakeMovieService'
class Movies extends Component {
  state = {
    movies: getMovies()
  }

  handleDelete = movie =>{
  
    const movies = this.state.movies.filter(m=> m._id !== movie._id);
    this.setState({movies});
  }

  render() {
const {length:count} = this.state.movies
    if(count == 0 ) return <p>There are no movies in the database.</p>;

    return (
      <React.Fragment>
        <section
          id="windows-section"
          className="section js-section u-category-windows"
        >
          <header className="section-header">
            <div className="section-wrapper">
              <h1>Movies App</h1>
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
              <p>Showing {count} movies in the database</p>
              <table className="table">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Genre</th>
                    <th>Stock</th>
                    <th>Rate</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.movies.map(movie => (
                    <tr key = {movie._id}>
                      <td>{movie.title}</td>
                      <td>{movie.genre.name}</td>
                      <td>{movie.numberInStock}</td>
                      <td>{movie.dailyRentalRate}</td>
                      <td>
                        <button onClick={() => this.handleDelete(movie)} className="demo-button">
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </React.Fragment>
    )
  }
}

export default Movies
