import React, { Component } from 'react'
import { Route, NavLink } from 'react-router-dom'
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


        <div class="container-fluid px-4">
          <h1 class="mt-4">Table Data Example</h1>
          <ol class="breadcrumb mb-4">
            <li class="breadcrumb-item"><NavLink style={{ padding : 0}} className="nav-link" to="/movies">Dashboard</NavLink></li>
            <li class="breadcrumb-item active">Movies Application</li>
          </ol>
          <div class="card mb-4">
            <div class="card-body">
             This application demonstrates data handling, pagination, filtering, sorting, and deleting elements.   
                                
                            </div>
          </div>
          <div class="card mb-4">
            <div class="card-header">
              <i class="fas fa-table me-1"></i>
                                DataTable Example
                            </div>
            <div className="row mx-4 my-4">
              <div className="col-2 ">
                <ListGroup items={this.state.genres} selectedItem={this.state.selectedGenre} onItemSelect={this.handleGenreSelect} />
              </div>
              <div className="col">
                <p>Showing {totalCount} movies in the database</p>
                <MoviesTable movies={movies} sortColumn={sortColumn} onDelete={this.handleDelete} onSort={this.handleSort} />
              </div>
              <Pagination itemsCount={totalCount} pageSize={pageSize} currentPage={currentPage} onPageChange={this.handlePageChange} />
            </div>
          </div>
        </div>

      </React.Fragment>
    )
  }
}

export default Movies
