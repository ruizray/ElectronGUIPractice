import React, { Component } from 'react'
import ScriptTag from 'react-script-tag'
import {

  Route,
  NavLink,
  HashRouter
} from 'react-router-dom'

import Itemcat from './itemCat'
import Main from '../Main'
import Stuff from '../Stuff'
class Sidenav extends Component {
  state = {
    categories: [
      {
        header: 'Menu Sample',
        category: 'windows',
        items: ['Graph', 'Crash-Hang']
      },
      { header: 'Mapper', category: 'mapper', items: ['Mapper'] }
    ],

  
  }

 
  render() {

   
    return (
      <React.Fragment>
        <HashRouter>
          <nav className="nav js-nav">
            <header class="nav-header">
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
                class="nav-button"
              >
                Open <em>Graph</em>
              </button>
            </NavLink>
            <NavLink style={{textDecoration:'none'}} to ="/stuff"><button
              type="button"
              id="button-crash-hang"
              data-section="crash-hang"
              class="nav-button"
            >
              Handling window <em>crashes and hangs</em>
            </button></NavLink>
            {this.state.categories.map(category => (
              <Itemcat
                header={category.header}
                keys={category.category}
                values={category.items}
              />
            ))}
            <footer class="nav-footer">
              <button
                type="button"
                id="button-about"
                data-modal="about"
                class="nav-footer-button"
              >
                About
              </button>
              <a
                class="nav-footer-logo"
                href="https://github.com"
                aria-label="Homepage"
              >
                <svg class="nav-footer-icon"></svg>
              </a>
            </footer>
          </nav>

          <div className="content js-content">
            <Route exact path="/" component={Main} />
            <Route path="/stuff" component={Stuff} />
          </div>
        </HashRouter>
        
      </React.Fragment>
      
    )
  }
}

export default Sidenav
