import React, { Component } from 'react'
import { Route, NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as fa from '@fortawesome/free-solid-svg-icons'
import Movies from './Movies'
import Stuff from './Stuff'
import Counter from './Counters'
import LoginForm from './LoginForm'
import Analytics from './Analytics'
import Database from './Database/Database'
import PrivacyPolicy from './PrivacyPolicy'
import TopNav from './TopNav'
import ChatRoom from '../common/Chat/Chatroom'

import UserContext, { UserConsumer } from '../contexts/UserContext'
import UserInfoPage from '../common/UserInfoPage'

class Dashboard extends Component {
  state = {
    dropdownToggled: false,
    drawerToggled: false
  }
  handleNavToggle = () => {
    console.log(this.state.drawerToggled)
    this.setState({ drawerToggled: !this.state.drawerToggled })
  }
  render() {
    return (
      <UserConsumer>
        {UserContext => (
          <React.Fragment>
            <div
              id="body"
              className={
                this.state.drawerToggled === false
                  ? 'nav-fixed bg-light toggled'
                  : 'nav-fixed bg-light toggled drawer-toggled'
              }
            >
              <TopNav onToggle={this.handleNavToggle} />
              <div id="layoutDrawer">
                <div id="layoutDrawer_nav">
                  <nav
                    className="drawer accordion drawer-light bg-white"
                    id="drawerAccordion"
                  >
                    <div className="drawer-menu">
                      <div className="nav">
                        <div className="drawer-menu-heading d-sm-none">
                          Account
                        </div>

                        <a className="nav-link d-sm-none" href="#!">
                          <div className="nav-link-icon">
                            <i className="material-icons">notifications</i>
                          </div>
                          Notifications
                        </a>

                        <a className="nav-link d-sm-none" href="#!">
                          <div className="nav-link-icon">
                            <i className="material-icons">mail</i>
                          </div>
                          Messages
                        </a>

                        <div className="drawer-menu-divider d-sm-none"></div>

                        <div className="drawer-menu-heading">Interface</div>

                        <NavLink className="nav-link" to="/analytics">
                          <div className="sb-nav-link-icon">
                            <FontAwesomeIcon icon={fa.faTachometerAlt} /> Google
                            Analytics
                          </div>
                        </NavLink>
                        
                        <NavLink className="nav-link" to="/chatroom">
                        <div className="sb-nav-link-icon">
                          <FontAwesomeIcon icon={fa.faTachometerAlt} /> Chat Room
                        </div>
                       
                      </NavLink>
                  
                      </div>
                    </div>

                    <div className="drawer-footer border-top">
                      <div className="d-flex align-items-center">
                        <i className="material-icons text-muted">
                          account_circle
                        </i>
                        <div className="ms-3">
                          <div className="caption">Logged in as:</div>
                          <div className="small fw-500">Start Bootstrap</div>
                        </div>
                      </div>
                    </div>
                  </nav>
                </div>
                <div id="layoutDrawer_content">
                  <main>
                    <Route exact path="/!" component={Analytics} />
                    <Route exact path="/" component={Analytics} />
                    <Route exact path="/movies" component={Movies} />
                    <Route path="/stuff" component={Stuff} />
                    <Route path="/counter" component={Counter} />
                    <Route path="/login" component={LoginForm} />
                    <Route
                      path="/analytics"
                      render={props => <Analytics userinfo={this.state.user} />}
                    />
                    <Route path="/userInfo" component={UserInfoPage} />
                    <Route path="/chatroom" component={ChatRoom} />
                    <Route path="/database" component={Database} />
                    <Route path="/privacyPolicy" component={PrivacyPolicy} />
                    <Route path="/login2" />
                  </main>

                  <footer
                    class="py-4 mt-auto border-top"
                    style={{ minheight: '74px' }}
                  >
                    <div class="container-xl px-5">
                      <div class="d-flex flex-column flex-sm-row align-items-center justify-content-sm-between small">
                        <div class="me-sm-2">
                          Copyright &copy; Your Website 2021
                        </div>
                        <div class="d-flex ms-sm-2">
                          <a class="text-decoration-none" href="#!">
                            Privacy Policy
                          </a>
                          <div class="mx-1">&middot;</div>
                          <a class="text-decoration-none" href="#!">
                            Terms &amp; Conditions
                          </a>
                        </div>
                      </div>
                    </div>
                  </footer>
                </div>
              </div>
            </div>
          </React.Fragment>
        )}
      </UserConsumer>
    )
  }
}

Dashboard.contextType = UserContext
export default Dashboard

{
  /* <div id="layoutSidenav">
              <div id="layoutSidenav_nav">
                <nav
                  className="sb-sidenav accordion sb-sidenav-dark"
                  id="sidenavAccordion"
                >
                  <div className="sb-sidenav-menu">
                    <div className="nav">
                      <div className="sb-sidenav-menu-heading">Core</div>
                      <NavLink className="nav-link" to="/login">
                        <div className="sb-nav-link-icon">
                          <FontAwesomeIcon icon={fa.faTachometerAlt} />
                        </div>
                        Login Form
                      </NavLink>
                      <NavLink className="nav-link" to="/login2">
                        <div className="sb-nav-link-icon">
                          <FontAwesomeIcon icon={fa.faTachometerAlt} />
                        </div>
                        Login Form
                      </NavLink>
                      <NavLink className="nav-link" to="/movies">
                        <div className="sb-nav-link-icon">
                          <FontAwesomeIcon icon={fa.faTachometerAlt} />
                        </div>{' '}
                        Movies Application
                      </NavLink>
                      <NavLink className="nav-link" to="/chatroom">
                        <div className="sb-nav-link-icon">
                          <FontAwesomeIcon icon={fa.faTachometerAlt} />
                        </div>{' '}
                        Chat Room
                      </NavLink>
                      <NavLink className="nav-link" to="/database">
                        <div className="sb-nav-link-icon">
                          <FontAwesomeIcon icon={fa.faTachometerAlt} />
                        </div>{' '}
                        DataBase Application
                      </NavLink>

                      <NavLink className="nav-link" to="/stuff">
                        <div className="sb-nav-link-icon">
                          <FontAwesomeIcon icon={fa.faTachometerAlt} />
                        </div>
                        Graphing from File
                      </NavLink>
                      <NavLink className="nav-link" to="/counter">
                        <div className="sb-nav-link-icon">
                          <FontAwesomeIcon icon={fa.faTachometerAlt} />
                        </div>
                        Counter Example
                      </NavLink>

                      <NavLink className="nav-link" to="/analytics">
                        <div className="sb-nav-link-icon">
                          <FontAwesomeIcon icon={fa.faTachometerAlt} />
                        </div>
                        Google Analytics
                      </NavLink>
                      <div className="sb-sidenav-menu-heading">Interface</div>
                      <a
                        className="nav-link collapsed"
                        href="#"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseLayouts"
                        aria-expanded="false"
                        aria-controls="collapseLayouts"
                      >
                        <div className="sb-nav-link-icon">
                          <i className="fas fa-columns"></i>
                        </div>
                        Layouts
                        <div className="sb-sidenav-collapse-arrow">
                          <i className="fas fa-angle-down"></i>
                        </div>
                      </a>
                      <div
                        className="collapse"
                        id="collapseLayouts"
                        aria-labelledby="headingOne"
                        data-bs-parent="#sidenavAccordion"
                      >
                        <nav className="sb-sidenav-menu-nested nav">
                          <a className="nav-link" href="layout-static.html">
                            Static Navigation
                          </a>
                          <a
                            className="nav-link"
                            href="layout-sidenav-light.html"
                          >
                            Light Sidenav
                          </a>
                        </nav>
                      </div>
                      <a
                        className="nav-link collapsed"
                        href="#"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapsePages"
                        aria-expanded="false"
                        aria-controls="collapsePages"
                      >
                        <div className="sb-nav-link-icon">
                          <i className="fas fa-book-open"></i>
                        </div>
                        Pages
                        <div className="sb-sidenav-collapse-arrow">
                          <i className="fas fa-angle-down"></i>
                        </div>
                      </a>
                      <div
                        className="collapse"
                        id="collapsePages"
                        aria-labelledby="headingTwo"
                        data-bs-parent="#sidenavAccordion"
                      >
                        <nav
                          className="sb-sidenav-menu-nested nav accordion"
                          id="sidenavAccordionPages"
                        >
                          <div
                            className="nav-link collapsed"
                            href="#"
                            data-bs-toggle="collapse"
                            data-bs-target="#pagesCollapseAuth"
                            aria-expanded="false"
                            aria-controls="pagesCollapseAuth"
                          >
                            Authentication
                            <div className="sb-sidenav-collapse-arrow">
                              <i className="fas fa-angle-down"></i>
                            </div>
                          </div>
                          <div
                            className="collapse"
                            id="pagesCollapseAuth"
                            aria-labelledby="headingOne"
                            data-bs-parent="#sidenavAccordionPages"
                          >
                            <nav className="sb-sidenav-menu-nested nav">
                              <a className="nav-link" href="login.html">
                                Login
                              </a>
                              <a className="nav-link" href="register.html">
                                Register
                              </a>
                              <a className="nav-link" href="password.html">
                                Forgot Password
                              </a>
                            </nav>
                          </div>
                          <a
                            className="nav-link collapsed"
                            href="#"
                            data-bs-toggle="collapse"
                            data-bs-target="#pagesCollapseError"
                            aria-expanded="false"
                            aria-controls="pagesCollapseError"
                          >
                            Error
                            <div className="sb-sidenav-collapse-arrow">
                              <i className="fas fa-angle-down"></i>
                            </div>
                          </a>
                          <div
                            className="collapse"
                            id="pagesCollapseError"
                            aria-labelledby="headingOne"
                            data-bs-parent="#sidenavAccordionPages"
                          >
                            <nav className="sb-sidenav-menu-nested nav">
                              <a className="nav-link" href="401.html">
                                401 Page
                              </a>
                              <a className="nav-link" href="404.html">
                                404 Page
                              </a>
                              <a className="nav-link" href="500.html">
                                500 Page
                              </a>
                            </nav>
                          </div>
                        </nav>
                      </div>
                      <div className="sb-sidenav-menu-heading">Addons</div>
                      <a className="nav-link" href="charts.html">
                        <div className="sb-nav-link-icon">
                          <i className="fas fa-chart-area"></i>
                        </div>
                        Charts
                      </a>
                      <a className="nav-link" href="tables.html">
                        <div className="sb-nav-link-icon">
                          <i className="fas fa-table"></i>
                        </div>
                        Tables
                      </a>
                    </div>
                  </div>
                  <div className="sb-sidenav-footer">
                    {' '}
                    {'Logged in as \n' + UserContext.user.displayName}
                  </div>
                </nav>
              </div>
              <div id="layoutSidenav_content">
                <Route exact path="/!" component={Analytics} />
                <Route exact path="/" component={Analytics} />
                <Route exact path="/movies" component={Movies} />
                <Route path="/stuff" component={Stuff} />
                <Route path="/counter" component={Counter} />
                <Route path="/login" component={LoginForm} />
                <Route
                  path="/analytics"
                  render={props => <Analytics userinfo={this.state.user} />}
                />
                <Route path="/userInfo" component={UserInfoPage} />
                <Route path="/chatroom" component={ChatRoom} />
                <Route path="/database" component={Database} />
                <Route path="/privacyPolicy" component={PrivacyPolicy} />
                <Route path="/login2" />

                <footer className="py-4 bg-light mt-auto">
                  <div className="container-fluid px-4">
                    <div className="d-flex align-items-center justify-content-between small">
                      <div className="text-muted">
                        Copyright &copy; Raymundo Ruiz
                      </div>
                      <div>
                        <NavLink className="nav-link" to="/privacyPolicy">
                          Privacy Policy
                        </NavLink>
                        &middot;
                        <a href="#">Terms &amp; Conditions</a>
                      </div>
                    </div>
                  </div>
                </footer>
              </div>
            </div> */
}
