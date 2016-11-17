import React, { Component, PropTypes } from 'react';

class Nav extends Component {

    render() {
        return (
            <nav className="navbar navbar-default">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <a className="navbar-brand" href="#">
                            <img alt="Passenjr" src="img/nav-logo.jpg" />
                        </a>
                    </div>
                </div>
            </nav>
            
        );
    }
}

export default Nav;