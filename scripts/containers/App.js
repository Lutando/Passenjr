import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { fetchToken } from '../actions/token';

import Nav from '../components/Nav';

import SideContainer from '../containers/SideContainer';
import MapContainer from '../containers/MapContainer';

import 'jquery';
import 'bootstrap';

const propTypes = {
  dispatch: PropTypes.func.isRequired,
  token: PropTypes.string,
  fetchingToken: PropTypes.bool,
  fetchedToken: PropTypes.bool,
  errorToken: PropTypes.string
};

class App extends Component {

    componentDidMount() {
        const { dispatch } = this.props;
        console.log(dispatch)
        dispatch(fetchToken());
    }
    render() {
        return (    
          <div className='full-height'>
            <Nav />
            <MapContainer />
          </div>
        );
    }
}

App.PropTypes = propTypes;

function mapStateToProps(state) {
  const { token, fetchingToken, fetchedToken, errorToken } = state.token;
  return {
    token,
    fetchingToken,
    fetchedToken,
    errorToken,
  };
}

export default connect(mapStateToProps)(App);