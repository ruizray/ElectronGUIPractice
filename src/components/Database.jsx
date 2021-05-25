import React, { Component } from "react";
import axios from 'axios'
import { NavLink } from 'react-router-dom';
import { db } from '../scripts/firebase'
import ListGroup from './../common/listGroup';
import Table from './../common/Table';
import _ from 'lodash'
import { paginate } from './../scripts/paginate';
import Pagination from './../common/Pagination';
import DatabaseTable from './DatabaseTable';

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
    },
  };

  async componentDidMount() {
    var categories = [];
    db.collection("inventory")
      .get()
      .then(querySnapshot => {

        querySnapshot.forEach((doc) => {
          categories.push(doc.id)
          var data = querySnapshot.docs.map(doc => (doc.data()));

          console.log(data)
          this.setState({ categories, posts: data })
        });



      });

  }
  handleAdd = async () => {
    db.collection("cities").doc("LA").set({
      name: "Los Angeles",
      state: "CA",
      country: "USA"
    })
      .then(function () {
        console.log("Document successfully written!");
      })
      .catch(function (error) {
        console.error("Error writing document: ", error);
      });
  };

  handleUpdate = post => {
    console.log("Update", post);
  };


  handleDelete = post => {
    const posts = this.state.posts.filter(m => (m.category !== post.category) && (post.model !== m.model))
    db.collection("inventory").doc(post.category).delete().then(() => {
      console.log("Document successfully deleted!");
    }).catch((error) => {
      console.error("Error removing document: ", error);
    });
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
    const { pageSize, currentPage, selectedCategory, posts: allPosts, sortColumn } = this.state
    const filtered =
      selectedCategory
        ? allPosts.filter(m => m.category === selectedCategory)
        : allPosts
    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order])
    const posts = paginate(sorted, currentPage, pageSize)
    console.log(sorted, posts, allPosts)
    return { totalCount: filtered.length, posts }
  }

  render() {

    const { length: count } = this.state.posts
    const { pageSize, currentPage, sortColumn } = this.state
    if (count === 0) return <p>There are no posts in the database.</p>
    const { totalCount, posts } = this.getPagedData()

    console.log(posts, totalCount)

    return (





      <div class="container-fluid px-4">
        <h1 class="mt-4">Inventory Database Example</h1>
        <ol class="breadcrumb mb-4">
          <li class="breadcrumb-item"><NavLink style={{ padding: 0 }} className="nav-link" to="/movies">Dashboard</NavLink></li>
          <li class="breadcrumb-item active">Inventory Database Application</li>
        </ol>


        <div class="card mb-4">
          <div class="card-header">
            <i class="fas fa-table me-1"></i>
                                Inventory Database
                            </div>
          <div className="row mx-4 my-4">


            <p>Showing {totalCount} items in inventory</p>
            <DatabaseTable posts={posts} sortColumn={sortColumn} onDelete={this.handleDelete} onSort={this.handleSort} />

            <Pagination itemsCount={totalCount} pageSize={pageSize} currentPage={currentPage} onPageChange={this.handlePageChange} />
          </div>
        </div>

    

      </div>


    );
  }
}

export default Database;
