import React, { Component } from 'react'
import Pagination from './Pagination';
import { getMovies } from './fakeMovieService'
import { paginate } from './../scripts/paginate';
import ListGroup from './listGroup';
import { getGenres } from './fakeGenreService';
class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 4,
    currentPage: 1,
  }
  componentDidMount() {
    this.setState({ movies: getMovies(), genres: getGenres() })
  }

  handleDelete = movie => {

    const movies = this.state.movies.filter(m => m._id !== movie._id);
    this.setState({ movies });
  }

  handlePageChange = page => {
    this.setState({ currentPage: page })
    console.log(page);
  }

  handleGenreSelect = genre => {
    console.log(genre)
  }

  render() {
    const { length: count } = this.state.movies
    const { pageSize, currentPage, movies: allMovies } = this.state;
    if (count == 0) return <p>There are no movies in the database.</p>;

    const movies = paginate(allMovies, currentPage, pageSize)

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
              <div className="row">
                <div className="col-2"><ListGroup items={this.state.genres} onItemSelect={this.handleGenreSelect} /></div>
                <div className="col">
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
                      {movies.map(movie => (
                        <tr key={movie._id}>
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
              <Pagination itemsCount={count} pageSize={pageSize} currentPage={currentPage} onPageChange={this.handlePageChange} />
            </div>
          </div>
        </section>


      </React.Fragment>
    )
  }
}

export default Movies
