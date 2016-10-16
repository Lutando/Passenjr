import React, { Component, PropTypes } from 'react';

import NavContainer from '../containers/NavContainer';
import SideContainer from '../containers/SideContainer';
import MapContainer from '../containers/MapContainer';

import 'jquery';
import 'bootstrap';


class App extends Component {
    render() {
        return (    
            <div>
                <h3>Example heading <span className="label label-default">New</span></h3>
                <NavContainer />
                <div  className='container'>  
                
                    <div className = 'row'>
                        <div className = 'col-md-4'>
                            <SideContainer />
                        </div>

                        <div className = 'col-md-8'>
                            <MapContainer />
                        </div>
                    </div>    
                </div>
            </div>
        );
    }
}

export default App;