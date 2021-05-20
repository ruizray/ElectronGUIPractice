import React, { Component } from 'react'

import {

  Route,
  NavLink,
  HashRouter
} from 'react-router-dom'


import Movies from './Movies'
import Stuff from './Stuff'
import Counter from './Counters'
const Sidenav = () => {


   
    return (
      <React.Fragment>

          <nav className="nav js-nav">
            <header className="nav-header">
              <h1 className="nav-title">
                Electron <strong>API Demos</strong>
              </h1>
            </header>
            <div className="nav-item u-category-windows">
              <h5 className="nav-category">Menu Sample</h5>
            </div>
            <NavLink style={{textDecoration:'none'}} to="/">
              <button
                type="button" 
                id="button-movies"
                data-section="movies"
                className="nav-button"
              >
                Open <em>Movies App</em>
              </button>
            </NavLink>
            <NavLink style={{textDecoration:'none'}} to ="/counter"><button
              type="button"
              id="button-counter"
              data-section="counter"
              className="nav-button"
            >
              Open <em> counter example</em>
            </button></NavLink>
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
                 
                 
          <Route exact path="/" component={Movies} />
                    <Route path="/stuff" component={Stuff} />
                    <Route path="/counter" component={Counter} />
        </div>
      </React.Fragment>
      
    )
  
}

export default Sidenav
