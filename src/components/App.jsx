import React, { Component } from 'react';
import Sidenav from './Sidenav';
import { Route } from 'react-router-dom';
import Counter from './Counter';
import Counters from './Counters';
import Movies from './Movies';
import Stuff from './Stuff';


class App extends Component {
   
    render() {
        return (
            <React.Fragment>
                
                <Sidenav />
                
                
            </React.Fragment>
        );
    }
}

export default App;