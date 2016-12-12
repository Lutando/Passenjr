import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { Map, Marker, Popup, TileLayer, ZoomControl } from 'react-leaflet';

import DepartureMarkerContainer from './DepartureMarkerContainer';
import ArrivalMarkerContainer from './ArrivalMarkerContainer';

import LegContainer from './LegContainer';
import StopContainer from './StopContainer';

import { setDepartureLocation, setArrivalLocation } from '../actions/location';
import { fetchJourney } from '../actions/journey';

const propTypes = {
  dispatch: PropTypes.func.isRequired,
  departureLocation: PropTypes.array,
  arrivalLocation: PropTypes.array,
  fetchedJourney: PropTypes.bool,
  fetchingJourney: PropTypes.bool,
  itineraryId: PropTypes.string,
  itineraries: PropTypes.object,
  legs: PropTypes.object,
  errorLocation: PropTypes.string,
};

class MapContainer extends Component {

  handleContextMenu(e) {
      const { dispatch } = this.props;

      const location = [e.latlng.lat,e.latlng.lng];
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
    getLegContainers() {

      if(this.props.fetchedJourney && this.props.itineraryId && !this.props.fetchingJourney)
      {
        var legIds = this.props.itineraries[this.props.itineraryId].legs
        var legComponents = legIds.map(function(legId) {
          return <LegContainer key={legId} legId={legId} />
        })

        return legComponents
      }
      return null;
    }

    getStopContainers() {

      if(this.props.fetchedJourney && this.props.itineraryId && !this.props.fetchingJourney)
      {
        var legIds = this.props.itineraries[this.props.itineraryId].legs
        var legs = legIds.map((legId) => {
          return this.props.legs[legId]
        });

        var filteredLegs = legs.filter(x => x.type === 'Transit')

        var stopContainers = []

        for(var i = 0; i < filteredLegs.length; i++) {
          for(var k = 0; k < filteredLegs[i].waypoints.length; k++) {
            var stopId = filteredLegs[i].waypoints[k].stop.id
            stopContainers.push(<StopContainer key={stopId + '/' + i} colour={filteredLegs[i].line.colour}
              data={filteredLegs[i].waypoints[k].stop} /> )
          }
        }
        return stopContainers
      }

      return null;

    }

  render() {
    var legs = null
    var stops = null
    stops = this.getStopContainers()
    legs = this.getLegContainers()

    return (
      <div className="leaflet-map">
        <Map center={[-33.9231726,18.4217921]} zoom={13} zoomControl={false} onContextmenu={this.handleContextMenu.bind(this)}>
          <TileLayer
            attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
            url='http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png'
            />
            <DepartureMarkerContainer />
            <ArrivalMarkerContainer />
              {legs}
              {stops} 
            </Map>
        </div>
      );
    }
}

MapContainer.PropTypes = propTypes;

function mapStateToProps(state) {
  const {departureLocation, arrivalLocation, errorLocation } = state.location;
  const { fetchedJourney, itineraryId, legs, itineraries, fetchingJourney } = state.journey;
  return {
    departureLocation,
    itineraries,
    itineraryId,
    legs,
    arrivalLocation,
    fetchingJourney,
    fetchedJourney,
    errorLocation,
  };
}

export default connect(mapStateToProps)(MapContainer);