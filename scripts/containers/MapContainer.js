import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { Map, Marker, Popup, TileLayer, ZoomControl } from 'react-leaflet';

import DepartureMarkerContainer from './DepartureMarkerContainer';

import ArrivalMarkerContainer from './ArrivalMarkerContainer';

import { setDepartureLocation, setArrivalLocation } from '../actions/location';

const propTypes = {
  dispatch: PropTypes.func.isRequired,
  departureLocation: PropTypes.array,
  arrivalLocation: PropTypes.array,
  errorLocation: PropTypes.string,
};

class MapContainer extends Component {

    componentDidMount() {
        const { dispatch } = this.props;

    }

    handleContextMenu(e) {
      const { dispatch } = this.props;

      const location = [e.latlng.lng, e.latlng.lat];

      const prevlocation = this.props.departureLocation
      dispatch(setDepartureLocation(location));
      dispatch(setArrivalLocation(prevlocation));

    }

    render() {
        return (
          <div className="leaflet-map">
                <Map center={[-33.9231726,18.4217921]} zoom={13} zoomControl={false} onContextmenu={this.handleContextMenu.bind(this)}>
                  <TileLayer
                    attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
                    url='http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png'
                  />
                  <DepartureMarkerContainer />
                  <ArrivalMarkerContainer />
                </Map>
            </div>
        );
    }
}

MapContainer.PropTypes = propTypes;

function mapStateToProps(state) {
  const {departureLocation, arrivalLocation, errorLocation } = state.location;

  return {
    departureLocation,
    arrivalLocation,
    errorLocation,
  };
}

export default connect(mapStateToProps)(MapContainer);