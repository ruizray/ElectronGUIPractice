import React from 'react'

import {

  Route,
  NavLink,
} from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as fa from '@fortawesome/free-solid-svg-icons';
import Movies from './Movies'
import Stuff from './Stuff'
import Counter from './Counters'
import LoginForm from './LoginForm';
import Analytics from './Analytics'
import { Component } from 'react';
import GoogleAuth from './GoogleAuth';


class Sidenav extends Component {





  render() {
    return (
      <React.Fragment>
        <nav className="sb-topnav navbar navbar-expand navbar-dark bg-dark">
        <NavLink style={{paddingLeft : 0}} className="nav-link" to="/movies" > <h1 className="navbar-brand ps-3" >React Examples</h1></NavLink>
          <button className="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0" id="sidebarToggle" onClick={() => this.props.onToggle(this.props.nav)}><FontAwesomeIcon icon={fa.faBars} /></button>
          <form className="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0">
            <div className="input-group">
              <input className="form-control" type="text" placeholder="Search for..." aria-label="Search for..." aria-describedby="btnNavbarSearch"></input>
              <button className="btn btn-primary" id="btnNavbarSearch" type="button">

                <FontAwesomeIcon icon={fa.faSearch} />
              </button>
            </div>
          </form>

          <ul className="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" id="navbarDropdown" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false"><svg className="svg-inline--fa fa-user fa-w-14 fa-fw" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="user" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg=""><path fill="currentColor" d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z"></path></svg><i className="fas fa-user fa-fw"></i> </a>
              <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                <li><a className="dropdown-item" href="#!">Settings</a></li>
                <li><a className="dropdown-item" href="#!">Activity Log</a></li>
                <li><hr className="dropdown-divider" /></li>
                <li><a className="dropdown-item" href="#!">Logout</a></li>
              </ul>
            </li>
          </ul>
        </nav>

        <div id="layoutSidenav">
          <div id="layoutSidenav_nav">
            <nav className="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
              <div className="sb-sidenav-menu">
                <div className="nav">
                  <div className="sb-sidenav-menu-heading">Core</div>
                  <NavLink className="nav-link" to="/movies" >
                    <div className="sb-nav-link-icon"><FontAwesomeIcon icon={fa.faTachometerAlt} /></div> Movies Application
                  </NavLink>


                  <NavLink className="nav-link" to="/stuff" >
                    <div className="sb-nav-link-icon"><FontAwesomeIcon icon={fa.faTachometerAlt} /></div>
                                Graphing from File
                  </NavLink>
                  <NavLink className="nav-link" to="/counter" >

                    <div className="sb-nav-link-icon"><FontAwesomeIcon icon={fa.faTachometerAlt} /></div>
                                Counter Example
                </NavLink>
                  <NavLink className="nav-link" to="/login" >

                    <div className="sb-nav-link-icon"><FontAwesomeIcon icon={fa.faTachometerAlt} /></div>
                                Login Form
                </NavLink>
                  <NavLink className="nav-link" to="/analytics">

                    <div className="sb-nav-link-icon"><FontAwesomeIcon icon={fa.faTachometerAlt} /></div>
                                Google Analytics
                </NavLink>
                  <div className="sb-sidenav-menu-heading">Interface</div>
                  <a className="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#collapseLayouts" aria-expanded="false" aria-controls="collapseLayouts">
                    <div className="sb-nav-link-icon"><i className="fas fa-columns"></i></div>
                                Layouts
                                <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                  </a>
                  <div className="collapse" id="collapseLayouts" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
                    <nav className="sb-sidenav-menu-nested nav">
                      <a className="nav-link" href="layout-static.html">Static Navigation</a>
                      <a className="nav-link" href="layout-sidenav-light.html">Light Sidenav</a>
                    </nav>
                  </div>
                  <a className="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#collapsePages" aria-expanded="false" aria-controls="collapsePages">
                    <div className="sb-nav-link-icon"><i className="fas fa-book-open"></i></div>
                                Pages
                                <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                  </a>
                  <div className="collapse" id="collapsePages" aria-labelledby="headingTwo" data-bs-parent="#sidenavAccordion">
                    <nav className="sb-sidenav-menu-nested nav accordion" id="sidenavAccordionPages">
                      <a className="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#pagesCollapseAuth" aria-expanded="false" aria-controls="pagesCollapseAuth">
                        Authentication
                                        <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                      </a>
                      <div className="collapse" id="pagesCollapseAuth" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordionPages">
                        <nav className="sb-sidenav-menu-nested nav">
                          <a className="nav-link" href="login.html">Login</a>
                          <a className="nav-link" href="register.html">Register</a>
                          <a className="nav-link" href="password.html">Forgot Password</a>
                        </nav>
                      </div>
                      <a className="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#pagesCollapseError" aria-expanded="false" aria-controls="pagesCollapseError">
                        Error
                                        <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                      </a>
                      <div className="collapse" id="pagesCollapseError" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordionPages">
                        <nav className="sb-sidenav-menu-nested nav">
                          <a className="nav-link" href="401.html">401 Page</a>
                          <a className="nav-link" href="404.html">404 Page</a>
                          <a className="nav-link" href="500.html">500 Page</a>
                        </nav>
                      </div>
                    </nav>
                  </div>
                  <div className="sb-sidenav-menu-heading">Addons</div>
                  <a className="nav-link" href="charts.html">
                    <div className="sb-nav-link-icon"><i className="fas fa-chart-area"></i></div>
                                Charts
                            </a>
                  <a className="nav-link" href="tables.html">
                    <div className="sb-nav-link-icon"><i className="fas fa-table"></i></div>
                                Tables
                            </a>
                </div>
              </div>
              <div className="sb-sidenav-footer">
                <GoogleAuth />

                        Start Bootstrap
                    </div>
            </nav>
          </div>
          <div id="layoutSidenav_content">
            <Route exact path="/movies" component={Movies} />
            <Route path="/stuff" component={Stuff} />
            <Route path="/counter" component={Counter} />
            <Route path="/login" component={LoginForm} />
            <Route path="/analytics" component={Analytics} />
            <footer className="py-4 bg-light mt-auto">
              <div className="container-fluid px-4">
                <div className="d-flex align-items-center justify-content-between small">
                  <div className="text-muted">Copyright &copy; Your Website 2021</div>
                  <div>
                    <a href="#">Privacy Policy</a>
                                &middot;
                                <a href="#">Terms &amp; Conditions</a>
                  </div>
                </div>
              </div>
            </footer>
          </div>
        </div>




        {/* <nav className="sb-topnav navbar navbar-expand navbar-dark bg-dark">
      



          <div className="nav-item u-category-windows">
            <h5 className="nav-category">Menu Sample</h5>
          </div>
          
          <NavLink style={{ textDecoration: 'none' }} to="/counter"><button
            type="button"
            id="button-counter"
            data-section="counter"
            className="nav-button"
          >
            Open <em> counter example</em>
          </button></NavLink>
          <NavLink style={{ textDecoration: 'none' }} to="/stuff"><button
            type="button"
            id="button-crash-hang"
            data-section="crash-hang"
            className="nav-button"
          >
            Handling window <em>crashes and hangs</em>
          </button></NavLink>

          <NavLink style={{ textDecoration: 'none' }} to="/login"><button
            type="button"
            id="button-crash-hang"
            data-section="crash-hang"
            className="nav-button"
          >
            Open <em>Login Form</em>
          </button></NavLink>

          <NavLink style={{ textDecoration: 'none' }} to="/analytics"><button
            type="button"
            id="button-crash-hang"
            data-section="crash-hang"
            className="nav-button"
          >
            Open <em>Analytics Data</em>
          </button></NavLink>

          <footer className="nav-footer">
            <button
              type="button"
              id="button-about"
              data-modal="about"
              className="nav-footer-button"
            >
              About
              </button>
            <a
              className="nav-footer-logo"
              href="https://github.com"
              aria-label="Homepage"
            >
              <svg className="nav-footer-icon"></svg>
            </a>
          </footer>
        </nav>
        <div className="content js-content"> */}

        {/* 
          <Route exact path="/" component={Movies} />
          <Route path="/stuff" component={Stuff} />
          <Route path="/counter" component={Counter} />
          <Route path="/login" component={LoginForm} />
          <Route path="/analytics" component={Analytics} />
        </div> */}
      </React.Fragment>

    )
  }
}

export default Sidenav
