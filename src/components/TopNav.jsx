import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as fa from '@fortawesome/free-solid-svg-icons'
import 'firebase/auth'
import firebase from 'firebase'
import 'firebase/firestore'
import UserContext, { UserConsumer } from '../contexts/UserContext'

class TopNav extends Component {
  state = {
    dropdownToggled: false
  }
  signOut = () => {
    const auth = firebase.auth()
    auth.signOut()
  }
  handleDropdownToggle = () => {
    console.log(UserContext.photoURL)
    this.setState({ dropdownToggled: !this.state.dropdownToggled })
  }
  render() {
    return (
      <UserConsumer>
        {UserContext => (
          <nav className="sb-topnav navbar navbar-expand navbar-dark bg-dark">
            <NavLink
              style={{ paddingLeft: 0 }}
              className="nav-link"
              to="/movies"
            >
              {' '}
              <h1 className="navbar-brand ps-3">React Examples</h1>
            </NavLink>
            <button
              className="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0"
              id="sidebarToggle"
              onClick={() => this.props.onToggle(this.props.nav)}
            >
              <FontAwesomeIcon icon={fa.faBars} />
            </button>

            <form className="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0">
              <div className="input-group">
                <input
                  className="form-control"
                  type="text"
                  placeholder="Search for..."
                  aria-label="Search for..."
                  aria-describedby="btnNavbarSearch"
                ></input>
                <button
                  className="btn btn-primary"
                  id="btnNavbarSearch"
                  type="button"
                >
                  <FontAwesomeIcon icon={fa.faSearch} />
                </button>
              </div>
            </form>

            <ul className="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
              <li className="nav-item dropdown">
                <div
                  className={
                    this.state.dropdownToggled === true
                      ? 'nav-link dropdown-toggle show'
                      : 'nav-link dropdown-toggle'
                  }
                  id="navbarDropdown"
                  onClick={this.handleDropdownToggle}
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded={
                    this.state.dropdownToggled === true ? 'true' : 'false'
                  }
                >
                  <img
                    style={{ width: '40px' }}
                    src={UserContext.user.photoURL}
                  />
                </div>
                <ul
                  className={
                    this.state.dropdownToggled === true
                      ? 'dropdown-menu dropdown-menu-end show'
                      : 'dropdown-menu dropdown-menu-end'
                  }
                  aria-labelledby="navbarDropdown"
                  style={{ right: 0, left: 'auto' }}
                >
                  <li>
                    <NavLink className=" dropdown-item" to="/userInfo">
                      Settings
                    </NavLink>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#!">
                      Activity Log
                    </a>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <a
                      onClick={this.signOut}
                      className="dropdown-item"
                      href="#!"
                    >
                      Logout
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </nav>
        )}
      </UserConsumer>
    )
  }
}

TopNav.contextType = UserContext
export default TopNav
