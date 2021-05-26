import React ,{ Component } from 'react'
import { Route, NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as fa from '@fortawesome/free-solid-svg-icons'
import Movies from './Movies'
import Stuff from './Stuff'
import Counter from './Counters'
import LoginForm from './LoginForm'
import Analytics from './Analytics'
import Settings from './Settings'
import Database from './Database'
import PrivacyPolicy from './PrivacyPolicy'
import TopNav from './TopNav'
import Signup from './Signup';




class Sidenav extends Component {
  state = {
    dropdownToggled: false
    
  }



  render() {
    return (
      <React.Fragment>
        
      <TopNav onToggle = {this.props.onToggle}/>
        <div id="layoutSidenav">
          <div id="layoutSidenav_nav">
            <nav
              className="sb-sidenav accordion sb-sidenav-dark"
              id="sidenavAccordion"
            >
              <div className="sb-sidenav-menu">
                <div className="nav">
                  <div className="sb-sidenav-menu-heading">Core</div>
                  {/* <NavLink className="nav-link" to="/login">
                    <div className="sb-nav-link-icon">
                      <FontAwesomeIcon icon={fa.faTachometerAlt} />
                    </div>
                    Login Form
                  </NavLink>  */}
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
                  <NavLink className="nav-link" to="/database">
                    <div className="sb-nav-link-icon">
                      <FontAwesomeIcon icon={fa.faTachometerAlt} />
                    </div>{' '}
                   DataBase Application
                  </NavLink>

                  {/* <NavLink className="nav-link" to="/stuff">
                    <div className="sb-nav-link-icon">
                      <FontAwesomeIcon icon={fa.faTachometerAlt} />
                    </div>
                    Graphing from File
                  </NavLink> */}
                  {/* <NavLink className="nav-link" to="/counter">
                    <div className="sb-nav-link-icon">
                      <FontAwesomeIcon icon={fa.faTachometerAlt} />
                    </div>
                    Counter Example
                  </NavLink> */}
                  
                  <NavLink className="nav-link" to="/analytics">
                    <div className="sb-nav-link-icon">
                      <FontAwesomeIcon icon={fa.faTachometerAlt} />
                    </div>
                    Google Analytics
                  </NavLink>
                  {/* <div className="sb-sidenav-menu-heading">Interface</div>
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
                      <a className="nav-link" href="layout-sidenav-light.html">
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
                  </a> */}
                </div>
              </div>
              <div className="sb-sidenav-footer">Start Bootstrap</div>
            </nav>
          </div>
          <div id="layoutSidenav_content">
            <Route exact path="/movies" component={Movies} />
            <Route path="/stuff" component={Stuff} />
            <Route path="/counter" component={Counter} />
            <Route path="/login" component={LoginForm} />
            <Route path="/analytics" component={Analytics} />
            <Route path="/settings" component={Settings} />
            <Route path="/database" component={Database} />
            <Route path="/privacyPolicy" component={PrivacyPolicy} />
            <Route path="/login2" component={Signup} />
          
            <footer className="py-4 bg-light mt-auto">
              <div className="container-fluid px-4">
                <div className="d-flex align-items-center justify-content-between small">
                  <div className="text-muted">
                    Copyright &copy; Raymundo Ruiz
                  </div>
                  <div>
                    <NavLink classname="nav-link" to="/privacyPolicy">Privacy Policy</NavLink>
                    &middot;
                    <a href="#">Terms &amp; Conditions</a>
                  </div>
                </div>
              </div>
            </footer>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default Sidenav
