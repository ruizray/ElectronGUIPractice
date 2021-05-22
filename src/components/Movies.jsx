import React, { Component } from 'react'
import Pagination from '../common/Pagination'
import { getMovies } from '../scripts/fakeMovieService'
import { paginate } from './../scripts/paginate'
import ListGroup from '../common/listGroup'
import { getGenres } from '../scripts/fakeGenreService'
import _ from 'lodash'

import MoviesTable from './MoviesTable'

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 4,
    currentPage: 1,
    selectedGenre: '',
    sortColumn: {
      path: 'title',
      order: 'asc'
    }
  }
  componentDidMount() {
    const genres = [{ name: 'All Genres' }, ...getGenres()]
    this.setState({ movies: getMovies(), genres })
    console.log(this.state.movies)
  }

  handleDelete = movie => {
    const movies = this.state.movies.filter(m => m._id !== movie._id)
    this.setState({ movies })
  }

  handlePageChange = page => {
    this.setState({ currentPage: page })
    console.log(page)
  }

  handleGenreSelect = genre => {
    console.log(genre)
    this.setState({ selectedGenre: genre, currentPage: 1 })
  }

  handleSort = sortColumn => {
    this.setState({ sortColumn })
  }

  getPagedData = () => {
    const { pageSize, currentPage, selectedGenre, movies: allMovies, sortColumn } = this.state
    const filtered =
      selectedGenre && selectedGenre._id
        ? allMovies.filter(m => m.genre._id === selectedGenre._id)
        : allMovies
    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order])
    const movies = paginate(sorted, currentPage, pageSize)

    return { totalCount: filtered.length, data: movies }
  }
  render() {
    const { length: count } = this.state.movies
    const { pageSize, currentPage, sortColumn } = this.state
    if (count === 0) return <p>There are no movies in the database.</p>
    const { totalCount, data: movies } = this.getPagedData()
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
                <div className="col-2">
                  <ListGroup
                    items={this.state.genres}
                    selectedItem={this.state.selectedGenre}
                    onItemSelect={this.handleGenreSelect}
                  />
                </div>
                <div className="col">
                  <p>Showing {totalCount} movies in the database</p>
                  <MoviesTable
                    movies={movies}
                    sortColumn={sortColumn}
                    onDelete={this.handleDelete}
                    onSort={this.handleSort}
                  />
                </div>
              </div>
              <Pagination
                itemsCount={totalCount}
                pageSize={pageSize}
                currentPage={currentPage}
                onPageChange={this.handlePageChange}
              />
            </div>
          </div>
        </section>
      </React.Fragment>
    )
  }
}

export default Movies
