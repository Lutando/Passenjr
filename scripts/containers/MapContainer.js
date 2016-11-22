import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { Map, Marker, Popup, TileLayer, ZoomControl } from 'react-leaflet';

import DepartureMarkerContainer from './DepartureMarkerContainer';

import ArrivalMarkerContainer from './ArrivalMarkerContainer';

import ItineraryContainer from './ItineraryContainer';

import { setDepartureLocation, setArrivalLocation } from '../actions/location';
import { fetchJourney } from '../actions/journey';

const propTypes = {
  dispatch: PropTypes.func.isRequired,
  departureLocation: PropTypes.array,
  arrivalLocation: PropTypes.array,
  errorLocation: PropTypes.string,
};

class MapContainer extends Component {

    handleContextMenu(e) {
      const { dispatch } = this.props;

      const location = [e.latlng.lng, e.latlng.lat];

      const prevlocation = this.props.departureLocation
      dispatch(setDepartureLocation(location));
      dispatch(setArrivalLocation(prevlocation));
      //this will be removed, just here for test purposes
      if(location.length == 2 && prevlocation.length == 2)
      {
        var query = {departureLocation: location, arrivalLocation: prevlocation}
        dispatch(fetchJourney(query))
      }
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
                  <ItineraryContainer />
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