import React, { Component } from 'react'

import {

  Route,
  NavLink,
  HashRouter
} from 'react-router-dom'


import Vidly from '../Vidly'
import Stuff from '../Stuff'
class Sidenav extends Component {

  render() {

   
    return (
      <React.Fragment>
        <HashRouter>
          <nav className="nav js-nav">
            <header className="nav-header">
              <h1 className="nav-title">
                Electron <strong>API Demos</strong>
              </h1>
            </header>
            <div className="nav-item u-category-windows">
              <h5 className="nav-category">Menu Sample</h5>
            </div>
            <NavLink style={{textDecoration:'none'}} exact to="/">
              <button
                type="button" 
                id="button-graph"
                data-section="graph"
                className="nav-button"
              >
                Open <em>Graph</em>
              </button>
            </NavLink>
            <NavLink style={{textDecoration:'none'}} to ="/stuff"><button
              type="button"
              id="button-crash-hang"
              data-section="crash-hang"
              className="nav-button"
            >
              Handling window <em>crashes and hangs</em>
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

          <div className="content js-content">
            <Route exact path="/" component={Vidly} />
            <Route path="/stuff" component={Stuff} />
          </div>
        </HashRouter>
        
      </React.Fragment>
      
    )
  }
}

export default Sidenav
