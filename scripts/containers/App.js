import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { fetchToken } from '../actions/token';

import NavContainer from '../containers/NavContainer';
import SideContainer from '../containers/SideContainer';
import MapContainer from '../containers/MapContainer';

import 'jquery';
import 'bootstrap';

const propTypes = {
  dispatch: PropTypes.func.isRequired,
  token: PropTypes.string,
  fetching: PropTypes.bool,
  fetched: PropTypes.bool,
  error: PropTypes.string
};

class App extends Component {

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(fetchToken());
    }
    render() {
        return (    
          <div className='full-height'>
            <MapContainer />
          </div>
        );
    }
}

App.PropTypes = propTypes;

function mapStateToProps(state) {
  const { token, fetching, fetched, error } = state.token;
  
  return {
    token,
    fetching,
    fetched,
    error,
  };
}

export default connect(mapStateToProps)(App);