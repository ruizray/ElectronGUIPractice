import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { db } from '../scripts/firebase'
import _ from 'lodash'
import { paginate } from './../scripts/paginate'
import Pagination from './../common/Pagination'
import DatabaseTable from './DatabaseTable'
import { faTable } from '@fortawesome/free-solid-svg-icons'
import DatabaseAddForm from './DatabaseAddForm'
import Card from '../common/Card'
class Database extends Component {
  state = {
    posts: [],
    categories: [],
    pageSize: 5,
    currentPage: 1,
    selectedCategory: '',
    sortColumn: {
      path: 'model',
      order: 'asc'
    }
  }

  handleGetDatabase = () => {
    var categories = []
    db.collection('inventory')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          categories.push(doc.id)
          var data = querySnapshot.docs.map(doc => doc.data())

          console.log(data)
          this.setState({ categories, posts: data })
        })
      })
  }



  handleUpdate = post => {
    console.log('Update', post)
  }

  handleDelete = post => {
    const posts = this.state.posts.filter(
      m => m.category !== post.category && post.model !== m.model
    )
    db.collection('inventory')
      .doc(post.category)
      .delete()
      .then(() => {
        console.log('Document successfully deleted!')
      })
      .catch(error => {
        console.error('Error removing document: ', error)
      })
    this.setState({ posts })
  }

  handlePageChange = page => {
    this.setState({ currentPage: page })
    console.log(page)
  }

  handleCategorySelect = category => {
    console.log(category)
    this.setState({ selectedCategory: category, currentPage: 1 })
  }

  handleSort = sortColumn => {
    this.setState({ sortColumn })
  }

  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      selectedCategory,
      posts: allPosts,
      sortColumn
    } = this.state
    const filtered = selectedCategory
      ? allPosts.filter(m => m.category === selectedCategory)
      : allPosts
    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order])
    const posts = paginate(sorted, currentPage, pageSize)
    return { totalCount: filtered.length, posts }
  }

  handleSubmit = ({ category, count, cost, model }) => {


    db.collection('inventory')
      .doc(category)
      .set({
        model,
        count,
        cost,
      })
      .then(function () {
        console.log('Document successfully written!')
      })
      .catch(function (error) {
        console.error('Error writing document: ', error)
      })

  }


  render() {

    const { pageSize, currentPage, sortColumn } = this.state
    const { totalCount, posts } = this.getPagedData()


    return (
      <div class="container-fluid px-4">
        <h1 class="mt-4">Inventory Database Example</h1>
        <ol class="breadcrumb mb-4">
          <li class="breadcrumb-item">
            <NavLink style={{ padding: 0 }} className="nav-link" to="/movies">
              Dashboard
            </NavLink>
          </li>
          <li class="breadcrumb-item active">Inventory Database Application</li>
        </ol>
        <Card title="Add Data" icon={faTable} >
          <DatabaseAddForm onSubmit={this.handleSubmit} />
        </Card>

        <Card title="Inventory database" icon={faTable}>
          <div className="col-md-2">
          <button className="btn btn-secondary" onClick={this.handleGetDatabase}>Get Database </button>
          </div>
          <p>Showing {totalCount} items in inventory</p>
          <DatabaseTable posts={posts} sortColumn={sortColumn} onDelete={this.handleDelete} onSort={this.handleSort} />
          <Pagination
            itemsCount={totalCount}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </Card>
      </div>

    )
  }
}

export default Database
