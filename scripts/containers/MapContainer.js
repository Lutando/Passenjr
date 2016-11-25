import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Immutable from 'immutable';

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
  journey: PropTypes.object,
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

  getLegs() {
    //<50ms call :S
    if(this.props.fetchedJourney)
    {
        const { legs } = this.props.journey.itineraries[0]
        var data = Immutable.fromJS(legs)
        var newData = data.map(function(leg) {

          var newCoordinates = leg.get('geometry').get('coordinates').map(function(coordinate){
            return coordinate.reverse()
          })
          var newLeg = leg.setIn(['geometry', 'coordinates'], newCoordinates);

          return newLeg
        })
        var newDataJs = newData.toJS();
        var legComponents = newDataJs.map(function(legData) {

          return <LegContainer key={legData.href} data={legData} />
        })
        return legComponents;
    }
    return null;
      
  }

  getStops() {

    if(this.props.fetchedJourney)
    {
      const { legs } = this.props.journey.itineraries[0]
      var data = Immutable.fromJS(legs)

      var filtered = data.filter(x => x.get('type') ==='Transit');

      var filterTransitLegs = filtered.map(function (leg) {

          var waypoints = leg.get('waypoints').map(function(waypoint) {

            var newCoordinates = waypoint.get('stop').get('geometry').get('coordinates').reverse();
            var w = waypoint.setIn(['stop', 'geometry', 'coordinates'], newCoordinates)
          
            return w;
          });
        
          var l = leg.setIn(['waypoints'], waypoints)
          return l;
      });

    var newLegs = filterTransitLegs.toJS()
    var stopComponents = []
    for(var i=0; i < newLegs.length; i++ )
    {
      for(var k =0; k < newLegs[i].waypoints.length; k++)
      {
        var stopProps = newLegs[i].waypoints[k]
        stopProps.colour = newLegs[i].line.colour
        //console.log(stopProps)
        stopComponents.push(<StopContainer key={this.props.journey.id + '/' + stopProps.stop.id} data={stopProps}  />)
      }
    }
    return stopComponents;
    }
    return null
    
  }

  render() {
    let legs = null;
    let stops = null;
    legs = this.getLegs()
    stops = this.getStops()
    //console.log(stops)
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
  const { journey, fetchedJourney } = state.journey;
  return {
    departureLocation,
    arrivalLocation,
    journey,
    fetchedJourney,
    errorLocation,
  };
}

export default connect(mapStateToProps)(MapContainer);